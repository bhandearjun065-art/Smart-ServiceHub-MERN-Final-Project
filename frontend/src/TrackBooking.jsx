import React, { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { getBookingById } from "./services/api.js";

export default function TrackBooking() {
  const [bookingId, setBookingId] = useState("");
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!bookingId.trim()) {
      setError("Please enter your booking ID.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setBooking(null);

      const response = await getBookingById(
        bookingId.trim()
      );

      setBooking(response.data);

    } catch (err) {
      console.error("Track booking error:", err);

      setError(
        err?.response?.data?.message ||
          "Booking not found."
      );

    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Confirmed":
        return "confirmed";

      case "Completed":
        return "completed";

      case "Cancelled":
        return "cancelled";

      default:
        return "pending";
    }
  };

  return (
    <>
      <div className="success-page">

        <div className="booking-form">

          <div className="eyebrow">
            Booking Tracker
          </div>

          <h1>
            Track your booking
          </h1>

          <p>
            Enter your booking ID to check the
            latest booking status.
          </p>

          <form onSubmit={handleSearch}>

            <label>
              Booking ID

              <input
                type="text"
                value={bookingId}
                onChange={(e) =>
                  setBookingId(e.target.value)
                }
                placeholder="Enter booking ID"
                required
              />
            </label>

            <button
              type="submit"
              className="btn primary full"
              disabled={loading}
            >
              {loading
                ? "Searching..."
                : "Track Booking"}

              <Search size={18} />
            </button>

          </form>


          {error && (
            <p
              style={{
                marginTop: "20px",
                color: "#ff6b6b"
              }}
            >
              {error}
            </p>
          )}


          {booking && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                borderRadius: "15px",
                background:
                  "rgba(255,255,255,0.06)"
              }}
            >

              <h2>
                Booking Details
              </h2>

              <p>
                <b>Customer:</b>{" "}
                {booking.name}
              </p>

              <p>
                <b>Phone:</b>{" "}
                {booking.phone}
              </p>

              <p>
                <b>Date:</b>{" "}
                {booking.date}
              </p>

              <p>
                <b>Time:</b>{" "}
                {booking.time}
              </p>

              <p>
                <b>Address:</b>{" "}
                {booking.address}
              </p>

              <p>
                <b>Status:</b>{" "}

                <span
                  className={`badge ${getStatusClass(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>

              </p>

            </div>
          )}


          <Link
            to="/"
            className="btn ghost"
            style={{
              marginTop: "20px"
            }}
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

        </div>

      </div>
    </>
  );
}