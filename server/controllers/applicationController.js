import Application from "../models/Application.js";
import Job from "../models/Job.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// Apply for a job
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id; // From verifyToken

    // Check if valid job
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      // Clean up uploaded file if it exists, as we are returning early
      if (req.file) fs.unlinkSync(req.file.path);
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    if (!req.file)
      return res.status(400).json({ message: "Resume is required" });

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "resumes",
      resource_type: "auto",
    });

    // Remove file from local storage
    fs.unlinkSync(req.file.path);

    const application = await Application.create({
      job: jobId,
      applicant: userId,
      resumeUrl: result.secure_url,
      resumePublicId: result.public_id,
    });

    // Optionally add to Job's applicants list (if schema has it)
    job.applicants.push(userId);
    await job.save();

    res.status(201).json({ success: true, application });
  } catch (error) {
    // Clean up file on error
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ message: error.message });
  }
};

// Get applications for recruiter's jobs
export const getRecruiterApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all jobs posted by this recruiter
    const jobs = await Job.find({ postedBy: userId });
    const jobIds = jobs.map((job) => job._id);

    // Find applications for these jobs
    const applications = await Application.find({ job: { $in: jobIds } })
      .populate("job", "title")
      .populate("applicant", "name email");

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get applications for candidate
export const getCandidateApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        select: "title company location salary status",
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
