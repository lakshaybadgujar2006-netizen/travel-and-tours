import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError } from '../lib/error-handler';
import { Package } from '../types';
import { CheckCircle2, Loader2, CreditCard, Calendar, Smartphone, Wallet, LogIn } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from 'firebase/auth';

export default function BookingForm({ pkg }: { pkg: Package }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setFormData(prev => ({
          ...prev,
          name: prev.name || currentUser.displayName || '',
          email: prev.email || currentUser.email || ''
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const path = 'bookings';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        paymentMethod: 'upi',
        packageId: pkg.id,
        packageName: pkg.title,
        userId: auth.currentUser?.uid || 'guest',
        totalAmount: pkg.price,
        status: 'pending',
        createdAt: serverTimestamp()
      });

      // Send email notification via backend
      try {
        await fetch('/api/bookings/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            packageName: pkg.title,
            totalAmount: pkg.price,
            startDate: startDate?.toLocaleDateString(),
            endDate: endDate?.toLocaleDateString()
          })
        });
      } catch (emailError) {
        console.error("Failed to send notification email:", emailError);
        // We don't block the UI for email failures since the booking is already recorded in Firestore
      }

      setSuccess(true);
    } catch (error) {
      handleFirestoreError(error, 'create', path);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-12 px-6">
        <CheckCircle2 className="w-16 h-16 text-accent mx-auto mb-6" />
        <h3 className="text-3xl font-serif mb-4 text-accent">Booking Request Received!</h3>
        <p className="text-secondary/60">
          Our team will contact you shortly to confirm your trip to {pkg.destinations[0]}.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-xl">
      <h3 className="text-2xl mb-2 font-extrabold text-slate-900">Confirm Your <span className="text-accent underline decoration-slate-100">Trip.</span></h3>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Direct Booking Engine</p>

      {!user && (
        <div className="mb-8 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <LogIn className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Sign in for a better experience</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Sync your bookings across devices</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={handleSignIn}
            className="px-6 py-2.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-accent transition-all active:scale-95"
          >
            Sign In with Google
          </button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Full Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-accent text-sm font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Email Address</label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 outline-none focus:border-accent text-sm font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">Travel Dates (Plan)</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 z-10" />
               <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                placeholderText="Start Date"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-accent text-sm font-medium"
              />
            </div>
            <div className="relative">
               <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 z-10" />
               <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || new Date()}
                placeholderText="End Date"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-accent text-sm font-medium"
              />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Smartphone className="w-4 h-4 text-emerald-500" />
            </div>
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-tight">Secured UPI Payment</span>
          </div>
          <span className="text-2xl font-extrabold text-slate-900">₹{pkg.price.toLocaleString()}</span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 shadow-lg hover:shadow-accent/20 transition-all disabled:opacity-50 active:scale-95"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Request Booking'}
        </button>
      </form>
    </div>
  );
}
