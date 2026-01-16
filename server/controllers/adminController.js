import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRecruiters = await User.countDocuments({ role: "recruiter" });
    const totalCandidates = await User.countDocuments({ role: "candidate" });
    const totalJobs = await Job.countDocuments();
    const totalApplications = await Application.countDocuments();

    // Get recent applications
    const recentApplications = await Application.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("job", "title")
      .populate("applicant", "name email");

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalRecruiters,
        totalCandidates,
        totalJobs,
        totalApplications,
      },
      recentApplications,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
