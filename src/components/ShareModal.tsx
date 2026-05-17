import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Twitter, Facebook, MessageCircle, Mail, Link2, Check } from 'lucide-react';
import { Package } from '../types';

interface ShareModalProps {
  pkg: Package;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ pkg, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = React.useState(false);
  const shareUrl = `${window.location.origin}/package/${pkg.id}`;
  const shareText = `Check out this amazing travel package to ${pkg.destinations.join(', ')}: ${pkg.title}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-[#25D366]',
      link: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-[#1DA1F2]',
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2]',
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-slate-600',
      link: `mailto:?subject=${encodeURIComponent(pkg.title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <span className="small-caps text-accent mb-1 block">Spread the word</span>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Share Package</h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-8">
                {shareOptions.map((option) => (
                  <a
                    key={option.name}
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`w-14 h-14 ${option.color} rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:-translate-y-1 active:scale-95`}>
                      <option.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{option.name}</span>
                  </a>
                ))}
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Copy Link</label>
                <div className="flex gap-2 p-2 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex-1 px-4 py-2 text-sm text-slate-500 truncate font-medium">
                    {shareUrl}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                      copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-accent'
                    }`}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Link2 className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 p-6 flex items-center gap-4">
              <img src={pkg.imageUrl} alt={pkg.title} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{pkg.title}</h4>
                <p className="text-xs text-slate-500 font-medium">Starting at ₹{pkg.price.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
