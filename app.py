from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
import json
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder
import mediapipe as mp
import os

app = Flask(__name__)

# Load models
face_recognition_model = load_model("face_recognition_model.h5")
gait_recognition_model = load_model("gait_recognition_model.h5")

# Load labels
face_labels = [line.strip() for line in open("labels.txt", "r").readlines()]
label_classes = np.load("label_encoder_classes.npy", allow_pickle=True)
label_encoder = LabelEncoder()
label_encoder.classes_ = label_classes

# Load Face Metadata
face_metadata = {}
for person in face_labels:
    metadata_path = os.path.join("features", person, "metadata.json")
    if os.path.exists(metadata_path):
        with open(metadata_path, "r") as f:
            face_metadata[person] = json.load(f)

# Load Gait Metadata
gait_metadata = {}
for person in label_classes:
    metadata_path = os.path.join("features", person, "metadata.json")
    if os.path.exists(metadata_path):
        with open(metadata_path, "r") as f:
            gait_metadata[person] = json.load(f)

# Initialize pose model
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

# Function to process base64 image
def decode_image(base64_string):
    img_data = base64.b64decode(base64_string)
    np_arr = np.frombuffer(img_data, np.uint8)
    return cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

# Preprocess face
def preprocess_face(face_image):
    face_image = cv2.resize(face_image, (224, 224))
    face_image = np.expand_dims(face_image, axis=0)
    face_image = face_image / 255.0
    return face_image

def load_gait_features(person_label):
    feature_path = os.path.join("features", person_label, f"{person_label}features.npy")
    if not os.path.exists(feature_path):
        raise FileNotFoundError(f"Gait feature file not found: {feature_path}")
    gait_features = np.load(feature_path)  # Expected shape (99,)
    return np.expand_dims(gait_features, axis=0)  # Reshape to (1, 99)

def correct_orientation(frame):
    """Ensure video is oriented correctly"""
    h, w = frame.shape[:2]
    if w > h:  # Rotate if landscape
        return cv2.rotate(frame, cv2.ROTATE_90_CLOCKWISE)
    return frame
# Recognize face
def recognize_face(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    best_conf = 0
    best_label = None

    for (x, y, w, h) in faces:
        face = frame[y:y+h, x:x+w]
        face_input = preprocess_face(face)
        predictions = face_recognition_model.predict(face_input)[0]
        label_index = np.argmax(predictions)
        confidence = predictions[label_index] * 100

        if confidence > best_conf:
            best_conf = confidence
            best_label = face_labels[label_index]

    return best_label, best_conf

# Recognize gait
def recognize_gait(frame):
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(frame_rgb)

    if results.pose_landmarks:
        try:
            landmarks = np.array([[lm.x, lm.y, lm.z] for lm in results.pose_landmarks.landmark]).flatten()
            gait_input = np.expand_dims(landmarks, axis=0)
            predictions = gait_recognition_model.predict(gait_input)[0]
            label_index = np.argmax(predictions)
            confidence = predictions[label_index] * 100
            label = label_encoder.inverse_transform([label_index])[0]
            return label, confidence
        except Exception as e:
            print(f"Error processing gait features: {e}")

    return None, 0

# API endpoint
@app.route("/recognize", methods=["POST"])
def recognize():
    try:
        data = request.json
        base64_frame = data.get("frame")
        
        if not base64_frame:
            return jsonify({"error": "No frame received"}), 400

        frame = decode_image(base64_frame)

        # Face & gait recognition
        face_name, face_conf = recognize_face(frame)
        gait_name, gait_conf = recognize_gait(frame)

        # Determine best match
        if face_conf > gait_conf:
            person_name, confidence, method = face_name, face_conf, "Face"
            details = face_metadata.get(face_name, {})
        else:
            person_name, confidence, method = gait_name, gait_conf, "Gait"
            details = gait_metadata.get(gait_name, {})

        return jsonify({
            "name": details.get("name", person_name),
            "confidence": confidence,
            "method": method,
            "age": details.get("age", "Unknown"),
            "email": details.get("email", "Unknown"),
            "location": details.get("location", "Unknown")
        })

    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Internal Server Error"}), 500

if __name__ == "__main__":
    app.run(debug=True)
