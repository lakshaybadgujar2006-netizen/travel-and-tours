import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged, User, updateProfile } from 'firebase/auth';
import { Package, MapPin, Calendar, CreditCard, Clock, User as UserIcon, Tag, ChevronRight, AlertCircle, Camera, Check, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingRecord {
  id: string;
  packageName: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  createdAt: any;
  paymentMethod: string;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhotoURL, setNewPhotoURL] = useState('');
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/');
        return;
      }
      setUser(currentUser);
      setNewName(currentUser.displayName || '');
      setNewPhotoURL(currentUser.photoURL || '');
      setLoading(false);

      const q = query(
        collection(db, 'bookings'),
        where('userId', '==', currentUser.uid),
        orderBy('createdAt', 'desc')
      );

      const unsubscribeBookings = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BookingRecord[];
        setBookings(docs);
      });

      return () => unsubscribeBookings();
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return;
    setUpdating(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: newName,
        photoURL: newPhotoURL
      });
      setUser({ ...auth.currentUser });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhotoURL(reader.result as string);
        if (!isEditing) setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
      <div className="grid lg:grid-cols-3 gap-12">
        {/* User Sidebar */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-surface p-8 rounded-[2.5rem] border border-slate-100 shadow-xl bg-white sticky top-32"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-6 group">
                {newPhotoURL ? (
                  <img src={newPhotoURL} alt={user.displayName || 'User'} className="w-32 h-32 rounded-[2rem] object-cover border-4 border-white shadow-lg" />
                ) : (
                  <div className="w-32 h-32 rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-400 border-4 border-white shadow-lg">
                    <UserIcon size={48} />
                  </div>
                )}
                
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white w-8 h-8" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>

                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-xl shadow-lg border-2 border-white">
                  <Tag size={16} className="fill-current" />
                </div>
              </div>
              
              {isEditing ? (
                <div className="w-full space-y-4 mb-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-left">Display Name</label>
                    <input 
                      type="text" 
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold focus:ring-2 focus:ring-accent/20 outline-none"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleUpdateProfile}
                      disabled={updating}
                      className="flex-1 bg-accent text-white py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all disabled:opacity-50"
                    >
                      {updating ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                      Save
                    </button>
                    <button 
                      onClick={() => {
                        setIsEditing(false);
                        setNewName(user.displayName || '');
                        setNewPhotoURL(user.photoURL || '');
                      }}
                      className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-black text-slate-900">{user.displayName || 'Traveler'}</h2>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="p-1.5 text-slate-300 hover:text-accent transition-colors"
                    >
                      <Camera size={14} />
                    </button>
                  </div>
                  <p className="text-slate-400 text-sm font-medium mb-8">{user.email}</p>
                </>
              )}
              
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="block text-2xl font-black text-slate-900">{bookings.length}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bookings</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                  <span className="block text-2xl font-black text-emerald-500">Gold</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Booking History */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <span className="small-caps text-accent mb-2 block">Travel History</span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Your <span className="text-accent underline underline-offset-8 decoration-slate-100">Adventures.</span></h1>
          </div>

          {bookings.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-12 text-center glass-surface rounded-[2.5rem] border border-dashed border-slate-200"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="text-slate-300 w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No bookings yet</h3>
              <p className="text-slate-400 max-w-sm mx-auto mb-8">Ready to explore? Browse our curated travel packages and start your next journey today.</p>
              <button 
                onClick={() => navigate('/packages')}
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-accent transition-all active:scale-95"
              >
                Browse Packages
              </button>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group glass-surface p-6 rounded-3xl border border-slate-100 hover:border-accent/20 hover:shadow-xl transition-all cursor-pointer bg-white"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between md:justify-start gap-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'
                        }`}>
                          {booking.status}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          ID: #{booking.id.slice(-6).toUpperCase()}
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-black text-slate-900 group-hover:text-accent transition-colors">
                        {booking.packageName}
                      </h4>
                      
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2 text-slate-500">
                          <Calendar size={16} />
                          <span className="text-xs font-medium">
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                          <CreditCard size={16} />
                          <span className="text-xs font-medium capitalize">{booking.paymentMethod} Payment</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex md:flex-col justify-between md:items-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                      <div className="text-right">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Paid</span>
                        <span className="text-2xl font-black text-slate-900">₹{booking.totalAmount.toLocaleString()}</span>
                      </div>
                      <button className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-accent group-hover:text-white transition-all">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
