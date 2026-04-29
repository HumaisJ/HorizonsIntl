"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Tag, Newspaper } from "lucide-react";

export default function BlogDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();
      
      if (data) setBlog(data);
      setLoading(false);
    };
    fetchBlog();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-zinc-100 flex items-center justify-center">
      <div className="animate-pulse font-black uppercase tracking-[0.4em] text-zinc-400 text-[10px]">Loading Journal...</div>
    </div>
  );

  if (!blog) return <div className="min-h-screen bg-zinc-100 flex items-center justify-center font-black uppercase">Blog Not Found</div>;

  const mainImage = blog.image_url || (blog.images && blog.images[0]) || "/placeholder-car.jpg";

  return (
    <div className="min-h-screen bg-zinc-100 font-sans antialiased pb-20">
      
      {/* 1. HEADER SECTION */}
      <div className="bg-white border-b border-zinc-200 pt-12 pb-12">
        <div className="max-w-5xl mx-auto px-6">
          <button 
            onClick={() => router.back()} 
            className="flex items-center gap-2 text-zinc-400 mb-10 font-black uppercase text-[10px] tracking-widest hover:text-red-600 transition-colors"
          >
            <ArrowLeft size={14} /> Return to Insights
          </button>

          <div className="space-y-6">
            <div className="flex gap-4 items-center">
              <span className="px-3 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                {blog.tags?.[0] || 'Official'}
              </span>
              <span className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                <Clock size={12} /> {new Date(blog.created_at).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.95]">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-12 space-y-12">
        
        {/* 4. PICTURES */}
        <div className="aspect-video w-full rounded-[2.5rem] overflow-hidden border border-zinc-200 shadow-sm bg-white p-4">
          <img 
            src={mainImage} 
            alt={blog.title} 
            className="w-full h-full object-cover rounded-[2rem]" 
          />
        </div>

        {/* 2 & 3. SUBHEADINGS & PARAGRAPHS */}
        <article className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-16 shadow-sm">
          {/* We use whitespace-pre-wrap to handle admin-input paragraphs and spacing */}
          <div className="whitespace-pre-wrap font-medium text-zinc-700 text-lg leading-relaxed mb-16">
            {blog.content}
          </div>

          {/* 5. TAGS */}
          <div className="pt-10 border-t border-zinc-50">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300 mb-6 flex items-center gap-2">
              <Tag size={12} className="text-red-600" /> Categorized Under
            </h4>
            <div className="flex flex-wrap gap-3">
              {blog.tags?.map((tag: string) => (
                <span key={tag} className="px-5 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* SIMPLE FOOTER INDICATOR */}
        <div className="text-center pt-8">
           <div className="w-12 h-1.5 bg-red-600 mx-auto rounded-full mb-4" />
           <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[1em]">One Star Trading</p>
        </div>
      </div>
    </div>
  );
}