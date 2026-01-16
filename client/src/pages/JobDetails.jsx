import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import {
  MapPin,
  Building,
  DollarSign,
  Calendar,
  ArrowLeft,
} from "lucide-react";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resume, setResume] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data } = await axios.get(`/jobs/${id}`);
      if (data.success) setJob(data.job);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error("Please upload a resume");

    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("resume", resume);

    try {
      const { data } = await axios.post("/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        toast.success("Applied successfully!");
        navigate("/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!job) return <div className="p-10 text-center">Job not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {job.title}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 mb-6 font-medium">
                <Building className="w-5 h-5 text-blue-500" /> {job.company}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="block text-xs uppercase text-gray-400 font-bold mb-1">
                    Salary
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-gray-900">
                    <DollarSign className="w-4 h-4 text-green-600" />{" "}
                    {job.salary ? job.salary.toLocaleString() : "Negotiable"}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="block text-xs uppercase text-gray-400 font-bold mb-1">
                    Location
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-gray-900">
                    <MapPin className="w-4 h-4 text-red-500" /> {job.location}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl">
                  <span className="block text-xs uppercase text-gray-400 font-bold mb-1">
                    Posted
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-gray-900">
                    <Calendar className="w-4 h-4 text-purple-500" />{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Job Description</h3>
              <div className="prose text-gray-600 leading-relaxed whitespace-pre-wrap">
                {job.description}
              </div>
            </div>
          </div>

          {/* Sidebar / Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-24">
              <h3 className="text-lg font-bold mb-4">Interested?</h3>
              {user?.role === "candidate" ? (
                <form onSubmit={handleApply} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Resume (PDF)
                    </label>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files[0])}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30"
                  >
                    Apply Now
                  </button>
                </form>
              ) : user?.role === "recruiter" &&
                user._id === job.postedBy._id ? (
                <div>
                  <p className="text-gray-600 mb-4 bg-yellow-50 p-3 rounded-lg text-sm border border-yellow-100">
                    You are the creator of this job posting.
                  </p>
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full bg-gray-900 text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition"
                  >
                    Manage Applications
                  </button>
                </div>
              ) : (
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 mb-2">
                    Please login as a candidate to apply.
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Login here
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
