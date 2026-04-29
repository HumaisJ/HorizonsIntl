"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Send } from "lucide-react";

interface Props {
  serviceName: string; // Auto-filled from the service page
}

export default function ServiceContactForm({ serviceName }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", contact: "", address: "", city: "", country: "", remarks: ""
  });

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: "contact", // or "quote"
          full_name: formData.name,
          email: formData.email,
          telephone: formData.contact,
          address: formData.address,
          city: formData.city,
          country: formData.country,
          service_name: serviceName, // or formData.carInfo
          message: formData.remarks, // or ""
        }),
      });

      if (response.ok) {
        alert("Request sent successfully! Our team will contact you.");
        // Clear form logic...
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Full Name</label>
          <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-transparent focus:border-red-600" />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Email Address</label>
          <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-transparent focus:border-red-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Contact No.</label>
          <input type="text" required value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-transparent focus:border-red-600" />
        </div>
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Service Detail (Auto)</label>
          <input type="text" readOnly value={serviceName} className="w-full bg-zinc-50 dark:bg-zinc-800/50 p-4 text-sm outline-none text-zinc-500 font-bold" />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Address & City</label>
        <div className="flex gap-2">
          <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="flex-2 w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
          <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="flex-1 w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Message / Remarks</label>
        <textarea rows={4} value={formData.remarks} onChange={(e) => setFormData({...formData, remarks: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
      </div>

      <button disabled={loading} className="w-full bg-red-600 text-white font-black py-5 uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-zinc-900 transition-all">
        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />} Send Request
      </button>
    </form>
  );
}