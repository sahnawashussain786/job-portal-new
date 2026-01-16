import express from "express";
import { getAdminStats } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Ideally, add an authorizeRoles('admin') middleware here.
// For this demo, we'll allow any authenticated user to view stats,
// or you could restrict it to recruiters as well if "Admin" logic isn't strictly defined.
router.get("/stats", verifyToken, getAdminStats);

export default router;
