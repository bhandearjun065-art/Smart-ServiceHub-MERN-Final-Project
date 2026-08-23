import { Router } from "express";
import Service from "../models/Service.js";
import { protect } from "../middleware/auth.js";

const router = Router();

// ================= GET ACTIVE SERVICES =================

router.get("/", async (req, res) => {
  try {
    const services = await Service.find({
      active: true
    }).sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// ================= ADD SERVICE =================
// Admin only

router.post("/", protect, async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json(service);
  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});


// ================= UPDATE SERVICE =================
// Admin only

router.patch("/:id", protect, async (req, res) => {
  try {
    const service =
      await Service.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

    if (!service) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    res.json(service);

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});


// ================= DEACTIVATE SERVICE =================
// Admin only

router.delete("/:id", protect, async (req, res) => {
  try {
    const service =
      await Service.findByIdAndUpdate(
        req.params.id,
        {
          active: false
        },
        {
          new: true
        }
      );

    if (!service) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    res.json({
      message: "Service deactivated successfully",
      service
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});


export default router;