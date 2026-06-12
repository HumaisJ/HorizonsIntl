"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { 
  Shirt, Sparkles, ShoppingBag, Eye, Heart, 
  MapPin, Phone, Mail, Send, Loader2, CheckCircle2, AlertTriangle, ArrowRight 
} from "lucide-react";

export default function VogueZoneBrandPage() {
  // Form State Management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "Vogue Zone Apparel" })
      });
      
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 transition-colors duration-300 min-h-screen flex flex-col">
      
      {/* GLOBAL NAVBAR */}
      <Navbar />
      
      <div className="flex-grow">
        
        {/* SECTION 1: Editorial Hero Header */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-zinc-950 text-white">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80" 
              alt="Vogue Zone Minimalist Fashion Background" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/30 to-zinc-950" />
          </div>
          
          <div className="container mx-auto px-4 z-10 text-center max-w-4xl space-y-6">
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-zinc-400 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full inline-block">
              Premium Lifestyle Label
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
              Vogue <span className="text-brand-orange">Zone</span>
            </h1>
            <div className="h-[1px] w-32 bg-brand-orange mx-auto" />
            <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto font-medium tracking-wide">
              Curated Premium Apparel & Contemporary Fashion
            </p>
          </div>
        </section>

        {/* SECTION 2: Brand Manifesto */}
        <section className="py-24 bg-white dark:bg-slate-900 border-b border-zinc-100 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-8">
            <div className="inline-flex p-3 rounded-full bg-zinc-100 dark:bg-slate-800 text-zinc-900 dark:text-white mx-auto">
              <Sparkles size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight max-w-2xl mx-auto">
              Elevating Everyday Style With <span className="text-brand-blue">Timeless Elegance</span>
            </h2>
            <div className="h-1 w-12 bg-brand-blue mx-auto rounded-full" />
            <p className="text-zinc-600 dark:text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto font-light">
              Discover carefully selected, high-quality contemporary clothing designed to elevate your everyday style. From modern streetwear staples to classic tailored essentials, we bring you exceptional garments that balance timeless elegance with bold, current trends.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-8 text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-slate-500">
              <p className="flex items-center gap-2"><Shirt size={14} className="text-brand-orange" /> Premium Textile Curation</p>
              <p className="flex items-center gap-2"><ShoppingBag size={14} className="text-brand-orange" /> Sustainable Supply Pipelines</p>
              <p className="flex items-center gap-2"><Heart size={14} className="text-brand-orange" /> Contemporary Aesthetics</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Curated Lookbook Focus */}
        <section className="py-24 bg-zinc-50 dark:bg-slate-900/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center space-y-3 mb-16">
              <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                The Style <span className="text-brand-orange">Ecosystem</span>
              </h2>
              <p className="text-zinc-500 dark:text-slate-400 text-xs tracking-widest uppercase font-bold">Seasonal Archetypes & Fabric Disciplines</p>
              <div className="h-1 w-16 bg-brand-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Pillar 1: Avant-Garde Streetwear */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden group">
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80" 
                    alt="Streetwear Capsule Collection" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-black uppercase tracking-widest bg-white text-zinc-950 px-3 py-1 rounded-sm shadow-md">
                    Capsule 01
                  </span>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Modern Streetwear</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    Designed with high-density premium structures balancing comfortable volume drop-lines with architectural panel profiles for robust city environments.
                  </p>
                </div>
              </div>

              {/* Pillar 2: Premium Tailored Essentials */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden group">
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80" 
                    alt="Classic Tailored Essentials" 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <span className="absolute bottom-4 left-4 text-[10px] font-black uppercase tracking-widest bg-white text-zinc-950 px-3 py-1 rounded-sm shadow-md">
                    Capsule 02
                  </span>
                </div>
                <div className="p-8 space-y-3">
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Tailored Essentials</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    Classic structured cuts crafted from dynamic organic linen and composite luxury blends. Designed to transition smoothly between casual day profiles and formal evening lines.
                  </p>
                </div>
              </div>

              {/* Pillar 3: Textiles Supply Operations */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden p-8 flex flex-col justify-between lg:col-span-1 md:col-span-2">
                <div className="space-y-4">
                  <div className="text-brand-blue bg-brand-blue/10 p-3 rounded-sm w-fit"><Eye size={24} /></div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Global Logistics Pipeline</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    Leveraging Horizons International's established wholesale distribution networks to source global components, premium marble-washed fabrics, and export grade thread matrix layouts securely.
                  </p>
                  <ul className="space-y-1.5 text-xs font-bold text-zinc-700 dark:text-slate-300 pt-2">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full" /> 100% Ring-Spun Heavyweight Cottons</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full" /> Ethical Dyeing & Finishes Compliance</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full" /> Wholesale Sourcing and Custom Packaging</li>
                  </ul>
                </div>
                <div className="pt-6 mt-6 border-t border-zinc-100 dark:border-slate-700 flex items-center justify-between text-xs font-black uppercase text-brand-blue tracking-wider">
                  <span>Showroom Launching Soon</span>
                  <ArrowRight size={14} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: Contact & Brand Infrastructure Maps */}
        <section className="pt-24 pb-12 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Form Column */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Get In Touch</h2>
                  <div className="h-1 w-16 bg-brand-blue" />
                  <p className="text-zinc-500 text-xs">Submit design inquiries, retail partnership proposals, or wholesale requests below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Your Name *</label>
                      <input 
                        type="text" required value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-brand-blue text-zinc-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Your Email Address *</label>
                      <input 
                        type="email" required value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-brand-blue text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Subject *</label>
                    <input 
                      type="text" required value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-brand-blue text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Your Message / Inquiry *</label>
                    <textarea 
                      rows={6} required value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-brand-blue text-zinc-900 dark:text-white resize-none"
                    />
                  </div>

                  <button 
                    type="submit" disabled={status === "loading"}
                    className="bg-brand-orange text-white font-black py-4 px-10 uppercase tracking-widest text-xs inline-flex items-center gap-2 shadow-lg hover:bg-zinc-900 dark:hover:bg-brand-blue transition-colors rounded-sm disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <>Running Verification <Loader2 className="animate-spin" size={16} /></>
                    ) : (
                      <>Send Message <Send size={14} /></>
                    )}
                  </button>

                  {status === "error" && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 text-sm font-bold flex items-center gap-2 rounded-sm">
                      <AlertTriangle size={18} /> Error ! Please refresh the page to send another message.
                    </div>
                  )}

                  {status === "success" && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-600 text-sm font-bold flex items-center gap-2 rounded-sm">
                      <CheckCircle2 size={18} /> Thank You ! Your message has been sent.
                    </div>
                  )}
                </form>
              </div>

              {/* Presence Infrastructure Column */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Our Locations</h2>
                  <div className="h-1 w-16 bg-brand-orange" />
                  <p className="text-zinc-500 text-xs">Our Presence Map and Global Headquarter Contacts</p>
                </div>


                {/* Global Branch Infrastructure Listings */}
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                  
                  {/* Head Office */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-orange rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-brand-orange">Corporate Headquarters</p>
                    <p className="font-bold text-zinc-800 dark:text-slate-200 text-sm">Vogue Zone — International Division</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Office# 148 Huma Block Allama Iqbal Town Lahore postal code 54570 PAKISTAN.</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +923447200002, +923234567143</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> info@horizonsintl.com</p>
                  </div>

                  {/* Regional Logistics Hubs */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-zinc-400 rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-zinc-500">Worldwide Distribution Network: South Africa</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Cosmos No. 1, 5th Street, Ladybrand, Free State 9745 (P.O Box 0008)</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +27605555550</p>
                  </div>

                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-zinc-400 rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-zinc-500">Worldwide Distribution Network: Lesotho Hub</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> 1 South Road, Lithabaneng, Maseru, Lesotho. (P.O Box 0008)</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +266-20321818, +266-50342222</p>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* GLOBAL FOOTER */}
      <Footer />
      
    </div>
  );
}