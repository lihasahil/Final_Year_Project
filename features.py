import cv2
import mediapipe as mp
import numpy as np
import os
import json

# Video source
video_path = './videos/asmita01.mp4'
video = cv2.VideoCapture(video_path)

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

count = 0

# Collect user details
nameID = str(input("Enter Your Name: ")).lower()
ageID = int(input("Enter Your Age: "))
genderID = str(input("Enter Your Gender (M/F): ")).upper()
addressID = str(input("Enter Your Address: "))
emailID = str(input("Enter Your Email ID: "))
locationID = str(input("Enter Your Location: "))

path = f'features/{nameID}'

# Ensure unique directory
while os.path.exists(path):
    print("Name Already Taken")
    nameID = str(input("Enter Your Name Again: ")).lower()
    path = f'features/{nameID}'

os.makedirs(path)

# Create metadata dictionary
metadata = {
    "name": nameID,
    "age": ageID,
    "gender": genderID,
    "address": addressID,
    "email": emailID,
    "location": locationID,
    "features": []
}

features = []

while True:
    ret, frame = video.read()
    if not ret:
        break

    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = pose.process(frame_rgb)

    if results.pose_landmarks:
        joints = np.array([[lm.x, lm.y, lm.z] for lm in results.pose_landmarks.landmark])
        features.append(joints.flatten())

    # Limit to 30 frames of features for a single session
    if len(features) == 30:
        break

video.release()
pose.close()

# Save extracted features
if len(features) == 30:
    feature_path = os.path.join(path, f"{nameID}_features.npy")
    np.save(feature_path, np.array(features))
    metadata["features"].append(feature_path)
    print(f"Features saved at {feature_path}")
else:
    print("Insufficient frames for feature extraction.")

# Save metadata to a JSON file
metadata_path = os.path.join(path, "metadata.json")
with open(metadata_path, "w") as f:
    json.dump(metadata, f, indent=4)
    print(f"Metadata saved at {metadata_path}")
