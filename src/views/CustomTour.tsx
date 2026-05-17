import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Calendar, Users, Wallet, MessageSquare, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CustomTour() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    startDate: '',
    duration: '',
    travelers: '2',
    budget: '',
    requirements: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(db, 'custom_requests'), {
        ...formData,
        userId: auth.currentUser?.uid || 'anonymous',
        status: 'new',
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting custom request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-slate-50">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-slate-100"
        >
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 text-emerald-500">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Request Received!</h1>
          <p className="text-slate-500 mb-10 leading-relaxed font-medium">
            Your custom tour requirements have been sent to our travel experts. 
            We'll get back to you with a tailor-made plan within 24 hours.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#f8fafc]">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-accent font-bold text-sm uppercase tracking-widest mb-12 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Explorer
        </Link>
        
        <div className="grid lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="small-caps mb-4 block text-accent font-black">Tailor-Made Journey</span>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
                Your Dream, <br />
                <span className="text-accent italic">Our Canvas.</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium leading-relaxed">
                Can't find exactly what you're looking for? Tell us your vision, and we'll craft a unique itinerary specifically for you.
              </p>
            </div>

            <div className="space-y-6 pt-8">
              {[
                { icon: MapPin, title: 'Local Expertise', desc: 'Hidden gems only locals know about.' },
                { icon: Wallet, title: 'Budget Optimized', desc: 'Maximum experience, minimum waste.' },
                { icon: Calendar, title: 'Total Flexibility', desc: 'Travel on your terms, at your pace.' }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-tight">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-[2.5rem] p-10 md:p-12 shadow-2xl border border-slate-100 space-y-8"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Full Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none font-bold text-slate-900 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Email Address</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@email.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none font-bold text-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Phone Number</label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 00000 00000"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none font-bold text-slate-900 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Where to?</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      required
                      type="text"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                      placeholder="e.g. Kashmir, Kerala"
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none font-bold text-slate-900 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Travel Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
                    <input 
                      required
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none font-bold text-[10px] sm:text-xs text-slate-900 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Duration</label>
                  <input 
                    required
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="e.g. 5 Days"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none font-bold text-slate-900 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Travelers</label>
                  <div className="relative">
                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <select 
                      value={formData.travelers}
                      onChange={(e) => setFormData({...formData, travelers: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none font-bold text-slate-900 transition-all appearance-none"
                    >
                      {[1,2,3,4,5,6,7,8,9,'10+'].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Estimated Budget (INR)</label>
                <div className="relative">
                  <Wallet className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                  <input 
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="e.g. ₹50,000 - ₹75,000"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none font-bold text-slate-900 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block ml-1">Your Requirements</label>
                <div className="relative">
                  <MessageSquare className="absolute left-5 top-6 w-4 h-4 text-slate-300" />
                  <textarea 
                    required
                    value={formData.requirements}
                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                    placeholder="Tell us everything... What kind of hotels? Any specific activities? Food preferences?"
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-5 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none font-medium text-slate-900 transition-all resize-none"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white py-6 rounded-[2rem] font-bold text-sm uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 hover:shadow-accent/40 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {loading ? 'Submitting...' : 'Send Custom Request'}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
