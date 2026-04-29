"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Edit2, X, Save, Loader2, Hash } from "lucide-react";
import Link from "next/link";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentTag, setCurrentTag] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    // Explicitly select columns to test if schema cache is the issue
    const { data, error } = await supabase
      .from("blogs")
      .select("id, title, category, created_at, content, tags, gallery")
      .order("created_at", { ascending: false });
    
    if (error) {
      console.error("Supabase Error Details:", error.message, error.details, error.hint);
      alert(`Fetch Error: ${error.message}`);
    } else {
      console.log("Fetched Blogs:", data); // Check console for this
      setBlogs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const loadBlog = (blog: any) => {
    setEditData({
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags : [],
      gallery: Array.isArray(blog.gallery) ? blog.gallery : []
    });
    setSelectedId(blog.id);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Remove immutable fields
    const { id, created_at, ...updatePayload } = editData;

    const { error } = await supabase
      .from("blogs")
      .update(updatePayload)
      .eq("id", selectedId);

    if (!error) {
      alert("Article Updated Successfully.");
      setSelectedId(null);
      fetchBlogs();
    } else {
      alert(`Update Error: ${error.message}`);
    }
    setLoading(false);
  };

  if (!selectedId) {
    return (
      <div className="p-8 max-w-5xl mx-auto min-h-screen">
        <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-black uppercase tracking-widest text-[10px]">
          <ArrowLeft size={14} /> Back
        </Link>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-12 text-zinc-900 dark:text-white">Blog <span className="text-red-600">Archive</span></h1>
        
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-red-600" /></div>
        ) : (
          <div className="grid gap-4">
            {blogs.length === 0 ? (
              <div className="p-10 border-2 border-dashed border-zinc-200 dark:border-zinc-800 text-center">
                <p className="text-zinc-500 uppercase font-bold text-xs">No articles found. Ensure RLS policies are active in Supabase.</p>
              </div>
            ) : (
              blogs.map((b) => (
                <div key={b.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex justify-between items-center shadow-sm">
                  <div>
                    <h3 className="font-black uppercase tracking-widest text-sm">{b.title}</h3>
                    <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-[0.2em]">{b.category}</span>
                  </div>
                  <button onClick={() => loadBlog(b)} className="p-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-600 hover:text-white transition-all">
                    <Edit2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-zinc-500 mb-8 font-black uppercase tracking-widest text-[10px]">
        <X size={14} /> Cancel Edit
      </button>

      <form onSubmit={handleUpdate} className="space-y-8 bg-white dark:bg-zinc-900 p-10 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-8 italic underline">Editing: {editData.title}</h2>
        
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">Title</label>
          <input type="text" value={editData.title} onChange={(e)=>setEditData({...editData, title: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-red-600 font-bold" />
        </div>

        {/* Tags Section */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold flex items-center gap-1"><Hash size={12}/> SEO Tags</label>
          <div className="flex gap-2 mb-3">
            <input type="text" value={currentTag} onChange={(e)=>setCurrentTag(e.target.value)} className="flex-1 bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
            <button type="button" onClick={()=>{if(currentTag){setEditData({...editData, tags: [...editData.tags, currentTag]}); setCurrentTag("");}}} className="bg-zinc-900 text-white px-6 font-black text-[10px]">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {editData.tags?.map((t: string, i: number) => (
              <span key={i} className="bg-zinc-200 dark:bg-zinc-800 text-[10px] font-bold px-3 py-1 flex items-center gap-2">
                {t} <X size={12} className="cursor-pointer text-red-600" onClick={()=>setEditData({...editData, tags: editData.tags.filter((_:any, idx:number)=>idx!==i)})} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">Content</label>
          <textarea rows={15} value={editData.content} onChange={(e)=>setEditData({...editData, content: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-6 text-sm outline-none leading-relaxed h-[400px]" />
        </div>

        <button disabled={loading} className="w-full bg-red-600 text-white font-black py-6 uppercase tracking-widest text-xs flex items-center justify-center gap-3">
          {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />} Finalize Changes
        </button>
      </form>
    </div>
  );
}