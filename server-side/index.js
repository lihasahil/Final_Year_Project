import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./User/user.controller.js";
import lostPersonRoutes from "./Lost_person_details/lostPerson.controller.js";
import cors from "cors";
import "dotenv/config";
import axios from "axios";

const app = express();

// network port and server
const PORT = 9050;
const PYTHON_API_URL = "http://127.0.0.1:5000";

app.use(express.json({ limit: "100mb" }));
app.use(
  cors({
    origin: ["final-year-project-frontend-gamma.vercel.app"],
    methods: ["POST", "GET", "PUT"],
    credentials: true,
  })
);
// database connection
connectDB();
// register routes
app.use(userRoutes);
app.use(lostPersonRoutes);

app.post("/api/recognize", async (req, res) => {
  try {
    const { frame } = req.body; // Frontend sends base64 frame

    if (!frame) {
      return res.status(400).json({ error: "No frame provided" });
    }

    // Call Python model API
    const response = await axios.post(`${PYTHON_API_URL}/recognize`, { frame });

    res.json(response.data);
  } catch (error) {
    console.error("Error calling Python model:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening in port ${PORT}`);
});
