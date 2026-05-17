import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, Instagram, Facebook, Phone as WhatsApp, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../lib/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
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

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages' },
    { name: 'AI Planner', path: '/planner' },
    { name: 'Custom Tour', path: '/custom-tour' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass-surface rounded-2xl px-6 py-3 shadow-md">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white font-bold text-lg"
          >
            T
          </motion.div>
          <span className="text-xl font-bold tracking-tight text-slate-900">Travel & Tours</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === link.path ? 'text-accent' : 'text-slate-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
              <a 
                href="https://www.instagram.com/budgettrips2025?igsh=MXFhZm8wY3pqbjhqdA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-accent transition-colors"
                title="Follow on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/919217807801" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"
                title="Chat on WhatsApp"
              >
                <WhatsApp className="w-5 h-5" />
              </a>
            </div>
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <Link to="/profile" className="flex items-center gap-2 pl-4 border-l border-slate-200 group">
                      {user.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName || 'User'} 
                          className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-accent transition-colors"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-accent transition-colors">
                          <UserIcon className="w-4 h-4" />
                        </div>
                      )}
                      <span className="text-sm font-bold text-slate-600 group-hover:text-accent transition-colors hidden lg:block">
                        {user.displayName?.split(' ')[0] || 'Profile'}
                      </span>
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      title="Sign Out"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleSignIn}
                    className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-full hover:bg-accent transition-all duration-300 text-sm font-bold shadow-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-6 right-6 glass-surface rounded-3xl p-8 flex flex-col gap-6 text-center"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif"
              >
                {link.name}
              </Link>
            ))}
            
            {user ? (
              <div className="flex flex-col gap-4">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="bg-accent text-white rounded-full py-4 font-bold"
                >
                  My Profile & Bookings
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="text-slate-500 font-bold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  handleSignIn();
                  setIsOpen(false);
                }}
                className="bg-accent text-white rounded-full py-4 font-bold"
              >
                Sign In with Google
              </button>
            )}

            <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-100">
              <a 
                href="https://www.instagram.com/budgettrips2025?igsh=MXFhZm8wY3pqbjhqdA==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-slate-400 hover:text-accent transition-colors"
              >
                <Instagram className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Instagram</span>
              </a>
              <a 
                href="https://wa.me/919217807801" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-slate-400 hover:text-emerald-500 transition-colors"
              >
                <WhatsApp className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
