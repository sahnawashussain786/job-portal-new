import { Briefcase, User, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-slate-900 p-2 rounded-lg">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            JobPortal
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/jobs"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            Find Jobs
          </Link>
          <Link
            to="/companies"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            Companies
          </Link>
          {user?.role === "recruiter" && (
            <Link
              to="/post-job"
              className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
            >
              Post a Job
            </Link>
          )}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <div className="text-right">
                <span className="block text-sm font-bold text-slate-900 leading-none">
                  {user.name}
                </span>
                <span className="block text-[10px] text-slate-500 uppercase font-bold tracking-wider mt-1">
                  {user.role}
                </span>
                {user.role === "candidate" && (
                  <Link
                    to="/my-applications"
                    className="block text-[10px] text-blue-600 font-bold hover:underline mt-1"
                  >
                    My Applications
                  </Link>
                )}
              </div>

              <div className="relative group">
                <Link
                  to="/profile"
                  className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
                >
                  {user.name.charAt(0)}
                </Link>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm font-semibold text-slate-400 hover:text-red-500 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-900 transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md shadow-blue-500/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 shadow-xl absolute w-full left-0">
          <div className="flex flex-col gap-4">
            <Link to="/jobs" className="text-slate-600 font-semibold py-2">
              Find Jobs
            </Link>
            {user?.role === "recruiter" && (
              <Link
                to="/post-job"
                className="text-slate-600 font-semibold py-2"
              >
                Post a Job
              </Link>
            )}
            {!user && (
              <>
                <Link to="/login" className="text-slate-600 font-semibold py-2">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white font-bold py-3 rounded-lg text-center"
                >
                  Get Started
                </Link>
              </>
            )}
            {user && (
              <>
                <Link
                  to="/profile"
                  className="text-slate-600 font-semibold py-2"
                >
                  My Profile
                </Link>
                {user?.role === "candidate" && (
                  <Link
                    to="/my-applications"
                    className="text-slate-600 font-semibold py-2"
                  >
                    My Applications
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-left text-red-500 font-semibold py-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
