"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, Send, Mail, Phone, MapPin, 
  Globe, Clock, ShieldCheck, ChevronDown 
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DBService {
  id: string;
  title: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  
  // Dynamic Services Table State
  const [services, setServices] = useState<DBService[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);

  // Fetch Services from Supabase Public Schema on mount
  useEffect(() => {
    async function fetchServices() {
      try {
        const { data, error } = await supabase
          .from("services") 
          .select("id, title") 
          .order("order", { ascending: true }); // Orders using your implicit sorting column

        if (error) throw error;
        if (data) setServices(data as DBService[]);
      } catch (error) {
        console.error("Error fetching services from DB:", error);
      } finally {
        setLoadingServices(false);
      }
    }

    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 py-16 px-4 md:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-12 space-y-2">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
            Get In <span className="text-[#D32F2F]">Touch</span>
          </h1>
          <p className="text-[#7A7A7A] font-bold uppercase tracking-[0.4em] text-[10px]">
            Global Support & Automotive Consultation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: CONTACT INFO */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-50 dark:bg-slate-800 border-l-4 border-[#D32F2F] p-8 rounded-sm shadow-sm space-y-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-[#D32F2F] flex items-center gap-2">
                <Globe size={16} /> Global Headquarters
              </h3>
              <div className="space-y-6 text-xs">
                <div className="flex gap-4">
                  <MapPin className="text-zinc-400 shrink-0" size={20} />
                  <p className="font-bold text-zinc-800 dark:text-slate-200 leading-relaxed uppercase">
                    One Star Trading Ltd.<br />
                    Nagoya, Japan / Dubai, UAE
                  </p>
                </div>
                <div className="flex gap-4 border-t border-zinc-200 dark:border-slate-700 pt-6">
                  <Mail className="text-zinc-400 shrink-0" size={20} />
                  <p className="font-bold text-zinc-800 dark:text-slate-200 uppercase tracking-tight">info@horizonsintl.com</p>
                </div>
                <div className="flex gap-4 border-t border-zinc-200 dark:border-slate-700 pt-6">
                  <Phone className="text-zinc-400 shrink-0" size={20} />
                  <p className="font-bold text-zinc-800 dark:text-slate-200 uppercase tracking-tight">+92 344 7200002</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 text-white p-8 rounded-sm shadow-xl space-y-4">
               <Clock className="text-[#D32F2F]" size={24} />
               <h4 className="text-sm font-black uppercase tracking-widest leading-none">Response Time</h4>
               <p className="text-[10px] text-zinc-400 font-medium uppercase leading-relaxed">
                 Our specialized export team typically responds to all official enquiries within 24 business hours.
               </p>
            </div>
          </div>

          {/* RIGHT COLUMN: REFINED BRAND FORM CONTAINER */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Submit Enquiry</h2>
              <div className="h-1 w-16 bg-[#D32F2F]" />
              <p className="text-zinc-500 text-xs">Complete official documentation routing channel requirements below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Your Good Name *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.name || ""} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-[#D32F2F] text-zinc-900 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Email Address *</label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email || ""} 
                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                    className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-[#D32F2F] text-zinc-900 dark:text-white"
                    placeholder="office@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Contact Number *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.phone || ""} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-[#D32F2F] text-zinc-900 dark:text-white"
                    placeholder="+000 000 000"
                  />
                </div>
                <div className="space-y-2 relative">
                  <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Interested Service *</label>
                  <div className="relative">
                    <select 
                      required
                      value={formData.service || ""} 
                      onChange={(e) => setFormData({...formData, service: e.target.value})} 
                      className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 pr-10 rounded-sm font-medium text-sm focus:outline-none focus:border-[#D32F2F] text-zinc-900 dark:text-white appearance-none cursor-pointer"
                      disabled={loadingServices}
                    >
                      {loadingServices ? (
                        <option>Loading corporate modules...</option>
                      ) : (
                        <>
                          <option value="">Select Service Option</option>
                          {services.map((item) => (
                            <option key={item.id} value={item.title}>
                              {item.title}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Detailed Requirements *</label>
                <textarea
                  required 
                  rows={5}
                  value={formData.message || ""} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})} 
                  className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-[#D32F2F] text-zinc-900 dark:text-white resize-none leading-relaxed"
                  placeholder="Provide specific details regarding your automotive requirements..." 
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  disabled={status === 'sending'} 
                  className="bg-[#D32F2F] text-white font-black py-4 px-10 uppercase tracking-widest text-xs inline-flex items-center gap-2 shadow-lg hover:bg-zinc-900 transition-colors rounded-sm disabled:opacity-50 group"
                >
                  {status === 'sending' ? (
                    <>Transmitting Data <Loader2 className="animate-spin" size={16} /></>
                  ) : (
                    <>
                      Send Official Enquiry 
                      <Send className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }} 
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-sm font-bold flex items-center gap-2 rounded-sm"
                >
                   <ShieldCheck size={18} /> Enquiry transmitted successfully. Our export team will contact you soon.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}