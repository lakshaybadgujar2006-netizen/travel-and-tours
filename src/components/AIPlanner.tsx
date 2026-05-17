import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, Loader2, MapPin, Calculator, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function AIPlanner() {
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [preferences, setPreferences] = useState('');
  const [plan, setPlan] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/ai/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, budget, duration, preferences }),
      });
      const data = await response.json();
      setPlan(data.plan);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto glass-surface rounded-[2rem] p-8 md:p-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <Sparkles className="w-32 h-32 text-accent" />
      </div>

      <div className="mb-12 text-center md:text-left">
        <span className="small-caps mb-2 block">AI Trip Designer</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">Plan Your Perfect <br className="hidden md:block" /> <span className="text-accent underline decoration-slate-200">Budget Trip.</span></h2>
        <p className="text-slate-500 mt-4 max-w-xl">
          Tell us where you want to go and your budget constraints. Our AI-powered engine will craft 
          a personalized destination guide just for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center gap-2 mb-12">
        <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Where to?</label>
          <div className="flex items-center gap-2">
             <MapPin className="w-4 h-4 text-accent/40" />
             <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination..."
              required
              className="w-full text-sm font-bold outline-none text-slate-800 placeholder:text-slate-300"
            />
          </div>
        </div>

        <div className="flex-1 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Budget (INR)</label>
          <div className="flex items-center gap-2">
             <Calculator className="w-4 h-4 text-accent/40" />
             <input
              type="text"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g. 15,000"
              required
              className="w-full text-sm font-bold outline-none text-slate-800 placeholder:text-slate-300"
            />
          </div>
        </div>

        <div className="flex-1 px-4 py-2">
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Days</label>
          <div className="flex items-center gap-2">
             <Calendar className="w-4 h-4 text-accent/40" />
             <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 4 Days"
              required
              className="w-full text-sm font-bold outline-none text-slate-800 placeholder:text-slate-300"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-accent text-white px-8 py-4 md:py-0 h-full min-h-[56px] rounded-xl font-bold hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? 'Designing...' : 'Generate Plan'}
        </button>
      </form>

      <div className="mb-6">
          <label className="block text-[10px] uppercase font-bold text-slate-400 mb-2">Additional Interests</label>
          <input
            type="text"
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="e.g. Adventure, Local Street Food, Solo Travel Friendly"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm font-medium outline-none focus:border-accent transition-all"
          />
        </div>

      <AnimatePresence>
        {plan && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-inner"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-white shadow-lg">
                 <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="m-0 text-xl font-extrabold text-slate-900 tracking-tight">Your Personalized Guide</h3>
            </div>
            <div className="prose prose-slate prose-sm md:prose-base max-w-none prose-headings:text-slate-900 prose-strong:text-indigo-600 prose-p:text-slate-600">
               <ReactMarkdown>{plan}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
