import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  name: String,
  phone: String,
  date: String,
  time: String,
  address: String,
  status: { type: String, enum: ["Pending", "Confirmed", "Completed", "Cancelled"], default: "Pending" }
}, { timestamps: true });
export default mongoose.model("Booking", bookingSchema);