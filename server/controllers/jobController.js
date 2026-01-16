import Job from "../models/Job.js";

// Create a new job
export const createJob = async (req, res) => {
  try {
    const { title, description, company, location, salary } = req.body;

    const job = await Job.create({
      title,
      description,
      company,
      location,
      salary,
      postedBy: req.user.id,
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all jobs with optional search
export const getJobs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };
    }

    const jobs = await Job.find(query).populate("postedBy", "name company");
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "postedBy",
      "name company"
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
