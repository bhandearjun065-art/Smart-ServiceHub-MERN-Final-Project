import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service"
    },

    // Service details
    serviceName: {
      type: String,
      default: "Service not available"
    },

    serviceCategory: {
      type: String,
      default: "General"
    },

    servicePrice: {
      type: Number,
      default: 0
    },

    name: String,

    phone: String,

    date: String,

    time: String,

    address: String,

    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Completed",
        "Cancelled"
      ],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Booking",
  bookingSchema
);