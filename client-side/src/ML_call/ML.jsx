import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ML.css";
const FindPerson = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    if (videoFile) {
      const videoURL = URL.createObjectURL(videoFile);
      videoRef.current.src = videoURL;
      videoRef.current.load();
    }
  }, [videoFile]);

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const frameData = canvas.toDataURL("image/jpeg").split(",")[1]; // Get Base64

    sendToServer(frameData);
  };

  const sendToServer = async (frameData) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:9050/api/recognize", {
        frame: frameData,
      });

      setPerson(response.data);
    } catch (error) {
      console.error("Recognition error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="main">
      <h1 className="title">Face & Gait Recognition</h1>

      <div className="video_data">
        <div className="vidbutt">
          {/* File Upload */}
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="mb-4"
          />
          {/* Video Preview */}
          <video ref={videoRef} controls className="video"></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

          <button
            onClick={captureFrame}
            className="capbutton"
            disabled={loading}
          >
            {loading ? "Processing..." : "Capture & Recognize"}
          </button>
        </div>

        {person && (
          <div className="data">
            <h2 className="text-lg font-semibold">Person Recognized</h2>
            <p>
              <strong>Name:</strong> {person.name || "Unknown"}
            </p>
            <p>
              <strong>Confidence:</strong> {person.confidence?.toFixed(2)}%
            </p>
            <p>
              <strong>Method:</strong> {person.method}
            </p>
            <p>
              <strong>Location:</strong> {person.location}
            </p>
            <p>
              <strong>Age:</strong> {person.age}
            </p>
          </div>
        )}
      </div>
      <button className="return" onClick={() => navigate("/home")}>
        Return to Home Page
      </button>
    </div>
  );
};

export default FindPerson;
