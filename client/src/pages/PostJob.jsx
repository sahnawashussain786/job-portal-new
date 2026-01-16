import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  FileText,
  PlusCircle,
} from "lucide-react";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });
  const { user } = useAuth();
  const navigate = useNavigate();

  // Basic role check protection access
  if (user && user.role !== "recruiter") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white p-8 rounded-xl shadow-sm text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-slate-600">
            Only recruiters can post new job listings.
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/jobs", formData);
      if (data.success) {
        toast.success("Job posted successfully");
        navigate("/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative py-12 px-4 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-100/40 blur-[120px] rounded-full transform translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-indigo-100/40 blur-[120px] rounded-full transform -translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
            <Briefcase className="w-3 h-3" /> For Recruiters
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Post a New Opportunity
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Find the perfect talent for your team. Create a compelling job post
            to attract top candidates.
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Title */}
            <div>
              <label className="block text-slate-700 font-bold mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" /> Job Title
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Senior Frontend Engineer"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/50 text-slate-900 font-medium placeholder:text-slate-400"
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Company */}
              <div>
                <label className="block text-slate-700 font-bold mb-2 flex items-center gap-2">
                  <Building className="w-4 h-4 text-purple-500" /> Company
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="e.g. Acme Corp"
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/50 text-slate-900 font-medium placeholder:text-slate-400"
                  onChange={handleChange}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-slate-700 font-bold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. New York, NY (or Remote)"
                  className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/50 text-slate-900 font-medium placeholder:text-slate-400"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-slate-700 font-bold mb-2 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-500" /> Salary
                (Annual)
              </label>
              <input
                type="number"
                name="salary"
                placeholder="e.g. 120000"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/50 text-slate-900 font-medium placeholder:text-slate-400"
                onChange={handleChange}
              />
              <p className="text-xs text-slate-400 mt-2 font-medium">
                Leave blank if negotiable or not disclosed.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-700 font-bold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-500" /> Job Description
              </label>
              <textarea
                name="description"
                required
                rows="8"
                placeholder="Describe the role, responsibilities, and requirements..."
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white/50 text-slate-900 font-medium placeholder:text-slate-400 resize-none"
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition transform hover:-translate-y-0.5 shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" /> Publish Job Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
