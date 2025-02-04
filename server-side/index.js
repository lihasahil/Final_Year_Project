import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./User/user.controller.js";
import lostPersonRoutes from "./Lost_person_details/lostPerson.controller.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// network port and server
const PORT = process.env.PORT || 9051;

app.use(express.json());
app.use(
  cors({
    origin: ["findmefrontend.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
// database connection
connectDB();
// register routes
app.use(userRoutes);
app.use(lostPersonRoutes);

app.listen(PORT, () => {
  console.log(`App is listening in port ${PORT}`);
});
