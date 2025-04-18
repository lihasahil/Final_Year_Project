import mongoose from "mongoose";

const connectDB = async () => {
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(
    process.env.MONGO_PASS
  )}@${process.env.MONGO_CLUSTER}/${
    process.env.MONGO_DB
  }?retryWrites=true&w=majority&appName=Cluster0`;

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.log("❌ DB connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDB;
