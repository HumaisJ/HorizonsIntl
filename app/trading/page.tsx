"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { 
  Globe, Layers, Droplet, Cpu, Scissors, Stethoscope,
  MapPin, Phone, Mail, Send, Loader2, CheckCircle2, AlertTriangle 
} from "lucide-react";

export default function TradingDepartmentPage() {
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
        body: JSON.stringify({ ...formData, source: "Trading (Import & Export)" })
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
        
        {/* SECTION 1: Hero Banner */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1920&q=80" 
              alt="Global Logistics and International Trading" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 z-10 text-center max-w-4xl space-y-6">
            <div className="inline-flex p-3 rounded-full bg-brand-orange text-white shadow-lg mx-auto">
              <Globe size={36} className="animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Trading <span className="text-brand-orange">(Import & Export)</span>
            </h1>
            <div className="h-1.5 w-24 bg-brand-blue mx-auto rounded-full" />
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Welcome to Horizons Trade Department
            </p>
          </div>
        </section>

        {/* SECTION 2: Corporate Introduction */}
        <section className="py-24 border-b border-zinc-100 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                  Multi-Solutions Provider <span className="text-brand-blue">Serving Global Customers</span>
                </h2>
                <p className="text-zinc-600 dark:text-slate-300 text-base leading-relaxed">
                  Horizons International is a multi-solutions provider trading company dealing in technology-oriented components and serving worldwide customers providing innovative international trading opportunities to a range of clients.
                </p>
                <p className="text-zinc-600 dark:text-slate-300 text-base leading-relaxed font-bold">
                  In Right Place at Right Time — Anywhere, Anytime.
                </p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-6 bg-zinc-50 dark:bg-slate-800 rounded-sm border-l-4 border-brand-orange col-span-2">
                  <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-slate-400">Trading Footprint</p>
                  <p className="text-lg font-black text-brand-orange mt-1">Innovative Global Supply Networks</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-slate-800 rounded-sm border-l-4 border-brand-blue col-span-2">
                  <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-slate-400">Corporate Target</p>
                  <p className="text-md font-bold text-zinc-800 dark:text-white mt-1">Technology-Oriented Supply Assets</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Capabilities Portfolio Grid */}
        <section className="py-24 bg-zinc-50 dark:bg-slate-900/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                Horizons Trading <span className="text-brand-orange">Services</span>
              </h2>
              <p className="text-zinc-500 dark:text-slate-400 text-sm tracking-widest uppercase font-bold">Diverse Export & Wholesale Pipelines</p>
              <div className="h-1 w-20 bg-brand-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Card 1: Raw Materials */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden flex flex-col justify-between">
                <div className="p-8 space-y-4">
                  <div className="text-brand-orange bg-brand-orange/10 p-3 rounded-sm w-fit"><Layers size={24} /></div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Raw Materials</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    Years of experience supplying a wide range of custom cut metals to sectors including aerospace, engineering, and fabrication. Meeting both standard and custom requirements across ferrous and non-ferrous materials.
                  </p>
                  <div className="space-y-1.5 pt-2 text-[11px] font-bold text-zinc-700 dark:text-slate-300">
                    <p><span className="text-brand-blue">Stainless Steel:</span> 303, 304, 310, 316, 320, 321, 431, 432</p>
                    <p><span className="text-brand-orange">Alloy Steel:</span> EN14, EN16, EN24, EN26, EN30B, EN31, EN36, 17-4-PH, AISI4130, AISI4140</p>
                    <p><span className="text-zinc-500">Super Alloys & Copper:</span> Monel, Inconel, Invar, OFC 99.99%, Brass</p>
                    <p><span className="text-emerald-600">Aluminium Alloys:</span> 1000 to 8000 Series</p>
                  </div>
                </div>
              </div>

              {/* Card 2: Minerals & Chemicals */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden flex flex-col justify-between">
                <div className="p-8 space-y-4">
                  <div className="text-brand-blue bg-brand-blue/10 p-3 rounded-sm w-fit"><Droplet size={24} /></div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Mineral & Chemicals</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    Extensive supply capabilities managed by an experienced leading team within specialized extraction networks. Supplying premium grade mineral reserves with high whiteness values and fine grading parameters.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-bold text-zinc-500 dark:text-slate-400">
                    <div>
                      <p>• Calcium Carbonate</p>
                      <p>• Soft Stone (400-2500 mesh)</p>
                      <p>• Edible Soft Stone</p>
                      <p>• Gypsum Fine Powder</p>
                      <p>• China Clay</p>
                    </div>
                    <div>
                      <p>• P2O5 (180 mesh)</p>
                      <p>• Jet Stone & Coal</p>
                      <p>• Fluoride</p>
                      <p>• Antimony</p>
                      <p>• Mica</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3: General Machinery */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden flex flex-col justify-between">
                <div className="p-8 space-y-4">
                  <div className="text-brand-orange bg-brand-orange/10 p-3 rounded-sm w-fit"><Cpu size={24} /></div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">General Machinery</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    Horizons International maintains close logistics links with Original Equipment Manufacturers (OEMs) and major industrial equipment suppliers worldwide to secure factory components smoothly.
                  </p>
                  <div className="space-y-1 pt-2 text-[11px] font-bold text-zinc-700 dark:text-slate-300">
                    <p className="flex gap-1.5"><span className="text-brand-blue">✓</span> CNC Machining Centers (Complete Range)</p>
                    <p className="flex gap-1.5"><span className="text-brand-orange">✓</span> Full Industrial Plants (Juice, Tetra Pak, Packaging Systems)</p>
                  </div>
                </div>
              </div>

              {/* Card 4: Textile Export */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden flex flex-col justify-between lg:col-span-1">
                <div className="p-8 space-y-4">
                  <div className="text-brand-blue bg-brand-blue/10 p-3 rounded-sm w-fit"><Scissors size={24} /></div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Textile Department</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    A leading manufacturer and exporter of Home Textiles and premium Garments out of Pakistan. Engineered to meet modern trend styles while executing bulk worldwide deployments at highly competitive pricing brackets.
                  </p>
                  <p className="text-[10px] font-bold text-zinc-400 dark:text-slate-400 uppercase tracking-wider pt-2">Product Portfolio Include:</p>
                  <div className="text-xs font-bold text-brand-blue italic">
                    Bed Spreads, Towels, Blankets, Dress Shirts, Polo Shirts, T-Shirts, Socks, and Premium Denim Jeans.
                  </div>
                </div>
              </div>

              {/* Card 5: Surgical Instruments */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden flex flex-col justify-between lg:col-span-2">
                <div className="p-8 space-y-4">
                  <div className="text-brand-orange bg-brand-orange/10 p-3 rounded-sm w-fit"><Stethoscope size={24} /></div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Surgical Instruments</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    Horizons International provides medical solutions and procurement services covering an entire spectrum of medical, clinical, and general instrument categories matching certified operating metrics.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2 text-xs font-black text-zinc-700 dark:text-slate-300">
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full" /> General Surgical Instruments</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full" /> Specialized Orthopedic Sets</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full" /> Certified ENT Instruments</li>
                    </ul>
                    <ul className="space-y-1.5">
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full" /> Precision Dental Instruments</li>
                      <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full" /> Premium Beauty Care Range</li>
                    </ul>
                  </div>
                </div>
                <div className="px-8 pb-6 text-[11px] text-zinc-400 italic border-t border-zinc-100 dark:border-slate-700 pt-4 bg-zinc-50 dark:bg-slate-800/40">
                  Supplying healthcare networks globally with premium, high-grade medical tool arrays.
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: Contact & Geographic Infrastructure Maps */}
        <section className="pt-24 pb-12 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Form Column */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Get In Touch</h2>
                  <div className="h-1 w-16 bg-brand-blue" />
                  <p className="text-zinc-500 text-xs">Submit your wholesale specifications or supply requirements below.</p>
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
                  <p className="text-zinc-500 text-xs">Our Presence Map and Corporate Network Contacts</p>
                </div>


                {/* Global Branch Infrastructure Listings */}
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                  
                  {/* Head Office */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-orange rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-brand-orange">Corporate Head Office</p>
                    <p className="font-bold text-zinc-800 dark:text-slate-200 text-sm">Horizons International — Lahore</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Office# 148 Huma Block Allama Iqbal Town Lahore postal code 54570 PAKISTAN.</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +923447200002, +923234567143</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> info@horizonsintl.com</p>
                  </div>

                  {/* Industrial Factory Location */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-blue rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-brand-blue">Nationwide Manufacturing Plant</p>
                    <p className="font-bold text-zinc-800 dark:text-slate-200 text-sm">Factory Office Lahore</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> 17km, Rehmat Street, Sheikhupura Road, Lahore, PAKISTAN.</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +92-3447200002</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> lhr@horizonsintl.com</p>
                  </div>

                  {/* Faisalabad */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-zinc-400 rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-zinc-500">Faisalabad Sub-Office</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Darul Uloom Rahimia Mahria, Adda Awagat, Jaranwala Rd, Faisalabad, PAKISTAN.</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +92-3126600667</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> fsd@horizonsintl.com</p>
                  </div>

                  {/* Islamabad */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-zinc-400 rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-zinc-500">Capital Branch Office</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Basement Floor, ONYX Plaza, Plot No.26, Norther Commercial Area, E-11-2, Islamabad, Pakistan.</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +92-51-8732952, +92-345-5514664</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> isb@horizonsintl.com</p>
                  </div>

                  {/* Global Hubs: South Africa */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-orange rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-brand-orange">Worldwide Network: South Africa</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Cosmos No. 1, 5th Street, Ladybrand, Free State 9745 (P.O Box 0008)</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +27605555550</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> rsa@horizonsintl.com</p>
                  </div>

                  {/* Global Hubs: Japan */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-blue rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-brand-blue">Worldwide Network: Japan Hub</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> 513-0818 Mie Ken, Suzuka shi, Yasuzukacho 1350-72</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> 059 343 9106</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> Javed@horizonsintl.com</p>
                  </div>

                  {/* Global Hubs: Lesotho */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-zinc-400 rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-zinc-500">Worldwide Network: Lesotho Hub</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> 1 South Road, Lithabaneng, Maseru, Lesotho. (P.O Box 0008)</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +266-20321818, +266-50342222</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> lesotho@horizonsintl.com</p>
                  </div>

                  {/* United Arab Emirates */}
                  <div className="p-4 bg-zinc-100 dark:bg-slate-800 border-l-4 border-zinc-300 rounded-sm opacity-60">
                    <p className="font-black uppercase tracking-wider text-zinc-400">Branch Office United Arab Emirates</p>
                    <p className="text-zinc-400 dark:text-slate-500 text-xs italic">Operational Core Deployment — Coming Soon</p>
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