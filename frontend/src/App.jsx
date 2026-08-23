import React, { useEffect, useState } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useParams
} from "react-router-dom";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Menu,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
  Zap,
  Search,
  LogOut,
  RefreshCw
} from "lucide-react";

import {
  createBooking,
  getBookings,
  updateBookingStatus,
  getServices,getBookingById
} from "./services/api.js";

import AdminLogin from "./AdminLogin.jsx";
import TrackBooking from "./TrackBooking.jsx";

import "./styles.css";


// ==================================================
// DEFAULT SERVICES
// ==================================================

const defaultServices = [
  {
    id: 1,
    title: "Premium Car Service",
    category: "Automotive",
    price: 1499,
    time: "2 hrs",
    icon: "🚗",
    rating: 4.9
  },
  {
    id: 2,
    title: "Home Deep Cleaning",
    category: "Home Care",
    price: 999,
    time: "3 hrs",
    icon: "✨",
    rating: 4.8
  },
  {
    id: 3,
    title: "AC Repair & Service",
    category: "Appliances",
    price: 699,
    time: "1 hr",
    icon: "❄️",
    rating: 4.9
  },
  {
    id: 4,
    title: "Salon at Home",
    category: "Beauty",
    price: 799,
    time: "90 min",
    icon: "💇",
    rating: 4.7
  },
  {
    id: 5,
    title: "Laptop Maintenance",
    category: "Tech",
    price: 599,
    time: "1 hr",
    icon: "💻",
    rating: 4.8
  },
  {
    id: 6,
    title: "Plumbing Visit",
    category: "Home Care",
    price: 399,
    time: "45 min",
    icon: "🔧",
    rating: 4.6
  }
];


// ==================================================
// NAVBAR
// ==================================================

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">

      <Link
        className="brand"
        to="/"
        onClick={() => setOpen(false)}
      >
        <span className="brand-mark">
          <Sparkles size={18} />
        </span>

        Service<span>Hub</span>
      </Link>


      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
        type="button"
      >
        {open ? <X /> : <Menu />}
      </button>


      <div
        className={`nav-links ${
          open ? "show" : ""
        }`}
      >

        <Link
          to="/"
          onClick={() => setOpen(false)}
        >
          Home
        </Link>


        <a
          href="/#services"
          onClick={() => setOpen(false)}
        >
          Services
        </a>


        <a
          href="/#how"
          onClick={() => setOpen(false)}
        >
          How it works
        </a>


        <Link
          to="/track-booking"
          onClick={() => setOpen(false)}
        >
          Track Booking
        </Link>


        <Link
          to="/admin"
          onClick={() => setOpen(false)}
        >
          Admin
        </Link>


        <Link
          className="nav-cta"
          to="/book/1"
          onClick={() => setOpen(false)}
        >
          Book now
          <ArrowRight size={16} />
        </Link>

      </div>

    </nav>
  );
}


// ==================================================
// HOME
// ==================================================

function Home() {

  const [query, setQuery] = useState("");

  const [services, setServices] =
    useState(defaultServices);


  useEffect(() => {

    const loadServices = async () => {

      try {

        const response =
          await getServices();

        if (
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {

          const formatted =
            response.data.map((service) => ({
              id: service._id,
              title: service.title,
              category:
                service.category || "General",
              price: service.price || 0,
              time:
                service.duration || "1 hr",
              icon:
                service.image || "🔧",
              rating:
                service.rating || 5
            }));

          setServices(formatted);
        }

      } catch (error) {

        console.log(
          "Using default services:",
          error.message
        );

      }

    };

    loadServices();

  }, []);


  const filtered =
    services.filter((s) =>
      `${s.title} ${s.category}`
        .toLowerCase()
        .includes(
          query.toLowerCase()
        )
    );


  return (
    <div>

      <Navbar />


      <main>

        {/* HERO */}

        <section className="hero">

          <div className="hero-orb orb-a"></div>
          <div className="hero-orb orb-b"></div>


          <div className="hero-copy reveal">

            <div className="eyebrow">

              <span className="pulse"></span>

              Trusted local services

            </div>


            <h1>

              Book trusted services.

              <br />

              <em>
                Without the hassle.
              </em>

            </h1>


            <p>
              Discover reliable professionals,
              compare services and schedule
              your appointment in a few clicks.
            </p>


            <div className="hero-actions">

              <a
                className="btn primary"
                href="#services"
              >
                Explore services
                <ArrowRight size={18} />
              </a>


              <a
                className="btn ghost"
                href="#how"
              >
                See how it works
              </a>

            </div>


            <div className="trust-row">

              <div>
                <b>4.9/5</b>
                <span>average rating</span>
              </div>


              <div>
                <b>10k+</b>
                <span>happy customers</span>
              </div>


              <div>
                <b>24/7</b>
                <span>support</span>
              </div>

            </div>

          </div>


          <div className="hero-card float">

            <div className="mini-head">

              <span>
                Today's booking
              </span>

              <span className="status">
                Confirmed
              </span>

            </div>


            <div className="booking-preview">

              <div className="service-icon">
                🚗
              </div>


              <div>

                <b>
                  Premium Car Service
                </b>

                <small>
                  Today · 4:30 PM
                </small>

              </div>

            </div>


            <div className="progress">
              <span></span>
            </div>


            <div className="mini-foot">

              <span>
                Professional assigned
              </span>

              <strong>
                92%
              </strong>

            </div>

          </div>

        </section>


        {/* SERVICES */}

        <section
          className="section"
          id="services"
        >

          <div className="section-head">

            <div>

              <div className="eyebrow">
                Popular services
              </div>

              <h2>
                Everything you need,
                <em> in one place.</em>
              </h2>

            </div>


            <div className="search">

              <span>⌕</span>

              <input
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Search services..."
              />

            </div>

          </div>


          <div className="service-grid">

            {filtered.map(
              (s, i) => (

                <article
                  className="service-card reveal"
                  style={{
                    animationDelay:
                      `${i * 70}ms`
                  }}
                  key={s.id}
                >

                  <div className="service-top">

                    <div className="service-icon large">
                      {s.icon}
                    </div>


                    <span className="rating">

                      <Star
                        size={14}
                        fill="currentColor"
                      />

                      {s.rating}

                    </span>

                  </div>


                  <span className="category">
                    {s.category}
                  </span>


                  <h3>
                    {s.title}
                  </h3>


                  <div className="service-meta">

                    <span>

                      <Clock3 size={15} />

                      {s.time}

                    </span>


                    <strong>
                      ₹{s.price}
                    </strong>

                  </div>


                  <Link
                    className="card-link"
                    to={`/book/${s.id}`}
                  >

                    Book service

                    <ArrowRight size={16} />

                  </Link>

                </article>

              )
            )}

          </div>

        </section>


        {/* STATS */}

        <section className="stats-strip">

          <div>
            <Users />
            <b>10,000+</b>
            <span>customers served</span>
          </div>


          <div>
            <ShieldCheck />
            <b>500+</b>
            <span>verified professionals</span>
          </div>


          <div>
            <Star />
            <b>4.9/5</b>
            <span>customer rating</span>
          </div>


          <div>
            <Zap />
            <b>30 min</b>
            <span>average response</span>
          </div>

        </section>


        {/* HOW IT WORKS */}

        <section
          className="section how"
          id="how"
        >

          <div className="center-head">

            <div className="eyebrow">
              Simple process
            </div>

            <h2>
              From search to service in
              <em> three steps.</em>
            </h2>

          </div>


          <div className="steps">

            {[
              [
                "01",
                "Choose a service",
                "Browse verified services and compare prices, ratings and availability."
              ],
              [
                "02",
                "Pick your time",
                "Select a convenient date and time slot that works for you."
              ],
              [
                "03",
                "Relax & track",
                "Get updates and track your booking until the job is complete."
              ]
            ].map(
              ([n, t, d]) => (

                <div
                  className="step"
                  key={n}
                >

                  <span>{n}</span>

                  <div className="step-line"></div>

                  <h3>{t}</h3>

                  <p>{d}</p>

                </div>

              )
            )}

          </div>

        </section>


        {/* TESTIMONIAL */}

        <section className="testimonial">

          <div className="quote">
            “
          </div>

          <p>
            ServiceHub made booking a home
            service ridiculously easy. The
            professional arrived on time and
            the whole experience felt premium.
          </p>


          <div className="person">

            <div className="avatar">
              AK
            </div>

            <div>

              <b>
                Aditya Kulkarni
              </b>

              <span>
                Verified customer · Pune
              </span>

            </div>

          </div>

        </section>

      </main>


      <Footer />

    </div>
  );
}


// ==================================================
// BOOKING
// ==================================================

function Booking() {

  const { id } = useParams();

  const numericId =
    Number(id);


  const service =
    defaultServices.find(
      (s) =>
        s.id === numericId
    ) ||
    defaultServices[0];


  const [done, setDone] =
    useState(false);

  const [date, setDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [bookingId, setBookingId] =
    useState("");


  const handleBooking =
    async (e) => {

      e.preventDefault();


      const form =
        e.target;


      const name =
        form.elements.name.value;

      const phone =
        form.elements.phone.value;

      const time =
        form.elements.time.value;

      const address =
        form.elements.address.value;


      try {

        setLoading(true);


        const bookingData = {

          name,
          phone,
          date,
          time,
          address,

          status: "Pending"

        };


        const response =
          await createBooking(
            bookingData
          );


        const newBookingId =
          response.data._id;


        setBookingId(
          newBookingId
        );


        localStorage.setItem(
          "customerBookingId",
          newBookingId
        );


        setDone(true);


      } catch (error) {

        console.error(
          "Booking error:",
          error
        );


        alert(
          error?.response?.data
            ?.message ||
          "Booking failed. Please try again."
        );

      } finally {

        setLoading(false);

      }

    };


  if (done) {

    return (
      <>
        <Navbar />


        <div className="success-page">

          <div className="success-icon">
            <CheckCircle2
              size={44}
            />
          </div>


          <div className="eyebrow">
            Booking submitted
          </div>


          <h1>
            Booking successful! 🎉
          </h1>


          <p>
            Your{" "}
            <b>
              {service.title}
            </b>{" "}
            booking has been
            submitted successfully.
          </p>


          <div
            style={{
              margin: "20px 0",
              padding: "16px",
              borderRadius: "12px",
              background:
                "rgba(255,255,255,0.06)"
            }}
          >

            <span>
              Booking ID
            </span>

            <br />

            <strong
              style={{
                wordBreak:
                  "break-all"
              }}
            >
              {bookingId}
            </strong>

            <br />

            <small>
              Status: Pending
            </small>

          </div>


          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent:
                "center",
              flexWrap: "wrap"
            }}
          >

            <Link
              className="btn primary"
              to="/track-booking"
            >
              Track Booking
              <Search size={18} />
            </Link>


            <Link
              className="btn ghost"
              to="/"
            >
              Back to home
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>


        <Footer />

      </>
    );
  }


  return (
    <>
      <Navbar />


      <section className="booking-page">

        <div className="booking-info">

          <div className="service-icon large">
            {service.icon}
          </div>


          <div className="eyebrow">
            {service.category}
          </div>


          <h1>
            {service.title}
          </h1>


          <p>
            Professional service with
            verified experts and
            transparent pricing.
          </p>


          <div className="booking-details">

            <span>

              <Clock3 />

              {service.time}

            </span>


            <span>

              <Star />

              {service.rating}
              rating

            </span>


            <strong>

              ₹{service.price}

            </strong>

          </div>

        </div>


        <form
          className="booking-form"
          onSubmit={handleBooking}
        >

          <h2>
            Schedule your service
          </h2>


          <label>

            Full name

            <input
              name="name"
              required
              placeholder="Enter your name"
            />

          </label>


          <label>

            Phone number

            <input
              name="phone"
              required
              type="tel"
              placeholder="+91 XXXXX XXXXX"
            />

          </label>


          <label>

            Date

            <input
              name="date"
              required
              type="date"
              value={date}
              min={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setDate(
                  e.target.value
                )
              }
            />

          </label>


          <label>

            Time slot

            <select
              name="time"
              required
            >

              <option value="">
                Select a time
              </option>

              <option>
                10:00 AM
              </option>

              <option>
                1:00 PM
              </option>

              <option>
                4:30 PM
              </option>

              <option>
                7:00 PM
              </option>

            </select>

          </label>


          <label>

            Address

            <textarea
              name="address"
              required
              placeholder="Enter service address"
            ></textarea>

          </label>


          <button
            type="submit"
            className="btn primary full"
            disabled={loading}
          >

            {loading
              ? "Booking..."
              : "Confirm booking"}

            <CalendarDays
              size={18}
            />

          </button>

        </form>

      </section>


      <Footer />

    </>
  );
}


// ==================================================
// PROTECTED ADMIN
// ==================================================

function ProtectedAdmin() {

  const token =
    localStorage.getItem(
      "adminToken"
    );


  if (!token) {

    return (
      <AdminLogin />
    );

  }


  return <Admin />;
}


// ==================================================
// ADMIN DASHBOARD
// ==================================================

function Admin() {

  const navigate =
    useNavigate();


  const [bookings, setBookings] =
    useState([]);


  const [loading, setLoading] =
    useState(true);


  const [updatingId, setUpdatingId] =
    useState(null);


  const handleLogout =
    () => {

      localStorage.removeItem(
        "adminToken"
      );

      navigate(
        "/admin/login"
      );

    };


  const loadBookings =
    async () => {

      try {

        setLoading(true);


        const response =
          await getBookings();


        setBookings(
          response.data
        );


      } catch (error) {

        console.error(
          "Bookings error:",
          error
        );


        if (
          error?.response
            ?.status === 401
        ) {

          localStorage.removeItem(
            "adminToken"
          );

          navigate(
            "/admin/login"
          );

          return;
        }


        alert(
          error?.response?.data
            ?.message ||
          "Failed to load bookings."
        );

      } finally {

        setLoading(false);

      }

    };


  useEffect(() => {

    loadBookings();

  }, []);


  const handleStatusChange =
    async (
      bookingId,
      status
    ) => {

      try {

        setUpdatingId(
          bookingId
        );


        const response =
          await updateBookingStatus(
            bookingId,
            status
          );


        setBookings(
          (previous) =>
            previous.map(
              (booking) =>
                booking._id ===
                bookingId
                  ? response.data
                  : booking
            )
        );


      } catch (error) {

        console.error(
          "Status update error:",
          error
        );


        alert(
          error?.response?.data
            ?.message ||
          "Failed to update status."
        );

      } finally {

        setUpdatingId(null);

      }

    };


  const pendingCount =
    bookings.filter(
      (b) =>
        b.status ===
        "Pending"
    ).length;


  const confirmedCount =
    bookings.filter(
      (b) =>
        b.status ===
        "Confirmed"
    ).length;


  const completedCount =
    bookings.filter(
      (b) =>
        b.status ===
        "Completed"
    ).length;


  return (
    <>
      <Navbar />


      <section className="admin-page">

        <div className="admin-head">

          <div>

            <div className="eyebrow">
              Management console
            </div>


            <h1>
              Good afternoon, Admin.
            </h1>


            <p>
              Here's what is happening
              with your service business
              today.
            </p>

          </div>


          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap"
            }}
          >

            <button
              className="btn ghost"
              type="button"
              onClick={
                handleLogout
              }
            >

              <LogOut
                size={16}
              />

              Logout

            </button>


            <button
              className="btn primary"
              type="button"
              onClick={
                loadBookings
              }
            >

              <RefreshCw
                size={16}
              />

              Refresh

            </button>

          </div>

        </div>


        {/* METRICS */}

        <div className="dash-grid">

          <div className="metric">

            <div className="metric-icon">
              📅
            </div>

            <span>
              Total bookings
            </span>

            <b>
              {bookings.length}
            </b>

            <small>
              All bookings
            </small>

          </div>


          <div className="metric">

            <div className="metric-icon">
              🟡
            </div>

            <span>
              Pending
            </span>

            <b>
              {pendingCount}
            </b>

            <small>
              Waiting for action
            </small>

          </div>


          <div className="metric">

            <div className="metric-icon">
              🟢
            </div>

            <span>
              Confirmed
            </span>

            <b>
              {confirmedCount}
            </b>

            <small>
              Confirmed bookings
            </small>

          </div>


          <div className="metric">

            <div className="metric-icon">
              ⭐
            </div>

            <span>
              Completed
            </span>

            <b>
              {completedCount}
            </b>

            <small>
              Completed services
            </small>

          </div>

        </div>


        {/* BOOKINGS */}

        <div className="dashboard-content">

          <div className="panel">

            <div className="panel-head">

              <h2>
                Recent bookings
              </h2>


              <button
                type="button"
                onClick={
                  loadBookings
                }
                className="btn ghost"
              >
                Refresh
              </button>

            </div>


            {loading ? (

              <p
                style={{
                  padding: "20px"
                }}
              >
                Loading bookings...
              </p>

            ) : bookings.length ===
              0 ? (

              <p
                style={{
                  padding: "20px"
                }}
              >
                No bookings found.
              </p>

            ) : (

              bookings.map(
                (booking) => (

                  <div
                    className="booking-row"
                    key={
                      booking._id
                    }
                  >

                    <div className="avatar">

                      {(booking.name ||
                        "U")
                        .split(" ")
                        .map(
                          (x) =>
                            x[0]
                        )
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}

                    </div>


                    <div className="grow">

                      <b>
                        {booking.name}
                      </b>


                      <span>
                        {booking.phone ||
                          "No phone"}{" "}
                        ·{" "}
                        {booking.date ||
                          "No date"}
                      </span>


                      <small>
                        {booking.address ||
                          "No address"}
                      </small>

                    </div>


                    <strong>
                      {booking.time ||
                        "Time not set"}
                    </strong>


                    {/* STATUS */}

                    <select
                      value={
                        booking.status ||
                        "Pending"
                      }
                      disabled={
                        updatingId ===
                        booking._id
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          booking._id,
                          e.target.value
                        )
                      }
                      style={{
                        padding:
                          "8px 10px",
                        borderRadius:
                          "8px",
                        border:
                          "1px solid rgba(255,255,255,0.15)",
                        background:
                          "rgba(255,255,255,0.06)",
                        color:
                          "inherit"
                      }}
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Confirmed">
                        Confirmed
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </div>

                )
              )

            )}

          </div>


          {/* OVERVIEW */}

          <div className="panel chart-panel">

            <div className="panel-head">

              <h2>
                Bookings overview
              </h2>

              <span>
                Live data
              </span>

            </div>


            <div className="chart">

              {[
                42,
                60,
                48,
                78,
                66,
                88,
                72
              ].map(
                (h, i) => (

                  <div
                    className="bar-wrap"
                    key={i}
                  >

                    <div
                      className="bar"
                      style={{
                        height:
                          `${h}%`
                      }}
                    ></div>


                    <small>
                      {
                        [
                          "M",
                          "T",
                          "W",
                          "T",
                          "F",
                          "S",
                          "S"
                        ][i]
                      }
                    </small>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

      </section>


      <Footer />

    </>
  );
}


// ==================================================
// TRACK BOOKING
// ==================================================

function TrackBookingPage() {

  const [bookingId, setBookingId] =
    useState(
      localStorage.getItem(
        "customerBookingId"
      ) || ""
    );


  const [booking, setBooking] =
    useState(null);


  const [loading, setLoading] =
    useState(false);


  const [error, setError] =
    useState("");


  const handleSearch =
    async (e) => {

      e.preventDefault();


      if (!bookingId.trim()) {

        setError(
          "Please enter your booking ID."
        );

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
      } catch (error) {

        console.error(
          "Track booking error:",
          error
        );


        setError(
          error.message ||
          "Booking not found."
        );

      } finally {

        setLoading(false);

      }

    };


  const getStatusClass =
    (status) => {

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
      <Navbar />


      <div className="success-page">

        <div className="booking-form">

          <div className="eyebrow">
            Booking Tracker
          </div>


          <h1>
            Track your booking
          </h1>


          <p>
            Enter your booking ID to
            check the latest status.
          </p>


          <form
            onSubmit={
              handleSearch
            }
          >

            <label>

              Booking ID

              <input
                type="text"
                value={bookingId}
                onChange={(e) =>
                  setBookingId(
                    e.target.value
                  )
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

              <Search
                size={18}
              />

            </button>

          </form>


          {error && (

            <p
              style={{
                marginTop: "20px"
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
                borderRadius:
                  "15px",
                background:
                  "rgba(255,255,255,0.06)"
              }}
            >

              <h2>
                Booking Details
              </h2>


              <p>
                <b>
                  Customer:
                </b>{" "}
                {booking.name}
              </p>


              <p>
                <b>
                  Phone:
                </b>{" "}
                {booking.phone}
              </p>


              <p>
                <b>
                  Date:
                </b>{" "}
                {booking.date}
              </p>


              <p>
                <b>
                  Time:
                </b>{" "}
                {booking.time}
              </p>


              <p>
                <b>
                  Address:
                </b>{" "}
                {booking.address}
              </p>


              <p>

                <b>
                  Status:
                </b>{" "}


                <span
                  className={`badge ${
                    getStatusClass(
                      booking.status
                    )
                  }`}
                >
                  {booking.status}
                </span>

              </p>

            </div>

          )}

        </div>

      </div>


      <Footer />

    </>
  );
}


// ==================================================
// FOOTER
// ==================================================

function Footer() {

  return (

    <footer>

      <div className="brand">
        ✦ Service<span>Hub</span>
      </div>


      <p>
        Making everyday services simpler,
        one booking at a time.
      </p>


      <span>
        © 2026 Smart ServiceHub
      </span>

    </footer>

  );
}


// ==================================================
// APP
// ==================================================

export default function App() {

  return (

    <Routes>

      <Route
        path="/"
        element={<Home />}
      />


      <Route
        path="/book/:id"
        element={<Booking />}
      />


      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />


      <Route
        path="/admin"
        element={<ProtectedAdmin />}
      />


      <Route
        path="/track-booking"
        element={
          <TrackBookingPage />
        }
      />

    </Routes>

  );

}