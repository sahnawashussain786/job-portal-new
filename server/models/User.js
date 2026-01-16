import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["candidate", "recruiter"],
      default: "candidate",
    },
    profile: {
      bio: String,
      skills: [String],
      resume: String, // URL from Cloudinary
      resumeOriginalName: String,
      company: String, // For recruiters
      location: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
