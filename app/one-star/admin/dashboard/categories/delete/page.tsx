"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DeleteCategory() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

const fetchCategories = async () => {
    // We add a .neq (not equal) filter to hide the protected category
    const { data } = await supabase
      .from("categories")
      .select("*")
      .neq('slug', 'others') // This hides it from the list
      .order("name");
      
    if (data) setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async (id: string) => {
    setLoading(true);

    try {
      // 1. Get the ID of the protected 'Others' category
      const { data: othersCat } = await supabase
        .from('categories')
        .select('id')
        .eq('slug', 'others')
        .single();

      if (!othersCat) throw new Error("Protected 'Others' category not found. Create it first!");

      // 2. Move all vehicles to the 'Others' category
      const { error: moveError } = await supabase
        .from("vehicles")
        .update({ category_id: othersCat.id })
        .eq('category_id', id);

      if (moveError) throw moveError;

      // 3. Delete the now-empty category
      const { error: deleteError } = await supabase
        .from("categories")
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;

      setShowConfirm(null);
      fetchCategories();
      alert("Category deleted and listings moved to 'Others'.");
      
    } catch (err: any) {
      alert(`Safety Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-bold uppercase tracking-widest text-[10px]">
        <ArrowLeft size={14} /> Back
      </Link>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-12">Delete <span className="text-red-600">Categories</span></h1>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <span className="font-bold uppercase tracking-widest text-sm text-zinc-400">{cat.name}</span>
            <button onClick={() => setShowConfirm(cat.id)} className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white transition-all">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Irreversible Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[200] p-4">
          <div className="bg-white dark:bg-zinc-900 p-10 max-w-sm w-full border-t-4 border-red-600 shadow-2xl text-center">
            <AlertTriangle className="mx-auto text-red-600 mb-4" size={48} />
            <h2 className="font-black uppercase tracking-tighter text-xl mb-2">Are you sure?</h2>
            <p className="text-zinc-500 text-xs mb-8 uppercase tracking-widest font-bold">This action cannot be undone.</p>
            <div className="flex gap-4">
              <button onClick={() => handleDelete(showConfirm)} className="flex-1 bg-red-600 text-white font-black py-4 uppercase tracking-widest text-[10px]">Confirm Delete</button>
              <button onClick={() => setShowConfirm(null)} className="flex-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-600 font-black py-4 uppercase tracking-widest text-[10px]">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}