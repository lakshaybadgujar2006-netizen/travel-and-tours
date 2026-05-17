import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Blog from './views/Blog';
import PackageDetail from './views/PackageDetail';
import ItineraryBuilder from './views/ItineraryBuilder';
import CustomTour from './views/CustomTour';
import Footer from './components/Footer';
import WhatsAppChat from './components/WhatsAppChat';
import PackageGrid from './components/PackageGrid';
import AIPlanner from './components/AIPlanner';
import Profile from './views/Profile';
import { motion, AnimatePresence } from 'motion/react';

// Shell for generic pages
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-24 overflow-x-hidden">
        <Navbar />
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/blog" element={<PageWrapper><Blog /></PageWrapper>} />
              <Route path="/package/:id" element={<PageWrapper><PackageDetail /></PageWrapper>} />
              <Route path="/packages" element={
                <PageWrapper>
                  <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                    <h1 className="text-6xl font-serif mb-12">Our <span className="text-accent italic">Packages.</span></h1>
                    <div className="grid gap-12">
                      <p className="text-secondary/60 max-w-2xl mb-8">
                        Hand-picked domestic tours designed for value and adventure.
                      </p>
                      <PackageGrid />
                    </div>
                  </div>
                </PageWrapper>
              } />
              <Route path="/planner" element={<PageWrapper><ItineraryBuilder /></PageWrapper>} />
              <Route path="/custom-tour" element={<PageWrapper><CustomTour /></PageWrapper>} />
              <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
              <Route path="/bookings" element={<PageWrapper><Profile /></PageWrapper>} />
              {/* Fallback routes */}
              <Route path="*" element={<PageWrapper><Home /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </div>
        <Footer />
        <WhatsAppChat />
      </div>
    </Router>
  );
}
