import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { User, Activity } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate"); // 'candidate' or 'recruiter'
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(name, email, password, role);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden py-10">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-900 skew-y-3 origin-top-left -z-10 absolute-cover"></div>

      <div className="container max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row mx-4">
        {/* Info Side */}
        <div className="bg-blue-600 p-10 md:w-5/12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 opacity-90 z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">
              Join the Elite Professional Network
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="p-1 rounded bg-blue-500/50 mt-1">
                  <User className="w-4 h-4" />
                </div>
                <p className="text-blue-50 text-sm leading-relaxed">
                  Access exclusive opportunities from top-tier global companies.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="p-1 rounded bg-blue-500/50 mt-1">
                  <Activity className="w-4 h-4" />
                </div>
                <p className="text-blue-50 text-sm leading-relaxed">
                  Streamline your hiring process with our advanced recruiter
                  tools.
                </p>
              </li>
            </ul>
          </div>
          <div className="relative z-10 mt-10">
            <p className="text-blue-200 text-xs">
              Trusted by 10,000+ companies worldwide.
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-10 md:w-7/12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
              <button
                type="button"
                onClick={() => setRole("candidate")}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition ${
                  role === "candidate"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Job Seeker
              </button>
              <button
                type="button"
                onClick={() => setRole("recruiter")}
                className={`flex-1 py-2 text-sm font-bold rounded-md transition ${
                  role === "recruiter"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                Employer
              </button>
            </div>

            <div>
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 focus:bg-white transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-lg hover:bg-slate-800 transition transform hover:-translate-y-0.5 mt-4"
            >
              Register as {role === "candidate" ? "Job Seeker" : "Employer"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
