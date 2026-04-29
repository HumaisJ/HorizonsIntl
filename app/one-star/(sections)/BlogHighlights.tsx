"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function BlogHighlights() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(4);
      if (data) setBlogs(data);
    };
    fetchBlogs();
  }, []);

  // Vertical Rotation Logic
  useEffect(() => {
    if (blogs.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % Math.ceil(blogs.length / 2));
    }, 5000);
    return () => clearInterval(interval);
  }, [blogs.length]);

  if (blogs.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* Left: Cohesive Description (Matches Showroom/Services) */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Automotive <span className="text-red-600">Insights</span>
            </h2>
            <div className="h-1 w-20 bg-red-600" />
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium mb-8">
              Stay ahead of the market with expert analysis on Japanese auction trends, 
              global shipping regulations, and detailed vehicle maintenance guides.
            </p>
            <Link 
              href="/one-star/blog" 
              className="bg-red-600 text-white font-bold py-4 px-10 uppercase tracking-widest text-[10px] inline-block shadow-lg hover:bg-zinc-900 transition-colors"
            >
              Explore All News
            </Link>
          </div>

          {/* Right: Parallel Top Blogs with Vertical Rolling Effect */}
          <div className="lg:col-span-2 relative h-[200px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: -45 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: 45 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 absolute inset-0"
              >
                {/* We show 2 blogs at a time from the fetched list */}
                {blogs.slice(index * 2, index * 2 + 2).map((blog) => (
                  <div key={blog.id} className="border-l-2 border-zinc-100 dark:border-zinc-800 pl-6 py-4 flex flex-col justify-center">
                    <span className={`font-black text-[10px] uppercase tracking-[0.3em] mb-2 ${blog.is_featured ? 'text-red-600' : 'text-zinc-400'}`}>
                      {blog.category || 'News'}
                    </span>
                    <Link href={`/one-star/blog/${blog.id}`}>
                      <h4 className="font-black text-xl text-zinc-900 dark:text-white leading-tight hover:text-red-600 transition-colors cursor-pointer uppercase tracking-tighter">
                        {blog.title}
                      </h4>
                    </Link>
                    <div className="mt-4 flex items-center gap-2 text-zinc-400 group cursor-pointer">
                      <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-red-600 transition-colors">Read Article</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}