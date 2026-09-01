import axios from "axios";

const API_URL = "https://smart-servicehub-backend.onrender.com/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});


// ==================================================
// AUTH
// ==================================================

export const login = (data) => {
  return api.post("/auth/login", data);
};


// ==================================================
// SERVICES
// ==================================================

export const getServices = () => {
  return api.get("/services");
};
export const getServiceById = (id) => {
  return api.get(`/services/${id}`);
};

export const createService = (data) => {
  const token = localStorage.getItem("adminToken");

  return api.post("/services", data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


export const updateService = (id, data) => {
  const token = localStorage.getItem("adminToken");

  return api.put(`/services/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


export const deleteService = (id) => {
  const token = localStorage.getItem("adminToken");

  return api.delete(`/services/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


// ==================================================
// BOOKINGS
// ==================================================

export const createBooking = (data) => {
  return api.post("/bookings", data);
};


// ==================================================
// GET ALL BOOKINGS - ADMIN
// ==================================================

export const getBookings = () => {

  const token =
    localStorage.getItem("adminToken");

  return api.get("/bookings", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


// ==================================================
// GET SINGLE BOOKING
// ==================================================

export const getBookingById = (id) => {
  return api.get(`/bookings/${id}`);
};


// ==================================================
// UPDATE BOOKING STATUS - ADMIN
// ==================================================

export const updateBookingStatus = (
  id,
  status
) => {

  const token =
    localStorage.getItem("adminToken");

  return api.patch(
    `/bookings/${id}/status`,
    {
      status
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
};


// ==================================================
// DEFAULT API
// ==================================================

export default api;