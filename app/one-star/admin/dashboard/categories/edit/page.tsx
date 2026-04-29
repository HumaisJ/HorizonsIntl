"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Edit2, ArrowLeft, Check, X } from "lucide-react";
import Link from "next/link";

export default function CategoryEdit() {
  const [categories, setCategories] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("*").order("name");
    if (data) setCategories(data);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleUpdate = async (id: string) => {
    // 1. Check if name is already taken by another ID
    const { data: duplicate } = await supabase
      .from("categories")
      .select("id")
      .eq("name", newName)
      .not("id", "eq", id)
      .maybeSingle();

    if (duplicate) return alert("This name is already in use.");

    const { error } = await supabase.from("categories").update({ name: newName }).eq('id', id);
    if (!error) {
      setEditingId(null);
      fetchCategories();
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-bold uppercase tracking-widest text-[10px]">
        <ArrowLeft size={14} /> Back
      </Link>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-12">Edit <span className="text-red-600">Categories</span></h1>

      <div className="space-y-4">
       {categories.map((cat) => (
  <div key={cat.id} className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
    <div className="flex items-center gap-4">
      <img src={cat.image_url} alt="" className="w-12 h-12 object-cover rounded-sm" />
      <span className="font-bold uppercase tracking-widest text-sm">
        {cat.name} {cat.slug === 'others' && <span className="text-[9px] text-blue-500 ml-2">(System Protected)</span>}
      </span>
    </div>

    <div className="flex gap-2">
      {/* Only show the Edit button if it's NOT the 'others' category */}
      {cat.slug !== 'others' && (
        <button 
          onClick={() => { setEditingId(cat.id); setNewName(cat.name); }} 
          className="p-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-600 hover:text-white transition-all"
        >
          <Edit2 size={18} />
        </button>
      )}
    </div>
  </div>
))}
      </div>
    </div>
  );
}