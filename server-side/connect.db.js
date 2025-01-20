import mongoose from "mongoose";

const dbUserName = "sahil";
const dbPassword = encodeURIComponent("sahil123");
const dbHost = "cluster0.twmzo.mongodb.net";
const dbName = "user-details";
const dbOptions = "retryWrites=true&w=majority&appName=Cluster0";
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${dbUserName}:${dbPassword}@${dbHost}/${dbName}?${dbOptions}`
    );
  } catch (error) {
    console.log("DB connection failed...");
    console.log(error.message);
    process.exit(1); //1 means exit with failure
  }
};

export default connectDB;
