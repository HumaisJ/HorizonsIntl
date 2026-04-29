"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Plus, X, FileText, Hash } from "lucide-react";
import Link from "next/link";

export default function AddBlog() {
  const [formData, setFormData] = useState({ title: "", excerpt: "", content: "", category: "Market News" });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileUpload = async (file: File) => {
    const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const { error } = await supabase.storage.from('categories').upload(fileName, file);
    if (error) throw error;
    return supabase.storage.from('categories').getPublicUrl(fileName).data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const coverUrl = coverImage ? await handleFileUpload(coverImage) : "";
      const galleryUrls = [];
      for (const file of galleryFiles) {
        galleryUrls.push(await handleFileUpload(file));
      }

      const slug = formData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

      const { error } = await supabase.from("blogs").insert([{
        ...formData,
        slug,
        image_url: coverUrl,
        gallery: galleryUrls, // Ensure you add this column as text[] to your DB
        tags: tags
      }]);

      if (error) throw error;
      router.push("/one-star/admin/dashboard");
    } catch (err: any) { alert(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-black uppercase tracking-widest text-[10px]">
        <ArrowLeft size={14} /> Back
      </Link>

      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Write <span className="text-red-600">New Article</span></h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-zinc-900 p-10 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        {/* Core Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">Article Title *</label>
            <input type="text" required onChange={(e)=>setFormData({...formData, title: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-red-600 font-bold" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Main Cover Image</label>
            <input type="file" onChange={(e)=>setCoverImage(e.target.files?.[0] || null)} className="text-xs text-zinc-500 file:bg-zinc-800 file:text-white file:border-0 file:px-4 file:py-2 file:font-bold" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">Gallery (3-4 images)</label>
            <input type="file" multiple onChange={(e)=>setGalleryFiles(Array.from(e.target.files || []).slice(0,4))} className="text-xs text-zinc-500 file:bg-zinc-800 file:text-white file:border-0 file:px-4 file:py-2 file:font-bold" />
          </div>
        </div>

        {/* SEO Tags */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold flex items-center gap-1"><Hash size={12}/> SEO Tags</label>
          <div className="flex gap-2 mb-3">
            <input type="text" value={currentTag} onChange={(e)=>setCurrentTag(e.target.value)} className="flex-1 bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" placeholder="Enter keyword..." />
            <button type="button" onClick={()=>{if(currentTag){setTags([...tags, currentTag]); setCurrentTag("");}}} className="bg-zinc-900 text-white px-6 font-black uppercase text-[10px]">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <span key={i} className="bg-zinc-200 dark:bg-zinc-800 text-[10px] font-bold px-3 py-1 flex items-center gap-2">
                {t} <X size={12} className="cursor-pointer text-red-600" onClick={()=>setTags(tags.filter((_, idx)=>idx!==i))} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold text-red-600">Article Content *</label>
          <textarea rows={12} required onChange={(e)=>setFormData({...formData, content: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-6 text-sm outline-none leading-relaxed border-b-4 border-zinc-200 focus:border-red-600" />
        </div>

        <button disabled={loading} className="w-full bg-red-600 text-white font-black py-6 uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-zinc-950 transition-all">
          {loading ? "Publishing..." : <Save size={18} />} Deploy Article
        </button>
      </form>
    </div>
  );
}