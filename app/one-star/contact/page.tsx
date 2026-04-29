"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Loader2, Send, Mail, Phone, MapPin, 
  Globe, MessageSquare, Clock, ShieldCheck,
  ChevronDown 
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

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
    <div className="min-h-screen bg-zinc-100 py-16 px-4 md:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="mb-12 space-y-2">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-zinc-900">
            Get In <span className="text-red-600">Touch</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-[10px]">
            Global Support & Automotive Consultation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: CONTACT INFO */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-zinc-200 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-red-600 mb-6 flex items-center gap-2">
                <Globe size={16} /> Global Headquarters
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <MapPin className="text-zinc-400 shrink-0" size={20} />
                  <p className="text-xs font-bold text-zinc-900 leading-relaxed uppercase">
                    One Star Trading Ltd.<br />
                    Nagoya, Japan / Dubai, UAE
                  </p>
                </div>
                <div className="flex gap-4 border-t border-zinc-50 pt-6">
                  <Mail className="text-zinc-400 shrink-0" size={20} />
                  <p className="text-xs font-bold text-zinc-900 uppercase tracking-tight">info@horizonsintl.com</p>
                </div>
                <div className="flex gap-4 border-t border-zinc-50 pt-6">
                  <Phone className="text-zinc-400 shrink-0" size={20} />
                  <p className="text-xs font-bold text-zinc-900 uppercase tracking-tight">+92 344 7200002</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 text-white p-8 rounded-2xl shadow-xl space-y-4">
               <Clock className="text-red-600" size={24} />
               <h4 className="text-sm font-black uppercase tracking-widest leading-none">Response Time</h4>
               <p className="text-[10px] text-zinc-400 font-medium uppercase leading-relaxed">
                 Our specialized export team typically responds to all official enquiries within 24 business hours.
               </p>
            </div>
          </div>

          {/* RIGHT COLUMN: REFINED FORM */}
          <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col">
            <div className="bg-zinc-50/80 p-8 md:p-12 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white rounded-2xl border border-zinc-200 flex items-center justify-center shadow-sm">
                  <MessageSquare className="text-red-600" size={28} />
                </div>
                <div>
                  <h2 className="text-base font-black uppercase tracking-[0.2em] text-zinc-900 leading-none">General Enquiry</h2>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-2 flex items-center gap-2">
                    <ShieldCheck size={12} className="text-green-600" /> Official Documentation Channel
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-16">
              {/* SECTION 1: PERSONAL IDENTIFICATION */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-900">Personal Identification</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-red-600 to-transparent opacity-20" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="form-group">
                    <label className="refined-label">Full Name: </label>
                    <input 
                      required 
                      value={formData.name || ""} 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                      className="refined-input" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="refined-label">Email Address: </label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email || ""} 
                      onChange={(e) => setFormData({...formData, email: e.target.value})} 
                      className="refined-input" 
                      placeholder="office@example.com" 
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: SERVICE REQUIREMENTS */}
              <div className="space-y-8 ">
                <div className="flex items-center gap-4">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-900">Service Requirements</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-red-600 to-transparent opacity-20" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="form-group">
                    <label className="refined-label">Contact Number: </label>
                    <input 
                      required 
                      value={formData.phone || ""} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                      className="refined-input" 
                      placeholder="+000 000 000" 
                    />
                  </div>
                  <div className="form-group relative">
                    <label className="refined-label">Interested Service: </label>
                    <select 
                      required
                      value={formData.service || ""} 
                      onChange={(e) => setFormData({...formData, service: e.target.value})} 
                      className="refined-input appearance-auto bg-transparent cursor-pointer border-2 border-zinc-100 focus:border-red-600/30 focus:ring-4 focus:ring-red-600/5"
                    >
                      <option value="">Select Category</option>
                      <option value="Vehicle Export">Vehicle Export</option>
                      <option value="Quality Inspection">Quality Inspection</option>
                      <option value="Logistics">Logistics & Shipping</option>
                      <option value="Custom Search">Custom Procurement</option>
                    </select>
                    <ChevronDown className="absolute right-4 bottom-5 text-zinc-400 pointer-events-none" size={16} />
                  </div>
                  
                  <div className="md:col-span-2 form-group w-full"> {/* Ensure the wrapper is full width */}
  <label className="refined-label">Detailed Requirements: </label>
  <textarea
    required 
    value={formData.message || ""} 
    onChange={(e) => setFormData({...formData, message: e.target.value})} 
    className="refined-input w-full h-32 pt-4 p-3 resize-none leading-relaxed border-2 border-zinc-400 focus:border-red-600/30 focus:ring-4 focus:ring-red-600/5    " // Added w-full here
    placeholder="Provide specific details regarding your automotive requirements..." 
  />
</div>
                </div>
              </div>

              <div className="pt-10">
                <button 
                  disabled={status === 'sending'} 
                  className="w-full bg-zinc-900 text-white font-black py-8 rounded-[1.5rem] text-xs uppercase tracking-[0.6em] hover:bg-red-600 transition-all shadow-2xl flex items-center justify-center gap-4 disabled:opacity-50 group"
                >
                  {status === 'sending' ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Send Official Enquiry 
                      <Send className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-500" size={18} />
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
                  className="p-10 bg-green-50 text-center border-t border-green-100"
                >
                   <p className="text-green-700 text-xs font-black uppercase tracking-widest animate-pulse">
                     Enquiry transmitted successfully. We will contact you soon.
                   </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SINGLE CONSOLIDATED STYLE TAG AT THE END TO PREVENT BUILD ERRORS */}
      <style jsx global>{`
        .refined-label { 
          @apply block text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-3 ml-1 transition-colors; 
        }
        .refined-input { 
          @apply w-full bg-zinc-50 border border-zinc-100 p-5 rounded-2xl outline-none transition-all font-bold text-sm text-zinc-900 placeholder:text-zinc-300 placeholder:font-medium focus:bg-white focus:border-red-600/30 focus:ring-4 focus:ring-red-600/5; 
        }
        .form-group:focus-within .refined-label { 
          @apply text-red-600; 
        }
        .q-input { 
          @apply refined-input; 
        }
      `}</style>
    </div>
  );
}