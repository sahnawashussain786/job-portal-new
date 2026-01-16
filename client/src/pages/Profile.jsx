import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  Mail,
  Briefcase,
  Code,
  MapPin,
  Save,
  FileText,
} from "lucide-react";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user, login } = useAuth(); // Re-login to update context if needed, or create a separate update function
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    company: "",
    location: "",
    resumeOriginalName: "",
  });

  useEffect(() => {
    // Fetch fresh user data? Or just use context?
    // Better to fetch fresh data in a real app, but context is okay for now.
    if (user) {
      setFormData({
        bio: user.profile?.bio || "",
        skills: user.profile?.skills?.join(", ") || "",
        company: user.profile?.company || "",
        location: user.profile?.location || "",
        resumeOriginalName: user.profile?.resumeOriginalName || "",
      });
      setLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Need an endpoint to update profile!
      // We didn't create a specific update user endpoint in the planning phase.
      // Let's assume we'll create it now as /api/auth/profile
      const { data } = await axios.put("/auth/profile", {
        ...formData,
        skills: formData.skills.split(",").map((s) => s.trim()),
      });

      if (data.success) {
        toast.success("Profile updated successfully!");
        // hack to update context: reload or complex context update
        // For now, let's keep it simple. Ideally context should have an update function.
      }
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="min-h-screen p-6 bg-slate-50 flex items-center justify-center">
      <div className="container max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="bg-slate-900 text-white p-10 md:w-1/3 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold mb-6 shadow-xl border-4 border-slate-800">
            {user?.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
          <p className="text-slate-400 uppercase text-xs font-semibold tracking-wider mb-6">
            {user?.role}
          </p>

          <div className="w-full text-left space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <Mail className="w-5 h-5 text-blue-400" />
              <span className="text-sm truncate">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <span className="text-sm truncate">
                Member since {new Date(user?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="w-full mt-8 pt-8 border-t border-slate-700/50">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-left">
              Quick Actions
            </h4>
            {user?.role === "candidate" && (
              <Link
                to="/my-applications"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition group mb-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-white">
                    My Applications
                  </span>
                  <span className="block text-xs text-slate-400">
                    Track status & updates
                  </span>
                </div>
              </Link>
            )}

            {user?.role === "recruiter" && (
              <Link
                to="/dashboard"
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 transition group mb-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-sm font-bold text-white">
                    Hiring Dashboard
                  </span>
                  <span className="block text-xs text-slate-400">
                    Manage jobs & applicants
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="p-10 md:w-2/3">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="text-blue-600" /> Edit Profile
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {user?.role === "recruiter" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Bio / Summary
              </label>
              <textarea
                name="bio"
                rows="4"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Skills (comma separated)
              </label>
              <div className="relative">
                <Code className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-gray-50"
                  placeholder="React, Node.js, Design..."
                />
              </div>
            </div>

            {user?.role === "candidate" && formData.resumeOriginalName && (
              <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3 text-blue-700 border border-blue-100">
                <FileText className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Uploaded Resume: {formData.resumeOriginalName}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
            >
              <Save className="w-5 h-5" /> Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
