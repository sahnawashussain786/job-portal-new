import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Job from "./models/Job.js";
import Application from "./models/Application.js";
import connectDB from "./config/db.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Job.deleteMany({});
    await Application.deleteMany({});

    console.log("Creating users...");
    const hashedPassword = await bcrypt.hash("password123", 10);

    const recruiters = await User.create([
      {
        name: "Tech Recruiter",
        email: "recruiter@tech.com",
        password: hashedPassword,
        role: "recruiter",
        profile: { company: "Tech Corp", location: "San Francisco, CA" },
      },
      {
        name: "Startup Founder",
        email: "founder@startup.io",
        password: hashedPassword,
        role: "recruiter",
        profile: { company: "Startup.io", location: "Austin, TX" },
      },
    ]);

    const candidates = await User.create([
      {
        name: "John Developer",
        email: "john@dev.com",
        password: hashedPassword,
        role: "candidate",
        profile: {
          bio: "Full stack developer willing to learn.",
          skills: ["JavaScript", "React", "Node.js"],
        },
      },
      {
        name: "Jane Designer",
        email: "jane@design.com",
        password: hashedPassword,
        role: "candidate",
        profile: {
          bio: "Creative UI/UX designer.",
          skills: ["Figma", "CSS", "Tailwind"],
        },
      },
      {
        name: "Alex Engineer",
        email: "alex@eng.com",
        password: hashedPassword,
        role: "candidate",
        profile: {
          bio: "Backend specialist.",
          skills: ["Python", "Django", "SQL"],
        },
      },
    ]);

    console.log("Creating jobs...");
    const jobs = await Job.create([
      {
        title: "Senior React Developer",
        description:
          "We are looking for an experienced React developer to lead our frontend team. Must have 5+ years of experience.",
        company: "Tech Corp",
        location: "Remote",
        salary: 120000,
        postedBy: recruiters[0]._id,
      },
      {
        title: "Junior Backend Engineer",
        description:
          "Join our backend team to build scalable APIs using Node.js and MongoDB.",
        company: "Tech Corp",
        location: "San Francisco, CA",
        salary: 80000,
        postedBy: recruiters[0]._id,
      },
      {
        title: "UI/UX Designer",
        description: "Design beautiful interfaces for our next-gen products.",
        company: "Startup.io",
        location: "Austin, TX",
        salary: 95000,
        postedBy: recruiters[1]._id,
      },
      {
        title: "Full Stack Engineer",
        description:
          "Handle both frontend and backend for our rapid growth phase.",
        company: "Startup.io",
        location: "Remote",
        salary: 110000,
        postedBy: recruiters[1]._id,
      },
    ]);

    console.log("Creating applications...");
    // specific URL or just a placeholder if validation allows
    const resumeUrl =
      "https://res.cloudinary.com/demo/image/upload/v1/docs/resume.pdf";

    await Application.create([
      {
        job: jobs[0]._id,
        applicant: candidates[0]._id,
        resumeUrl,
        status: "applied",
      },
      {
        job: jobs[1]._id,
        applicant: candidates[2]._id,
        resumeUrl,
        status: "shortlisted",
      },
      {
        job: jobs[2]._id,
        applicant: candidates[1]._id,
        resumeUrl,
        status: "applied",
      },
      {
        job: jobs[3]._id,
        applicant: candidates[0]._id,
        resumeUrl,
        status: "rejected",
      },
    ]);

    console.log("Data Imported Successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
