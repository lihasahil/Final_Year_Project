import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./User/user.controller.js";
import lostPersonRoutes from "./Lost_person_details/lostPerson.controller.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
// database connection
connectDB();
// register routes
app.use(userRoutes);
app.use(lostPersonRoutes);

// network port and server
const PORT = 9050;

app.listen(PORT, () => {
  console.log(`App is listening in port ${PORT}`);
});
