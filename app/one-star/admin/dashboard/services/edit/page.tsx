"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Edit2, ArrowLeft, Check, X, Tag } from "lucide-react";
import Link from "next/link";

export default function ServiceEdit() {
  const [services, setServices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ title: "", description: "" });

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("title");
    if (data) setServices(data);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from("services")
      .update({ 
        title: editData.title, 
        description: editData.description 
      })
      .eq('id', id);

    if (!error) {
      setEditingId(null);
      fetchServices();
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-bold uppercase tracking-widest text-[10px]">
        <ArrowLeft size={14} /> Back
      </Link>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-12">Edit <span className="text-red-600">Services</span></h1>

      <div className="space-y-6">
        {services.map((svc) => (
          <div key={svc.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 shadow-sm">
            {editingId === svc.id ? (
              <div className="space-y-4">
                <input 
                  value={editData.title} 
                  onChange={(e) => setEditData({...editData, title: e.target.value})} 
                  className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none font-bold uppercase" 
                />
                <textarea 
                  value={editData.description} 
                  onChange={(e) => setEditData({...editData, description: e.target.value})} 
                  className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none h-32" 
                />
                <div className="flex gap-2">
                  <button onClick={() => handleUpdate(svc.id)} className="flex-1 bg-green-600 text-white py-3 font-bold uppercase text-[10px] tracking-widest">Save Changes</button>
                  <button onClick={() => setEditingId(null)} className="flex-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-500 py-3 font-bold uppercase text-[10px] tracking-widest">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1">
                  <h2 className="font-black uppercase tracking-widest text-lg mb-2">{svc.title}</h2>
                  <p className="text-zinc-500 text-xs line-clamp-2 mb-4 lowercase italic">{svc.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {svc.keywords?.map((k: string, i: number) => (
                      <span key={i} className="text-[9px] font-bold text-zinc-400 border border-zinc-200 px-2 py-1">#{k}</span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {svc.image_url?.slice(0, 3).map((url: string, i: number) => (
                      <img key={i} src={url} className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-900 object-cover" />
                    ))}
                  </div>
                  <button 
                    onClick={() => { setEditingId(svc.id); setEditData({ title: svc.title, description: svc.description }); }} 
                    className="p-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-600 hover:text-white transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}