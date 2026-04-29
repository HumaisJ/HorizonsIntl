"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Search, ArrowRight, Clock, Tag, TrendingUp, Newspaper } from "lucide-react";

export default function BlogHub() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase.from("blogs").select("*").order('created_at', { ascending: false });
      if (data) setBlogs(data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-zinc-100 font-sans antialiased">
      <div className="max-w-[1440px] mx-auto p-6 lg:p-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* 1. SIDEBAR: LIST OF ALL BLOGS */}
          <aside className="lg:col-span-3 space-y-8">
            <div className="sticky top-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
                  <Newspaper className="text-white" size={20} />
                </div>
                <h2 className="text-sm font-black uppercase tracking-widest text-zinc-900">Archive</h2>
              </div>
              
              <div className="space-y-2 border-l-2 border-zinc-200">
                {blogs.map((blog) => (
                  <Link 
                    key={blog.id} 
                    href={`/one-star/blog/${blog.id}`}
                    className="block py-3 px-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400 hover:text-red-600 hover:border-l-2 hover:border-red-600 -ml-[2px] transition-all"
                  >
                    {blog.title}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="lg:col-span-9 space-y-12">
            
            {/* 2. SEARCH BAR AREA */}
            <div className="bg-white border border-zinc-200 p-8 rounded-[2rem] shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="space-y-1">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-zinc-900">
                  Insights & <span className="text-red-600">News</span>
                </h1>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">One Star Trading Journal</p>
              </div>
              
              <div className="relative w-full md:w-96 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-red-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search among blogs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 p-8 bg-zinc-50 border-none rounded-2xl font-bold text-xs uppercase outline-none focus:ring-2 ring-red-600/10 text-zinc-900"
                />
              </div>
            </div>

            {/* 3. HOT TOPIC BLOG CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <Link 
                    key={blog.id} 
                    href={`/one-star/blog/${blog.id}`}
                    className="group bg-white border border-zinc-200 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
                  >
                    <div className="aspect-video overflow-hidden relative p-4">
                      <img 
  // This logic checks image_url first, then the first item of an images array, 
  // then a generic 'image' column, and finally a high-quality placeholder.
  src={
    blog.image_url || 
    (blog.images && blog.images[0]) || 
    blog.image || 
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80"
  } 
  alt={blog.title} 
  className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-all duration-700" 
  // Use a placeholder if the link is expired or broken
  onError={(e) => {
    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80";
  }}
/>
                      <div className="absolute top-8 left-8 bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 border border-zinc-700">
                        <TrendingUp size={12} className="text-red-600" />
                        <span className="text-[9px] font-black text-white uppercase tracking-widest">Hot Topic</span>
                      </div>
                    </div>

                    <div className="p-10 pt-4 flex-1 flex flex-col">
                      <div className="flex gap-4 mb-6">
                        <span className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                          <Clock size={12} /> {new Date(blog.created_at).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-2 text-[9px] font-black text-red-600 uppercase tracking-widest">
                          <Tag size={12} /> {blog.tags?.[0] || 'Automotive'}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 group-hover:text-red-600 transition-colors leading-tight mb-6">
                        {blog.title}
                      </h3>
                      
                      <p className="text-zinc-500 text-sm font-medium leading-relaxed line-clamp-3 mb-8">
                        {blog.excerpt || blog.content.substring(0, 150)}...
                      </p>

                      <div className="mt-auto pt-8 border-t border-zinc-50 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-900 group-hover:text-red-600 transition-all">
                        Read Complete Blog <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-zinc-200">
                   <p className="text-zinc-300 font-black uppercase tracking-[0.4em]">No matching insights found</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}