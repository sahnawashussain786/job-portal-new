import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Search, MapPin, DollarSign, Briefcase } from "lucide-react";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* New Filter Logic State */
  const [filterType, setFilterType] = useState("All"); // Full-time, Part-time, Contract
  const [filterRemote, setFilterRemote] = useState(false); // Remote Only

  useEffect(() => {
    fetchJobs();
  }, [search, filterType, filterRemote]);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`/jobs?search=${search}`);
      if (data.success) {
        let filtered = data.jobs;
        // Client-side filtering
        if (filterType !== "All") {
          filtered = filtered.filter(
            (job) =>
              job.description
                .toLowerCase()
                .includes(filterType.toLowerCase()) ||
              job.title.toLowerCase().includes(filterType.toLowerCase())
          );
        }
        if (filterRemote) {
          filtered = filtered.filter((job) =>
            job.location.toLowerCase().includes("remote")
          );
        }
        setJobs(filtered);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Explore Opportunities
            </h2>
            <p className="text-slate-500 mt-1">
              Find the perfect role that matches your expertise.
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search jobs, companies, keywords..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent shadow-sm transition bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-slate-200">
          {["All", "Full-time", "Part-time", "Contract"].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                filterType === type
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              {type}
            </button>
          ))}
          <button
            onClick={() => setFilterRemote(!filterRemote)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition flex items-center gap-2 ${
              filterRemote
                ? "bg-emerald-600 text-white"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {filterRemote && (
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            )}{" "}
            Remote Only
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 bg-slate-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="pro-card rounded-xl p-6 flex flex-col justify-between h-full group hover:border-blue-500"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition duration-300">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition">
                    {job.title}
                  </h3>
                  <p className="text-slate-500 font-medium text-sm mb-5 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>{" "}
                    {job.company}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />{" "}
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded border border-emerald-100">
                      <DollarSign className="w-3.5 h-3.5" />{" "}
                      {job.salary
                        ? `$${job.salary.toLocaleString()}`
                        : "Negotiable"}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/jobs/${job._id}`}
                  className="block w-full text-center py-3 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition"
                >
                  View Position
                </Link>
              </div>
            ))}
            {jobs.length === 0 && (
              <div className="text-center col-span-3 py-20 bg-white rounded-xl border border-slate-200 border-dashed">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  No jobs found
                </h3>
                <p className="text-slate-500">
                  Try adjusting your search criteria or filters.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
