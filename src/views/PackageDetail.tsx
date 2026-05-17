import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { motion } from 'motion/react';
import { ChevronLeft, Star, Clock, MapPin, CheckCircle, Phone as WhatsApp, ArrowRight, Instagram } from 'lucide-react';
import BookingForm from '../components/BookingForm';
import { DOMESTIC_PACKAGES } from '../constants';

const API_KEY = process.env.GOOGLE_MAP_PLATFORM_KEY || ''; // Needs user setup

export default function PackageDetail() {
  const { id } = useParams();
  const pkg = DOMESTIC_PACKAGES.find(p => p.id === id);

  useEffect(() => {
    if (pkg) {
      const history = JSON.parse(localStorage.getItem('view_history') || '[]');
      if (!history.includes(pkg.id)) {
        const newHistory = [pkg.id, ...history].slice(0, 10);
        localStorage.setItem('view_history', JSON.stringify(newHistory));
      }
    }
  }, [pkg]);

  if (!pkg) {
    return <div className="pt-40 text-center">Package not found. <Link to="/" className="text-accent">Go Home</Link></div>;
  }

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="h-[50vh] relative overflow-hidden">
        <img src={pkg.imageUrl} className="w-full h-full object-cover" alt={pkg.title} referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/20 to-transparent" />
        <Link to="/" className="absolute top-8 left-8 glass-surface w-12 h-12 rounded-full flex items-center justify-center hover:bg-accent hover:text-white transition-all shadow-lg border-white/20">
          <ChevronLeft className="w-6 h-6" />
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 grid lg:grid-cols-3 gap-12 pb-24">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-surface p-8 md:p-12 rounded-[2.5rem] shadow-xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-accent border border-accent/20 px-3 py-1 rounded-lg bg-indigo-50">
                <Star className="w-3 h-3 fill-accent" />
                <span className="text-xs font-bold">{pkg.rating}</span>
              </div>
              <span className="text-slate-400 text-[10px] uppercase tracking-widest font-bold font-mono">{pkg.duration}</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
              {pkg.title}
            </h1>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-12">
              {pkg.description}
            </p>

            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-accent">Trip Highlights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {pkg.highlights.map(h => (
                <div key={h} className="flex items-center gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-bold text-slate-700">{h}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Map Preview */}
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden h-[400px]">
             {API_KEY ? (
               <APIProvider apiKey={API_KEY} version="weekly">
                 <Map
                   defaultCenter={pkg.coordinates}
                   defaultZoom={10}
                   mapId="DEMO_MAP_ID"
                   internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                   style={{ width: '100%', height: '100%' }}
                 >
                   <AdvancedMarker position={pkg.coordinates}>
                     <Pin background="#4f46e5" glyphColor="#fff" />
                   </AdvancedMarker>
                 </Map>
               </APIProvider>
             ) : (
               <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-slate-200">
                 <MapPin className="w-12 h-12 text-slate-200 mb-4" />
                 <p className="text-slate-400 max-w-xs text-xs font-bold uppercase tracking-widest">
                   Interactive map preview. <br />
                   <span className="opacity-50">Requires API Key</span>
                 </p>
               </div>
             )}
          </div>
        </div>

        {/* Right Sidebar / Booking */}
        <motion.div
           initial={{ opacity: 0, x: 30 }}
           animate={{ opacity: 1, x: 0 }}
           className="lg:col-span-1"
        >
            <div className="sticky top-32 space-y-4">
              <BookingForm pkg={pkg as any} />
              <a 
                href="https://wa.me/919217807801" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-500 rounded-[1.5rem] p-6 text-white flex items-center justify-between group cursor-pointer hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
              >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <WhatsApp className="w-6 h-6" />
                   </div>
                   <div>
                     <h5 className="font-bold text-sm">WhatsApp Support</h5>
                     <p className="text-[10px] uppercase font-bold opacity-75">Chat with us</p>
                   </div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://www.instagram.com/budgettrips2025?igsh=MXFhZm8wY3pqbjhqdA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-accent rounded-[1.5rem] p-6 text-white flex items-center justify-between group cursor-pointer hover:bg-slate-900 transition-all shadow-lg shadow-accent/20"
              >
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Instagram className="w-6 h-6" />
                   </div>
                   <div>
                     <h5 className="font-bold text-sm">Instagram Help</h5>
                     <p className="text-[10px] uppercase font-bold opacity-75">Follow & DM us</p>
                   </div>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
