import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FileText, CheckCircle, Plus } from "lucide-react";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "recruiter") {
      navigate("/");
    } else {
      fetchApplications();
    }
  }, [user, navigate]);

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get("/applications/recruiter");
      if (data.success) {
        setApplications(data.applications);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-slate-500">
        Loading dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="pro-card bg-white p-8 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Recruiter Dashboard
              </h2>
              <p className="text-slate-500 mt-1">
                Manage jobs and track applicant progress.
              </p>
            </div>
            <button
              onClick={() => navigate("/post-job")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/30"
            >
              <Plus className="w-5 h-5" /> Post New Job
            </button>
          </div>
        </div>

        <div className="pro-card bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-slate-100">
            <h3 className="text-lg font-bold text-slate-800">
              Recent Applications
            </h3>
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <FileText className="w-8 h-8" />
              </div>
              <p className="text-slate-500 text-lg">
                No applications received yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Resume
                    </th>
                    <th className="p-5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-slate-50/50 transition"
                    >
                      <td className="p-5 font-semibold text-slate-800">
                        {app.job?.title || "Job Deleted"}
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs border border-slate-200">
                            {app.applicant?.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900">
                              {app.applicant?.name}
                            </div>
                            <div className="text-xs text-slate-500">
                              {app.applicant?.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-slate-500 text-sm">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-5">
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition"
                        >
                          <FileText className="w-3.5 h-3.5" /> PDF
                        </a>
                      </td>
                      <td className="p-5">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-100">
                          <CheckCircle className="w-3.5 h-3.5" /> {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
