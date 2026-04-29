"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Trash2, ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function DeleteVehicle() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const fetchVehicles = async () => {
    const { data } = await supabase.from("vehicles").select("id, make, model, ref_no").order("created_at", { ascending: false });
    if (data) setVehicles(data);
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleDelete = async () => {
    if (!confirmId) return;
    const { error } = await supabase.from("vehicles").delete().eq("id", confirmId);
    if (!error) {
      setConfirmId(null);
      fetchVehicles();
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-black uppercase tracking-widest text-[10px]">
        <ArrowLeft size={14} /> Back
      </Link>
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-12">Purge <span className="text-red-600">Inventory</span></h1>

      <div className="space-y-4">
        {vehicles.map((v) => (
          <div key={v.id} className="flex justify-between items-center p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div>
              <p className="font-black uppercase tracking-widest text-sm">{v.make} {v.model}</p>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">REF: {v.ref_no || "N/A"}</p>
            </div>
            <button onClick={() => setConfirmId(v.id)} className="p-3 bg-red-600 text-white hover:bg-zinc-950">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      {confirmId && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6">
          <div className="bg-white dark:bg-zinc-950 p-10 max-w-md w-full border-t-8 border-red-600 text-center">
            <AlertTriangle className="mx-auto text-red-600 mb-4" size={48} />
            <h2 className="font-black uppercase tracking-widest text-xl mb-2">Delete Vehicle?</h2>
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-8">This will permanently remove the listing and all associated inspection data.</p>
            <div className="flex flex-col gap-2">
              <button onClick={handleDelete} className="w-full bg-red-600 text-white font-black py-4 uppercase tracking-widest text-xs">Confirm Delete</button>
              <button onClick={() => setConfirmId(null)} className="w-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 font-black py-4 uppercase tracking-widest text-xs">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}