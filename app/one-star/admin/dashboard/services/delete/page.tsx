"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function ServiceDelete() {
  const [services, setServices] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("title");
    if (data) setServices(data);
  };

  useEffect(() => { fetchServices(); }, []);

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("services").delete().eq('id', id);
    if (!error) {
      setShowConfirm(null);
      fetchServices();
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-bold uppercase tracking-widest text-[10px]">
        <ArrowLeft size={14} /> Back
      </Link>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-12">Delete <span className="text-red-600">Services</span></h1>

      <div className="space-y-4">
        {services.map((svc) => (
          <div key={svc.id} className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="font-black uppercase tracking-widest text-sm block">{svc.title}</span>
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-widest">Ref ID: {svc.id.slice(0, 8)}</span>
            </div>
            <button onClick={() => setShowConfirm(svc.id)} className="p-3 bg-red-600 text-white hover:bg-zinc-900 transition-all">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[200] p-6">
          <div className="bg-white dark:bg-zinc-950 p-12 max-w-md w-full border-b-8 border-red-600 text-center shadow-[0_0_50px_rgba(220,38,38,0.3)]">
            <AlertCircle className="mx-auto text-red-600 mb-6" size={64} />
            <h2 className="font-black uppercase tracking-tighter text-2xl mb-4">Confirm Removal</h2>
            <p className="text-zinc-500 text-xs mb-10 uppercase tracking-widest font-bold leading-relaxed">
              You are about to remove this service from the public showroom. This action is permanent.
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={() => handleDelete(showConfirm)} className="w-full bg-red-600 text-white font-black py-5 uppercase tracking-widest text-xs">Authorize Deletion</button>
              <button onClick={() => setShowConfirm(null)} className="w-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 font-black py-5 uppercase tracking-widest text-xs">Abort Operation</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}