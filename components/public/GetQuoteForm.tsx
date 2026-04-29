"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, FileText } from "lucide-react";

interface Props {
  carName?: string; 
}

export default function GetQuoteForm({ carName = "" }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", contact: "", address: "", city: "", country: "", carInfo: carName
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: "quote",
          full_name: formData.name,
          email: formData.email,
          telephone: formData.contact,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          service_name: formData.carInfo, // Fixed: This form uses carInfo, not serviceName
          message: "", // Fixed: This form doesn't have a remarks field, so we pass empty
        }),
      });

      if (response.ok) {
        alert("Quote request submitted successfully!");
        setFormData({ name: "", email: "", contact: "", address: "", city: "", country: "", carInfo: carName });
      } else {
        throw new Error("Failed to send request.");
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl max-w-2xl">
      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Car Required</label>
        <input 
          type="text" 
          required 
          placeholder="Car Name and Number"
          value={formData.carInfo} 
          onChange={(e) => setFormData({...formData, carInfo: e.target.value})} 
          className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-red-600" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Your Name</label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Email Address</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Contact No.</label>
          <input type="text" required value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
        </div>
        <div className="md:col-span-1">
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">City</label>
          <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
        </div>
        <div className="md:col-span-1">
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Country</label>
          <input type="text" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
        </div>
      </div>

      <button disabled={loading} className="w-full bg-red-600 text-white font-black py-5 uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-900 transition-all">
        {loading ? <Loader2 className="animate-spin" /> : <FileText size={18} />} Get Official Quote
      </button>
    </form>
  );
}