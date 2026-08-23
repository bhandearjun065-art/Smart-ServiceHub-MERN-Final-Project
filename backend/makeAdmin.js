import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const email = "admin@servicehub.com";

try {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("MongoDB connected");

  const user = await User.findOne({ email });

  if (!user) {
    console.log("User not found:", email);
  } else {
    user.role = "admin";
    await user.save();

    console.log("SUCCESS!");
    console.log("Email:", user.email);
    console.log("Role:", user.role);
  }

  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error("Error:", error.message);
  process.exit(1);
}