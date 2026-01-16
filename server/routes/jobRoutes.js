import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
} from "../controllers/jobController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, authorizeRoles("recruiter"), createJob);
router.get("/", getJobs);
router.get("/:id", getJobById);

export default router;
