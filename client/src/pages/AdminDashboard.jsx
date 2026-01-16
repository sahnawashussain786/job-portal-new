import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Users, Briefcase, FileText, CheckCircle } from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentApplications, setRecentApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchAdminData();
    }
  }, [user, navigate]);

  const fetchAdminData = async () => {
    try {
      const { data } = await axios.get("/admin/stats");
      if (data.success) {
        setStats(data.stats);
        setRecentApplications(data.recentApplications);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading Admin Dashboard...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">
          Admin Overview
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatsCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            color="bg-blue-100"
            label="Total Users"
            value={stats?.totalUsers}
          />
          <StatsCard
            icon={<Briefcase className="w-6 h-6 text-green-600" />}
            color="bg-green-100"
            label="Total Jobs"
            value={stats?.totalJobs}
          />
          <StatsCard
            icon={<FileText className="w-6 h-6 text-purple-600" />}
            color="bg-purple-100"
            label="Applications"
            value={stats?.totalApplications}
          />
          <StatsCard
            icon={<CheckCircle className="w-6 h-6 text-orange-600" />}
            color="bg-orange-100"
            label="Recruiters"
            value={stats?.totalRecruiters}
          />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-bold mb-6 text-gray-800">
            Recent Applications
          </h3>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">
                    Applicant
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">
                    Job Title
                  </th>
                  <th className="text-left p-4 font-semibold text-gray-600 text-sm">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentApplications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <div className="font-medium text-gray-900">
                        {app.applicant?.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        {app.applicant?.email}
                      </div>
                    </td>
                    <td className="p-4 text-gray-700 text-sm">
                      {app.job?.title}
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, color, label, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}
    >
      {icon}
    </div>
    <h3 className="text-gray-500 font-medium text-sm">{label}</h3>
    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

export default AdminDashboard;
