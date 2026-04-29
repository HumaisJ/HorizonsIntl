"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Loader2, Plus, X, Images } from "lucide-react";
import Link from "next/link";

export default function AddService() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Array for 2-4 images
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addKeyword = () => {
    if (currentKeyword && !keywords.includes(currentKeyword)) {
      setKeywords([...keywords, currentKeyword]);
      setCurrentKeyword("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (filesArray.length + imageFiles.length > 4) {
        alert("Maximum 4 images allowed per service.");
        return;
      }
      setImageFiles([...imageFiles, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imageFiles.length < 2) return alert("Please upload at least 2 images.");
    setLoading(true);

    try {
      const uploadedUrls: string[] = [];

      // Upload each image in the array
      for (const file of imageFiles) {
        const fileName = `service-${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
        const { error: upErr } = await supabase.storage.from('categories').upload(fileName, file);
        if (upErr) throw upErr;
        
        const { data: urlData } = supabase.storage.from('categories').getPublicUrl(fileName);
        uploadedUrls.push(urlData.publicUrl);
      }

      const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

      const { error } = await supabase.from("services").insert([{
        title, 
        slug,
        description,
        keywords,
        image_url: uploadedUrls, // Saving as an array of strings
        contact_info: "Get the Service" // Hardcoded to prevent accidental changes
      }]);

      if (error) throw error;
      alert("Service deployed successfully!");
      router.push("/one-star/admin/dashboard");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-bold uppercase tracking-widest text-[10px] hover:text-red-600 transition-colors">
        <ArrowLeft size={14} /> Back to Hub
      </Link>

      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">
        Register <span className="text-red-600">New Service</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-zinc-900 p-10 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-zinc-400">Service Title</label>
          <input 
            type="text" 
            required 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-transparent focus:border-red-600 transition-all" 
          />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-zinc-400">Detailed Description</label>
          <textarea 
            rows={6} 
            required 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none resize-none" 
          />
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-zinc-400">Key Words</label>
          <div className="flex gap-2 mb-4">
            <input 
              type="text" 
              value={currentKeyword} 
              onChange={(e) => setCurrentKeyword(e.target.value)} 
              className="flex-1 bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" 
              placeholder="Add tag..." 
            />
            <button type="button" onClick={addKeyword} className="bg-zinc-900 text-white px-8 font-bold uppercase text-[10px] tracking-widest hover:bg-red-600 transition-colors">
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywords.map((tag, i) => (
              <span key={i} className="bg-red-600 text-white text-[9px] font-black px-3 py-1.5 uppercase flex items-center gap-2 tracking-tighter">
                {tag} <X size={12} className="cursor-pointer" onClick={() => setKeywords(keywords.filter((_, idx) => idx !== i))} />
              </span>
            ))}
          </div>
        </div>

        {/* Multi-Image Upload */}
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-zinc-400">Service Gallery</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {imageFiles.map((file, i) => (
              <div key={i} className="relative aspect-square bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                <Images size={20} className="text-zinc-400" />
                <button 
                  type="button" 
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-lg"
                >
                  <X size={12} />
                </button>
                <p className="absolute bottom-1 text-[8px] text-zinc-500 font-bold px-1 truncate w-full text-center">{file.name}</p>
              </div>
            ))}
            {imageFiles.length < 4 && (
              <label className="aspect-square border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
                <Plus size={20} className="text-zinc-400" />
                <input type="file" multiple className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
          </div>
          <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Selected: {imageFiles.length} / 4</p>
        </div>

        <button 
          disabled={loading} 
          className="w-full bg-red-600 text-white font-black py-6 uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-zinc-950 transition-colors shadow-2xl"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />} 
          Deploy Service to Site
        </button>
      </form>
    </div>
  );
}