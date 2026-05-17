import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Plane, MapPin, Sparkles, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero({ onSearch }: { onSearch?: (query: string) => void }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
      // Scroll to packages section
      const packagesSection = document.getElementById('packages-section');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden pt-20">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_banner_1779015309085.png"
          alt="Travel & Tours Hero"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/40 to-primary" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="small-caps">Welcome to Travel & Tours</span>
            <div className="h-[1px] w-12 bg-accent opacity-50" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-[1.1] tracking-tighter text-slate-900">
            India Awaits, <br />
            <span className="text-accent underline decoration-slate-200 underline-offset-8">Explore More.</span>
          </h1>
          
          <p className="text-slate-500 text-lg mb-10 max-w-lg leading-relaxed font-medium">
            Find the best domestic travel deals tailored for your budget. From Himalayan peaks to Kerala's serenity.
          </p>

          <form onSubmit={handleSearch} className="relative max-w-xl group mb-6">
            <div className="absolute inset-0 bg-accent/5 blur-2xl rounded-full scale-90 group-focus-within:scale-110 transition-transform duration-500" />
            <div className="relative flex items-center glass-surface p-2 rounded-[2rem] shadow-2xl border-white/50 border overflow-hidden">
              <div className="pl-6 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Where do you want to go? (e.g. Udaipur, Kerala)"
                className="w-full bg-transparent border-none outline-none px-4 py-4 font-bold text-slate-900 placeholder:text-slate-300 placeholder:font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-slate-900 text-white px-8 py-4 rounded-3xl font-bold hover:bg-accent transition-all active:scale-95 shadow-lg flex items-center gap-2 whitespace-nowrap"
              >
                Search <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2 mb-10 max-w-xl">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2 py-1">Popular:</span>
            {['Goa', 'Manali', 'Kashmir', 'Kerala', 'Ladakh', 'Udaipur', 'Andaman', 'Rishikesh'].map((dest) => (
              <button
                key={dest}
                onClick={() => {
                  setQuery(dest);
                  if (onSearch) {
                    onSearch(dest);
                    document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-3 py-1 bg-white/50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-600 hover:bg-accent hover:text-white hover:border-accent transition-all cursor-pointer"
              >
                {dest}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/planner" className="bg-white border border-slate-200 px-8 py-4 rounded-2xl font-extrabold text-slate-800 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
              <Sparkles className="w-4 h-4 text-accent" /> Custom AI Itinerary
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:block relative"
        >
          <div className="glass-surface p-8 rounded-3xl relative z-10 shadow-2xl">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <MapPin className="w-6 h-6 text-accent mb-3" />
                <h4 className="font-bold text-slate-800 text-lg">Top Rated</h4>
                <p className="text-xs text-slate-400 font-medium">Udaipur Royal Tour</p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <Plane className="w-6 h-6 text-accent mb-3" />
                <h4 className="font-bold text-slate-800 text-lg">New Deals</h4>
                <p className="text-xs text-slate-400 font-medium">Munnar Getaway</p>
              </div>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 blur-3xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}
