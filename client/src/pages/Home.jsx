import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Search,
  Activity,
  Building,
  Globe,
  Users,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600 blur-[150px] rounded-full transform translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-1/2 h-full bg-indigo-900 blur-[150px] rounded-full transform -translate-x-1/3" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="animate-fade-in max-w-4xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-sm font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              The #1 Platform for Top Talent
            </span>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight text-white">
              Build Your Career with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">
                World-Class Companies
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join over 500,000 professionals finding their dream jobs. We
              connect you with industry leaders in Tech, Finance, Design, and
              Engineering.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/jobs"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-500 transition shadow-lg shadow-blue-900/50"
              >
                <Search className="w-5 h-5" /> Find a Job
              </Link>

              {!user && (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-lg text-lg font-semibold hover:bg-slate-700 transition"
                >
                  Join for Free
                </Link>
              )}
              {user?.role === "recruiter" && (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-lg text-lg font-semibold hover:bg-slate-50 transition shadow-lg"
                >
                  <Activity className="w-5 h-5 text-blue-600" /> Hiring
                  Dashboard
                </Link>
              )}
            </div>

            <div className="mt-16 flex items-center justify-center gap-8 text-slate-400 text-sm font-medium">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Verified
                Companies
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Salary
                Transparency
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Direct
                Applications
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Strip */}
      <section className="border-b border-slate-100 bg-white py-12">
        <div className="container mx-auto px-6">
          <p className="text-center text-slate-500 text-sm font-semibold uppercase tracking-widest mb-8">
            Trusted by Global Innovators
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition duration-500 mix-blend-multiply">
            <span className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Globe className="w-6 h-6" /> Vertex
            </span>
            <span className="text-2xl font-bold font-serif text-slate-800 flex items-center gap-2">
              <Building className="w-6 h-6" /> Pinnacle
            </span>
            <span className="text-2xl font-bold text-slate-800 tracking-tighter flex items-center gap-2">
              <Users className="w-6 h-6" /> Synergy
            </span>
            <span className="text-2xl font-mono font-bold text-slate-800">
              CO/DE
            </span>
            <span className="text-2xl font-bold text-slate-800 italic">
              Nexus
            </span>
          </div>
        </div>
      </section>

      {/* Popular Categories Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Explore Opportunities
              </h2>
              <p className="text-slate-600 max-w-xl">
                Browse roles by category. Our platform hosts the most diverse
                range of opportunities for every skillset.
              </p>
            </div>
            <Link
              to="/jobs"
              className="hidden md:flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              View All Categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryItem title="Software Engineering" count="3.5k+ Jobs" />
            <CategoryItem title="Product Management" count="850+ Jobs" />
            <CategoryItem title="Data Science & AI" count="1.2k+ Jobs" />
            <CategoryItem title="Sales & Marketing" count="2.1k+ Jobs" />
            <CategoryItem title="Desing & Creative" count="900+ Jobs" />
            <CategoryItem title="Finance & Legal" count="600+ Jobs" />
            <CategoryItem title="Human Resources" count="450+ Jobs" />
            <CategoryItem title="Operations" count="1.5k+ Jobs" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 blur-[150px] rounded-full opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
              Ready to Shape Your Future?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Create your professional profile today and let the best companies
              come to you. It takes less than 5 minutes.
            </p>
            <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-slate-900 rounded-lg font-bold hover:bg-slate-50 transition"
              >
                Get Started Now
              </Link>
              <Link
                to="/jobs"
                className="px-8 py-4 bg-transparent border border-slate-600 text-white rounded-lg font-bold hover:bg-slate-800 transition"
              >
                Browse Openings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CategoryItem = ({ title, count }) => (
  <Link
    to={`/jobs?search=${title}`}
    className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition duration-300 block"
  >
    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition mb-2">
      {title}
    </h3>
    <span className="text-sm font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded inline-block group-hover:bg-blue-50 group-hover:text-blue-600 transition">
      {count}
    </span>
  </Link>
);

export default Home;
