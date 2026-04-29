"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image");
    setLoading(true);

    if (name.toLowerCase() === 'others' || slug === 'others') {
    setLoading(false);
    return alert("The name 'Others' is reserved for system use.");
  }

    try {
      // 1. CHECK FOR DUPLICATES FIRST
      const { data: existing } = await supabase
        .from("categories")
        .select("id")
        .eq("name", name)
        .maybeSingle();

      if (existing) {
        setLoading(false);
        return alert("A category with this name already exists.");
      }

      // 2. Upload Image
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('categories')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // 3. Get URL and Insert
      const { data: urlData } = supabase.storage.from('categories').getPublicUrl(fileName);
      
      const { error: dbError } = await supabase
        .from("categories")
        .insert([{ name, slug, image_url: urlData.publicUrl }]);

      if (dbError) throw dbError;

      alert("Category Created!");
      router.push("/one-star/admin/dashboard/categories/edit");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-red-600 mb-8 font-bold uppercase tracking-widest text-[10px]">
        <ArrowLeft size={14} /> Back
      </Link>

      <h1 className="text-3xl font-black uppercase tracking-tighter mb-12">Add <span className="text-red-600">Category</span></h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Category Name</label>
          <input type="text" required className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none focus:ring-2 focus:ring-red-600" onChange={(e) => handleNameChange(e.target.value)} />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Display Image</label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 dark:border-zinc-700 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={24} className="text-zinc-400 mb-2" />
                <p className="text-xs text-zinc-500 uppercase font-bold">{imageFile ? imageFile.name : "Upload Image"}</p>
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
            </label>
          </div>
        </div>

        <button disabled={loading} className="w-full bg-red-600 text-white font-black py-4 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Save size={16} />} SAVE CATEGORY
        </button>
      </form>
    </div>
  );
}