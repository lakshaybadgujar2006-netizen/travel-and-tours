import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Loader2, MapPin, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DOMESTIC_PACKAGES, BLOG_POSTS } from '../constants';

export default function ForYou() {
  const [recommendations, setRecommendations] = useState<{
    recommendedPackageIds: string[];
    recommendedBlogIds: number[];
    reasoning: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getRecommendations() {
      const history = JSON.parse(localStorage.getItem('view_history') || '[]');
      if (history.length === 0) return;

      setLoading(true);
      try {
        const response = await fetch('/api/ai/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            history,
            interests: 'budget travel, domestic trips, adventure, culture',
            packages: DOMESTIC_PACKAGES,
            blogPosts: BLOG_POSTS
          })
        });
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error('Failed to get recommendations:', error);
      } finally {
        setLoading(false);
      }
    }

    getRecommendations();
  }, []);

  const recommendedPackages = recommendations 
    ? DOMESTIC_PACKAGES.filter(p => recommendations.recommendedPackageIds.includes(p.id))
    : [];
  
  const recommendedBlogs = recommendations
    ? BLOG_POSTS.filter(b => recommendations.recommendedBlogIds.includes(b.id))
    : [];

  if (!loading && !recommendations) return null;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-accent">
          <Sparkles className="w-5 h-5 fill-accent" />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Picked For You</h2>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest mt-1">AI-Powered Recommendations</p>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-slate-400 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest">Our AI is Curating Your Experience...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {recommendations?.reasoning && (
             <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm italic text-slate-600 text-sm relative">
                <span className="text-accent absolute -top-3 left-6 bg-white px-2 text-xs font-bold uppercase tracking-widest">AI Insight</span>
                "{recommendations.reasoning}"
             </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Suggested Packages</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {recommendedPackages.map((pkg) => (
                  <Link key={pkg.id} to={`/package/${pkg.id}`} className="group block bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                    <div className="aspect-video overflow-hidden">
                      <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <h4 className="font-bold text-lg text-slate-900 mb-2 truncate">{pkg.title}</h4>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>{pkg.duration}</span>
                        <span className="text-accent">₹{pkg.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Relevant Reads</h3>
              <div className="space-y-4">
                {recommendedBlogs.map((blog) => (
                  <Link key={blog.id} to="/blog" className="group flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-accent/20 transition-all shadow-sm">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug group-hover:text-accent transition-colors">{blog.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-wider">{blog.author}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
