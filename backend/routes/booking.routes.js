import { Router } from "express";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/auth.js";

const router = Router();


// ================= CREATE BOOKING =================

router.post("/", async (req, res) => {
  try {

    const booking =
      await Booking.create(req.body);

    res.status(201).json(booking);

  } catch (e) {

    res.status(400).json({
      message: e.message
    });

  }
});


// ================= GET ALL BOOKINGS =================

router.get("/", protect, async (req, res) => {
  try {

    const bookings =
      await Booking.find()
        .populate("service customer")
        .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (e) {

    res.status(500).json({
      message: e.message
    });

  }
});


// ================= GET SINGLE BOOKING =================

router.get("/:id", async (req, res) => {
  try {

    const booking =
      await Booking.findById(
        req.params.id
      );

    if (!booking) {

      return res.status(404).json({
        message: "Booking not found"
      });

    }

    res.json(booking);

  } catch (e) {

    res.status(400).json({
      message: "Invalid booking ID"
    });

  }
});


// ================= UPDATE STATUS =================

router.patch(
  "/:id/status",
  protect,
  async (req, res) => {

    try {

      const booking =
        await Booking.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status
          },
          {
            new: true,
            runValidators: true
          }
        );

      if (!booking) {

        return res.status(404).json({
          message: "Booking not found"
        });

      }

      res.json(booking);

    } catch (e) {

      res.status(400).json({
        message: e.message
      });

    }

  }
);


export default router;