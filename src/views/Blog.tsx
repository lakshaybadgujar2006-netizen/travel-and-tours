import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calendar, User, ArrowRight } from 'lucide-react';

import { BLOG_POSTS } from '../constants';

export default function Blog() {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <span className="small-caps mb-4 block text-accent font-bold">Travel Wisdom</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-none">Journal & <span className="text-accent underline decoration-slate-200 underline-offset-8">Guides.</span></h1>
        <p className="text-slate-500 max-w-2xl text-lg">
          Insights, tips, and stories from our expert travelers to help you plan your next budget-friendly domestic adventure.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  <User className="w-3 h-3" /> {post.author}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  <Calendar className="w-3 h-3" /> {post.date}
                </div>
              </div>
              <h2 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-accent transition-colors leading-tight">{post.title}</h2>
              <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">{post.excerpt}</p>
              <button className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest hover:text-accent transition-colors">
                Read Full Guide <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
