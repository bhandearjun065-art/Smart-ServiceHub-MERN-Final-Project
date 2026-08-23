import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./services/api.js";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login({
        email,
        password
      });

      console.log("Login response:", response.data);

      const { token, user } = response.data;

      if (user.role !== "admin") {
        alert("Only admin can access this dashboard.");
        return;
      }

      localStorage.setItem("adminToken", token);

      alert("Login successful!");

      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);

      alert(
        error?.response?.data?.message ||
          "Login failed. Please check email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="success-page">
      <div className="booking-form">
        <div className="eyebrow">Admin Access</div>

        <h1>Admin Login</h1>

        <p>Login to manage Smart ServiceHub bookings.</p>

        <form onSubmit={handleLogin}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@servicehub.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </label>

          <button
            type="submit"
            className="btn primary full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}