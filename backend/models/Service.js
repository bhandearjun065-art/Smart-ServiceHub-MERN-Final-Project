import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String,
  description: String,
  price: Number,
  duration: String,
  rating: { type: Number, default: 5 },
  image: String,
  active: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model("Service", serviceSchema);