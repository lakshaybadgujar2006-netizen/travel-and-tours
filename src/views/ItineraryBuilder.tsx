import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Wallet, Footprints, Loader2, Sparkles, Plus, X, ArrowRight, Download } from 'lucide-react';
import Markdown from 'react-markdown';

const AVAILABLE_DESTINATIONS = [
  'Udaipur', 'Jaisalmer', 'Jaipur', 'Jodhpur', 
  'Alleppey', 'Munnar', 'Wayanad', 'Varkala',
  'Manali', 'Kasol', 'Shimla', 'Dharamshala',
  'Goa', 'Mumbai', 'Hampi', 'Gokarna',
  'Leh', 'Srinagar', 'Pahalgam', 'Gulmarg'
];

const ACTIVITY_OPTIONS = [
  'Trekking', 'Culture', 'Foodie', 'Beach', 
  'Photography', 'Relaxation', 'Wildlife', 'Shopping'
];

export default function ItineraryBuilder() {
  const [destinations, setDestinations] = useState<string[]>([]);
  const [budget, setBudget] = useState('15,000');
  const [dates, setDates] = useState({ start: '', end: '' });
  const [activities, setActivities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);

  const handleToggleDestination = (dest: string) => {
    setDestinations(prev => 
      prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
    );
  };

  const handleToggleActivity = (act: string) => {
    setActivities(prev => 
      prev.includes(act) ? prev.filter(a => a !== act) : [...prev, act]
    );
  };

  const generateItinerary = async () => {
    if (destinations.length === 0 || !dates.start || !dates.end) {
      alert('Please select at least one destination and set your dates.');
      return;
    }

    setLoading(true);
    setItinerary(null);
    try {
      const response = await fetch('/api/ai/build-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinations,
          budget,
          startDate: dates.start,
          endDate: dates.end,
          activities: activities.join(', ')
        })
      });
      const data = await response.json();
      setItinerary(data.itinerary);
    } catch (error) {
      console.error('Failed to build itinerary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <span className="small-caps mb-4 block text-accent font-bold">Custom Journey</span>
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-none tracking-tight">
          Craft Your <span className="text-accent underline decoration-slate-200 underline-offset-8">Dream Itinerary.</span>
        </h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Select your destinations, pick your vibes, and let our AI architect your perfect domestic adventure from scratch.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Step 1: Configuration */}
        <div className="space-y-12">
          {/* Destination Selector */}
          <div>
            <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] mb-6 text-slate-900">
              <MapPin className="w-4 h-4 text-accent" /> 1. Where are we going?
            </h3>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_DESTINATIONS.map(dest => {
                const isSelected = destinations.includes(dest);
                return (
                  <button
                    key={dest}
                    onClick={() => handleToggleDestination(dest)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      isSelected 
                        ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-accent/40'
                    }`}
                  >
                    {dest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget & Dates */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] mb-6 text-slate-900">
                <Wallet className="w-4 h-4 text-accent" /> 2. Budget (INR)
              </h3>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 15,000"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all font-bold"
              />
            </div>
            <div>
              <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] mb-6 text-slate-900">
                <Calendar className="w-4 h-4 text-accent" /> 3. When?
              </h3>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={dates.start}
                  onChange={(e) => setDates({...dates, start: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-accent/20 outline-none text-xs font-bold"
                />
                <input
                  type="date"
                  value={dates.end}
                  onChange={(e) => setDates({...dates, end: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:ring-2 focus:ring-accent/20 outline-none text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Activities */}
          <div>
            <h3 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] mb-6 text-slate-900">
              <Footprints className="w-4 h-4 text-accent" /> 4. What's the vibe?
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {ACTIVITY_OPTIONS.map(act => {
                const isSelected = activities.includes(act);
                return (
                  <button
                    key={act}
                    onClick={() => handleToggleActivity(act)}
                    className={`p-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border text-center ${
                      isSelected 
                        ? 'bg-slate-900 border-slate-900 text-white' 
                        : 'bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    {act}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={generateItinerary}
            disabled={loading}
            className="w-full group relative bg-accent py-6 rounded-[2rem] text-white font-bold text-sm uppercase tracking-[0.3em] overflow-hidden shadow-2xl hover:shadow-accent/40 active:scale-95 transition-all disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Building Itinerary...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate AI Itinerary</span>
                </>
              )}
            </div>
          </button>
        </div>

        {/* Step 2: Result Display */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {itinerary ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 shadow-2xl h-full overflow-y-auto max-h-[800px] scrollbar-hide"
              >
                <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-100">
                   <h2 className="text-2xl font-bold text-slate-900">Your AI Itinerary</h2>
                   <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-accent transition-colors">
                      <Download className="w-5 h-5" />
                   </button>
                </div>
                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl">
                  <Markdown>{itinerary}</Markdown>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">Ready to plan?</h4>
                <p className="text-slate-400 max-w-xs text-sm">
                  Configure your preferences on the left and our AI will generate a detailed day-by-day guide just for you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
