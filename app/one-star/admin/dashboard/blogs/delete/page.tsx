"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function DeleteBlog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    // Explicitly fetching only existing columns to prevent "column not found" errors
    const { data, error } = await supabase
      .from("blogs")
      .select("id, title") 
      .order("title", { ascending: true }); // Changed order from created_at to title for safety

    if (error) {
      console.error("Delete Page Fetch Error:", error.message);
    } else {
      setBlogs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleDelete = async () => {
    if (!confirmId) return;
    const { error } = await supabase.from("blogs").delete().eq("id", confirmId);
    if (!error) {
      setConfirmId(null);
      fetchBlogs();
    } else {
      alert(`Delete Error: ${error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-black uppercase tracking-widest text-[10px]">
        <ArrowLeft size={14} /> Back
      </Link>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-12">Purge <span className="text-red-600">Archive</span></h1>

      {loading ? <div className="flex justify-center py-10"><Loader2 className="animate-spin text-red-600" /></div> : (
        <div className="space-y-4">
          {blogs.length === 0 ? (
            <p className="text-zinc-500 uppercase font-bold text-xs">No blogs found.</p>
          ) : (
            blogs.map((b) => (
              <div key={b.id} className="flex justify-between items-center p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <span className="font-black uppercase tracking-widest text-sm">{b.title}</span>
                <button onClick={() => setConfirmId(b.id)} className="p-3 bg-red-600 text-white hover:bg-zinc-950 transition-all shadow-lg">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmId && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[200] p-6 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-950 p-10 max-w-md w-full border-t-8 border-red-600 text-center shadow-2xl">
            <AlertCircle className="mx-auto text-red-600 mb-4" size={48} />
            <h2 className="font-black uppercase tracking-widest text-xl mb-2">Delete Permanently?</h2>
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-8">This action is irreversible.</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleDelete} className="w-full bg-red-600 text-white font-black py-4 uppercase tracking-widest text-xs">Confirm Delete</button>
              <button onClick={() => setConfirmId(null)} className="w-full bg-zinc-800 text-zinc-400 font-black py-4 uppercase tracking-widest text-xs">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}