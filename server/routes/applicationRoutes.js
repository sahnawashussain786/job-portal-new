import express from "express";
import {
  applyForJob,
  getRecruiterApplications,
  getCandidateApplications,
} from "../controllers/applicationController.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorizeRoles("candidate"),
  upload.single("resume"),
  applyForJob
);
router.get(
  "/recruiter",
  verifyToken,
  authorizeRoles("recruiter"),
  getRecruiterApplications
);

router.get(
  "/my-applications",
  verifyToken,
  authorizeRoles("candidate"),
  getCandidateApplications
);

export default router;
