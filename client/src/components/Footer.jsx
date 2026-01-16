import {
  Briefcase,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                JobPortal
              </span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed text-sm">
              The leading innovative platform for connecting global talent with
              future-forward companies.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter className="w-4 h-4" />} />
              <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
              <SocialIcon icon={<Facebook className="w-4 h-4" />} />
              <SocialIcon icon={<Instagram className="w-4 h-4" />} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">
              Candidates
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/jobs">Browse Jobs</FooterLink>
              <FooterLink to="/jobs">Browse Categories</FooterLink>
              <FooterLink to="/dashboard">Candidate Dashboard</FooterLink>
              <FooterLink to="#">Career Advice</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">
              Employers
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="/post-job">Post a Job</FooterLink>
              <FooterLink to="/dashboard">Recruiter Dashboard</FooterLink>
              <FooterLink to="#">Pricing Plans</FooterLink>
              <FooterLink to="#">Hiring Resources</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-wider">
              Support
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterLink to="#">Help Center</FooterLink>
              <FooterLink to="#">Privacy Policy</FooterLink>
              <FooterLink to="#">Terms of Service</FooterLink>
              <FooterLink to="#">Contact Us</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} JobPortal Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <Link to="#" className="hover:text-white transition">
              Privacy
            </Link>
            <Link to="#" className="hover:text-white transition">
              Terms
            </Link>
            <Link to="#" className="hover:text-white transition">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <a
    href="#"
    className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="hover:text-blue-400 transition block">
      {children}
    </Link>
  </li>
);

export default Footer;
