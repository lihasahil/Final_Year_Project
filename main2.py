import cv2
import numpy as np
import mediapipe as mp
import os
import json
from tensorflow.keras.models import load_model
from sklearn.preprocessing import LabelEncoder

# Load Models
face_recognition_model = load_model("face_recognition_model.h5")
gait_recognition_model = load_model("gait_recognition_model.h5")

# Load Face Labels
face_labels = []
with open("labels.txt", "r") as f:
    face_labels = [line.strip() for line in f.readlines()]

# Load Gait Labels
label_classes = np.load("label_encoder_classes.npy", allow_pickle=True)
label_encoder = LabelEncoder()
label_encoder.classes_ = label_classes

# Load Face Metadata
face_metadata = {}
for person in face_labels:
    metadata_path = os.path.join("images", person, "metadata.json")
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

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()
mp_drawing = mp.solutions.drawing_utils

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

def detect_face(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)

    best_conf = 0
    best_label = None
    best_bbox = None

    for (x, y, w, h) in faces:
        face = frame[y:y + h, x:x + w]
        face_input = preprocess_face(face)
        predictions = face_recognition_model.predict(face_input)[0]
        label_index = np.argmax(predictions)
        confidence = predictions[label_index] * 100

        if confidence > best_conf:
            best_conf = confidence
            best_label = face_labels[label_index]
            best_bbox = (x, y, w, h)

    return best_label, best_conf, best_bbox

def detect_gait(frame):
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
            return label, confidence, results.pose_landmarks
        except Exception as e:
            print(f"Error processing gait features: {e}")

    return None, 0, None

video_path = "./videos/asmitashort.mp4"
cap = cv2.VideoCapture(video_path)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    frame = correct_orientation(frame)

    # Detect face and gait
    face_name, face_conf, face_bbox = detect_face(frame)
    gait_name, gait_conf, pose_landmarks = detect_gait(frame)

    # Determine the most confident model
    if face_conf > gait_conf:
        person_name, confidence, method = face_name, face_conf, "Face"
        details = face_metadata.get(face_name, {})
    else:
        person_name, confidence, method = gait_name, gait_conf, "Gait"
        details = gait_metadata.get(gait_name, {})

    if person_name:
        if method == "Face" and face_bbox:
            # Draw face bounding box
            x, y, w, h = face_bbox
            color = (0, 255, 0)  # Green
            cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
            cv2.rectangle(frame, (x, y - 120), (x + w, y), color, -1)

        elif method == "Gait" and pose_landmarks:
            # Draw gait pose skeleton
            body_parts = {
                "upper_body": [(11, 13), (13, 15), (12, 14), (14, 16)],
                "lower_body": [(23, 25), (25, 27), (24, 26), (26, 28)],
                "spine": [(11, 23), (12, 24)],
            }
            colors = {"upper_body": (0, 255, 255), "lower_body": (255, 0, 0), "spine": (0, 255, 0)}
            landmark_points = [(int(lm.x * frame.shape[1]), int(lm.y * frame.shape[0])) for lm in pose_landmarks.landmark]

            for part, pairs in body_parts.items():
                for start, end in pairs:
                    cv2.line(frame, landmark_points[start], landmark_points[end], colors[part], 2)

            head_x, head_y = landmark_points[0]

        # Display details
        text_x, text_y = (x, y - 100) if method == "Face" else (head_x, head_y - 120)
        cv2.putText(frame, f"Name: {details.get('name', person_name)}", (text_x, text_y), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        cv2.putText(frame, f"Age: {details.get('age', 'unknown')}", (text_x, text_y + 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        cv2.putText(frame, f"Gender: {details.get('gender', 'Unknown')}", (text_x, text_y + 40), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        cv2.putText(frame, f"Address: {details.get('address', 'Unknown')}", (text_x, text_y + 60), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        cv2.putText(frame, f"Email: {details.get('email', 'Unknown')}", (text_x, text_y + 80), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        cv2.putText(frame, f"Location: {details.get('location', 'Unknown')}", (text_x, text_y + 100), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1)
        cv2.putText(frame, f"Confidence: {confidence:.2f}%", (text_x, text_y + 120), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)

    frame_resized = cv2.resize(frame, (1000, 1000))
    cv2.imshow("Gait Recognition", frame_resized)
    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()
