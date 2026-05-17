import React from 'react';
import { Compass, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-24 pb-12 px-6 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">T</div>
              <span className="font-sans font-extrabold text-3xl tracking-tight text-slate-900">Travel & Tours</span>
            </Link>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
              We make domestic travel affordable and aspirational. Explore local gems with experts who care about your budget and your experience.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/budgettrips2025?igsh=MXFhZm8wY3pqbjhqdA==' },
                { Icon: Facebook, href: 'https://facebook.com' },
                { Icon: Twitter, href: 'https://twitter.com' }
              ].map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center hover:bg-accent hover:border-accent hover:text-white transition-all">
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li><Link to="/destinations" className="hover:text-accent transition-colors">Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-accent transition-colors">Packages</Link></li>
              <li><Link to="/planner" className="hover:text-accent transition-colors">AI Planner</Link></li>
              <li><Link to="/blog" className="hover:text-accent transition-colors">Travel Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-accent" /> budgettrip4u@gmail.com</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-accent" /> +91 92178 07801</li>
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-accent" /> Sector 4, Gurgaon, Landmark, GURUGRAM, HARYANA, India - 122001</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              &copy; {new Date().getFullYear()} TRAVEL & TOURS TRAVELS.
            </p>
            <div className="flex items-center space-x-2 text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Google Maps Integration Active</span>
            </div>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
