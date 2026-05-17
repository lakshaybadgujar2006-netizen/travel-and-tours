import React from 'react';
import { motion } from 'motion/react';
import { Package } from '../types';
import { MapPin, Star, Clock, ArrowUpRight, Calendar, Activity, Utensils, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import ShareModal from './ShareModal';

import { DOMESTIC_PACKAGES } from '../constants';

export default function PackageGrid({ limit, searchQuery, category, maxPrice, maxDuration, activity }: { 
  limit?: number;
  searchQuery?: string;
  category?: string;
  maxPrice?: number;
  maxDuration?: number;
  activity?: string;
}) {
  const [sharingPkg, setSharingPkg] = React.useState<Package | null>(null);

  const filteredPackages = React.useMemo(() => {
    let result = DOMESTIC_PACKAGES;
    
    if (category && category !== 'all') {
      result = result.filter(pkg => pkg.category === category);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(pkg => 
        pkg.title.toLowerCase().includes(query) || 
        pkg.destinations.some(d => d.toLowerCase().includes(query)) ||
        pkg.description.toLowerCase().includes(query)
      );
    }

    if (maxPrice) {
      result = result.filter(pkg => pkg.price <= maxPrice);
    }

    if (maxDuration) {
      // Assuming duration is in format "X Days" or similar
      result = result.filter(pkg => {
        const days = parseInt(pkg.duration);
        return days <= maxDuration;
      });
    }

    if (activity && activity !== 'all') {
      result = result.filter(pkg => 
        pkg.thingsToDo?.some(t => t.toLowerCase().includes(activity.toLowerCase()))
      );
    }

    return result;
  }, [searchQuery, category, maxPrice, maxDuration, activity]);

  const displayPackages = limit ? filteredPackages.slice(0, limit) : filteredPackages;

  if (displayPackages.length === 0) {
    return (
      <div className="py-20 text-center bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No destinations found matching your search.</p>
        <p className="text-slate-500 mt-2">Try searching for "Kerala", "Rajasthan", or "Goa"</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12">
      {displayPackages.map((pkg, index) => (
        <motion.div
          key={pkg.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group relative glass-surface rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row min-h-[400px] border border-slate-100 shadow-xl"
        >
          <div className="lg:w-2/5 relative overflow-hidden h-64 lg:h-auto">
            <img
              src={pkg.imageUrl}
              alt={pkg.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              {pkg.isBudget && (
                <div className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-lg backdrop-blur-sm">
                  VALUE CHOICE
                </div>
              )}
              {pkg.bestTimeToVisit && (
                <div className="bg-white/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg">
                  <Calendar className="w-3 h-3 text-accent" />
                  {pkg.bestTimeToVisit}
                </div>
              )}
            </div>
          </div>

          <div className="p-10 lg:w-3/5 flex flex-col justify-between bg-white/50">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-wrap gap-2">
                  {pkg.destinations.map(d => (
                    <span key={d} className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100/50 text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                      <MapPin className="w-2.5 h-2.5 text-accent" />
                      {d}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <span className="text-sm font-extrabold text-slate-700">{pkg.rating}</span>
                  </div>
                  <div className="h-4 w-[1px] bg-slate-200" />
                  <div className="flex items-center gap-1 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-4 text-slate-900 tracking-tight">{pkg.title}</h3>
              <p className="text-slate-500 text-base mb-8 leading-relaxed max-w-2xl">{pkg.description}</p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-8">
                {pkg.thingsToDo && pkg.thingsToDo.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-widest">
                      <Activity className="w-4 h-4" />
                      Things to Do
                    </div>
                    <ul className="grid grid-cols-1 gap-2">
                      {pkg.thingsToDo.map((thing, i) => (
                        <li key={i} className="text-sm font-medium text-slate-600 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          {thing}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {pkg.localCuisine && pkg.localCuisine.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest">
                      <Utensils className="w-4 h-4" />
                      Local Cuisine
                    </div>
                    <ul className="grid grid-cols-1 gap-2">
                      {pkg.localCuisine.map((food, i) => (
                        <li key={i} className="text-sm font-medium text-slate-600 flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-slate-300" />
                          {food}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-slate-100/50">
              <div className="flex items-center gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Starts @</span>
                  <span className="text-3xl font-black text-slate-900 leading-none">₹{pkg.price.toLocaleString()}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">/ person</span>
                </div>
                <button 
                  onClick={() => setSharingPkg(pkg)}
                  className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-accent/5 transition-all active:scale-95 border border-slate-100"
                  title="Share Package"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <Link to={`/package/${pkg.id}`} className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-accent text-white font-bold hover:bg-slate-900 transition-all active:scale-95 shadow-lg group">
                Book Now
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}

      {sharingPkg && (
        <ShareModal 
          pkg={sharingPkg} 
          isOpen={!!sharingPkg} 
          onClose={() => setSharingPkg(null)} 
        />
      )}
    </div>
  );
}
