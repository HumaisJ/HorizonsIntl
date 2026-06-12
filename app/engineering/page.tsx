"use client";
import Navbar from "@/components/navbar"; // Path to your main Horizons Navbar
import Footer from "@/components/footer"; // Path to your main Horizons Footer

import React, { useState } from "react";
import { 
  Settings, Wrench, Layers, Hammer, Cpu, 
  MapPin, Phone, Mail, Send, Loader2, CheckCircle2, AlertTriangle 
} from "lucide-react";

export default function EngineeringServicesPage() {
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
      // API call placeholder hitting your internal API routing structure
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "Engineering Services" })
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
      
      {/* GLOBAL NAVBAR ADDED */}
      <Navbar />
      
      <div className="flex-grow">
        {/* SECTION 1: Hero Banner */}
        <section className="relative h-[550px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop" 
              alt="Engineering Design Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 z-10 text-center max-w-4xl space-y-6">
            <div className="inline-flex p-3 rounded-full bg-brand-orange text-white animate-spin-slow shadow-lg mx-auto">
              <Settings size={36} />
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Engineering Services & <span className="text-brand-orange">Mechanical Design</span>
            </h1>
            <div className="h-1.5 w-24 bg-brand-blue mx-auto rounded-full" />
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Welcome to Horizons Engineering Services & Mechanical Design
            </p>
          </div>
        </section>

        {/* SECTION 2: Consultancy Introduction */}
        <section className="py-24 border-b border-zinc-100 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                  Our Passion For <span className="text-brand-blue">Creative Solutions</span>
                </h2>
                <p className="text-zinc-600 dark:text-slate-300 text-base leading-relaxed">
                  The consultancy team at Horizons International has a passion for ideas and creative solutions. We have achieved expertise in providing consulting services in terms of various engineering works and operations to several industries.
                </p>
                <p className="text-zinc-600 dark:text-slate-300 text-base leading-relaxed">
                  From purchasing equipment to designing of the plants; and from installation of these machineries to the operation of the same, we provide every solution to our clients. We adopt the latest treatment technologies, conceptual designing and process engineering for designing of plants as per the process requirements. We have earned great reputations in this work.
                </p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-6 bg-zinc-50 dark:bg-slate-800 rounded-sm border-l-4 border-brand-orange">
                  <p className="text-3xl font-black text-brand-orange">1995</p>
                  <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-slate-400 mt-1">Established Expertise</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-slate-800 rounded-sm border-l-4 border-brand-blue">
                  <p className="text-3xl font-black text-brand-blue">Turn-key</p>
                  <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-slate-400 mt-1">Plant Engineering</p>
                </div>
                <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1920&auto=format&fit=crop" alt="Machinery" className="col-span-2 rounded-sm object-cover h-48 w-full filter dark:brightness-90 shadow-md" />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Capabilities Grid */}
        <section className="py-24 bg-zinc-50 dark:bg-slate-900/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                Horizons Engineering <span className="text-brand-orange">Capabilities</span>
              </h2>
              <p className="text-zinc-500 dark:text-slate-400 text-sm tracking-widest uppercase font-bold">Comprehensive Industrial Processing Portfolio</p>
              <div className="h-1 w-20 bg-brand-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Capability 1: Machining */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-48 relative">
                    <img src="https://images.unsplash.com/photo-1541845157-a6d2d100c931?auto=format&fit=crop&w=600&q=80" alt="Machining" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-brand-orange p-3 text-white rounded-sm"><Wrench size={20} /></div>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Machining</h3>
                    <p className="text-zinc-600 dark:text-slate-300 text-sm leading-relaxed">
                      Our manufacturing engineers and machinists are very well versed in CNC Milling, Precision CNC Turning, Wire EDM, Grinding, Boring, and Lapping and fixture design. They thrive on challenging opportunities. Perhaps you need 3 micron positional accuracies. Over the years, we have had a few interesting requirements and were happy to accommodate.
                    </p>
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <span className="text-[10px] font-bold text-brand-orange tracking-widest bg-brand-orange/10 px-3 py-1.5 uppercase rounded-sm">3 Micron Accuracies</span>
                </div>
              </div>

              {/* Capability 2: Forging */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-48 relative">
                    <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop" alt="Forging" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-brand-blue p-3 text-white rounded-sm"><Hammer size={20} /></div>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Forging</h3>
                    <p className="text-zinc-600 dark:text-slate-300 text-sm leading-relaxed">
                      Several material forgings are produced according to the customer's drawings. Processes include prototypes to full production runs, ferrous and non-ferrous forgings, open die, closed die, upset, and press forging. We currently cater to Carbon Steel, Alloy steel, and Stainless Steel Forgings manufactured through Closed Die Forging.
                    </p>
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <div className="overflow-x-auto border border-zinc-100 dark:border-slate-700 text-[11px]">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-slate-700 text-zinc-700 dark:text-slate-200 uppercase font-black">
                          <th className="p-1">Process</th>
                          <th className="p-1">Weight Max</th>
                        </tr>
                      </thead>
                      <tbody className="text-zinc-500 dark:text-slate-400">
                        <tr className="border-t border-zinc-100 dark:border-slate-700"><td className="p-1">Close Die</td><td className="p-1">100 kgs</td></tr>
                        <tr className="border-t border-zinc-100 dark:border-slate-700"><td className="p-1">Open Die</td><td className="p-1">2 tons</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Capability 3: Casting */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="h-48 relative">
                    <img src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=600&auto=format&fit=crop" alt="Casting" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-brand-orange p-3 text-white rounded-sm"><Layers size={20} /></div>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Casting</h3>
                    <p className="text-zinc-600 dark:text-slate-300 text-sm leading-relaxed">
                      Molding Process: High Pressure Die Castings, Gravity Die Casting, and comprehensive Sand Casting capabilities. We manufacture specialized structural units utilizing Aluminium & its alloys, Zinc, Zamac, Ductile Iron Casting (Nodular Iron), and Gray Iron for extreme industrial application requirements.
                    </p>
                  </div>
                </div>
                <div className="px-8 pb-8">
                  <div className="overflow-x-auto border border-zinc-100 dark:border-slate-700 text-[11px]">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-slate-700 text-zinc-700 dark:text-slate-200 uppercase font-black">
                          <th className="p-1">Process</th>
                          <th className="p-1">Capacities Range</th>
                        </tr>
                      </thead>
                      <tbody className="text-zinc-500 dark:text-slate-400">
                        <tr className="border-t border-zinc-100 dark:border-slate-700"><td className="p-1">Die Casting</td><td className="p-1">5g to 3 kgs</td></tr>
                        <tr className="border-t border-zinc-100 dark:border-slate-700"><td className="p-1">Sand Casting</td><td className="p-1">50g to 5 tons</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Capability 4: Fabrication */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden flex flex-col justify-between lg:col-span-1">
                <div>
                  <div className="h-48 relative">
                    <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop" alt="Fabrication" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-brand-blue p-3 text-white rounded-sm"><Cpu size={20} /></div>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Fabrication</h3>
                    <p className="text-zinc-600 dark:text-slate-300 text-sm leading-relaxed">
                      Horizons International is one of the leading sources for high quality fabrication works throughout Pakistan. Fabrication capabilities include spinning, flow forming, laser cutting, punching, stamping, forming, automatic inserting, welding, deburring, and meticulous aesthetic finishing.
                    </p>
                  </div>
                </div>
              </div>

              {/* Capability 5 & 6 Unified: Design Portfolio */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden flex flex-col justify-between lg:col-span-2">
                <div>
                  <div className="h-48 relative">
                    <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop" alt="CAD Designs" className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-brand-orange p-3 text-white rounded-sm"><Settings size={20} /></div>
                  </div>
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Mechanical Engineering</h3>
                      <p className="text-zinc-600 dark:text-slate-300 text-sm leading-relaxed">
                        Founded in 1995. With specialized engineers in design, analysis and test; we provide turn-key project services in Automotive industries from concept design to manufacturing. We carry out advanced engineering computations for certification, analysis, and optimization.
                      </p>
                    </div>
                    <div className="space-y-4 border-l border-zinc-100 dark:border-slate-700 pl-0 md:pl-6">
                      <h4 className="font-bold text-sm uppercase text-brand-orange tracking-wider">CAD/CAM Specialized Scopes:</h4>
                      <ul className="space-y-2 text-sm font-bold text-zinc-700 dark:text-slate-300">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full" /> Mechanical Designs (2D)</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full" /> Mechanical Designs (3D)</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full" /> 2D and 3D CAD Services</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full" /> System & Subsystem Construction</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-blue rounded-full" /> Prototype Manufacturing</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="px-8 pb-8 bg-zinc-50 dark:bg-slate-800/50 p-4 border-t border-zinc-100 dark:border-slate-700 text-xs text-zinc-500 dark:text-slate-400">
                  Primary target of Horizon International is contributing to the industry to increase its technology level and competitive power in international markets by supporting advance R&D activities.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Contact & Interactive Communication Form */}
        <section className="py-24 border-t border-zinc-200 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Form Column */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Get In Touch</h2>
                  <div className="h-1 w-16 bg-brand-blue" />
                  <p className="text-zinc-500 text-xs">Submit your technical parameters and operational requirements below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Your Name *</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-brand-blue transition-colors text-zinc-900 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Your Email Address *</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-brand-blue transition-colors text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Subject *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-brand-blue transition-colors text-zinc-900 dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Your Message / Inquiry *</label>
                    <textarea 
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-brand-blue transition-colors text-zinc-900 dark:text-white resize-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={status === "loading"}
                    className="bg-brand-orange text-white font-black py-4 px-10 uppercase tracking-widest text-xs inline-flex items-center gap-2 shadow-lg hover:bg-zinc-900 dark:hover:bg-brand-blue transition-colors rounded-sm disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <>Running Verification <Loader2 className="animate-spin" size={16} /></>
                    ) : (
                      <>Send Message <Send size={14} /></>
                    )}
                  </button>

                  {/* State Feedback Banners */}
                  {status === "error" && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm font-bold flex items-center gap-2 rounded-sm">
                      <AlertTriangle size={18} /> Error ! Please refresh the page to send another message.
                    </div>
                  )}

                  {status === "success" && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 text-sm font-bold flex items-center gap-2 rounded-sm">
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
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-orange rounded-sm space-y-2 shadow-sm">
                    <p className="font-black uppercase tracking-wider text-xs text-brand-orange">Corporate Head Office</p>
                    <p className="font-bold text-zinc-800 dark:text-slate-200 text-sm">Horizons International — Lahore</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Office# 148 Huma Block Allama Iqbal Town Lahore postal code 54570 PAKISTAN.</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Phone size={14} /> +923447200002, +923234567143</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Mail size={14} /> info@horizonsintl.com</p>
                  </div>

                  {/* Industrial Factory Location */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-blue rounded-sm space-y-2 shadow-sm">
                    <p className="font-black uppercase tracking-wider text-xs text-brand-blue">Nationwide Manufacturing Plant</p>
                    <p className="font-bold text-zinc-800 dark:text-slate-200 text-sm">Factory Office Lahore</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> 17km, Rehmat Street, Sheikhupura Road, Lahore, PAKISTAN.</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Phone size={14} /> +92-3447200002</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Mail size={14} /> lhr@horizonsintl.com</p>
                  </div>

                  {/* Faisalabad */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-zinc-400 rounded-sm space-y-2 shadow-sm">
                    <p className="font-black uppercase tracking-wider text-xs text-zinc-500">Faisalabad Sub-Office</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Darul Uloom Rahimia Mahria, Adda Awagat, Jaranwala Rd, Faisalabad, PAKISTAN.</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Phone size={14} /> +92-3126600667</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Mail size={14} /> fsd@horizonsintl.com</p>
                  </div>

                  {/* Islamabad */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-zinc-400 rounded-sm space-y-2 shadow-sm">
                    <p className="font-black uppercase tracking-wider text-xs text-zinc-500">Capital Branch Office</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Basement Floor, ONYX Plaza, Plot No.26, Northern Commercial Area, E-11-2, Islamabad, Pakistan.</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Phone size={14} /> +92-51-8732952, +92-345-5514664</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Mail size={14} /> isb@horizonsintl.com</p>
                  </div>

                  {/* Global Hubs: South Africa */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-orange rounded-sm space-y-2 shadow-sm">
                    <p className="font-black uppercase tracking-wider text-xs text-brand-orange">Worldwide Network: South Africa</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Cosmos No. 1, 5th Street, Ladybrand, Free State 9745 (P.O Box 0008)</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Phone size={14} /> +27605555550</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Mail size={14} /> rsa@horizonsintl.com</p>
                  </div>

                  {/* Global Hubs: Japan */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-blue rounded-sm space-y-2 shadow-sm">
                    <p className="font-black uppercase tracking-wider text-xs text-brand-blue">Worldwide Network: Japan Logistics Hub</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> 513-0818 Mie Ken, Suzuka shi, Yasuzukacho 1350-72</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Phone size={14} /> 059 343 9106</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Mail size={14} /> Javed@horizonsintl.com</p>
                  </div>

                  {/* Global Hubs: Lesotho */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-zinc-400 rounded-sm space-y-2 shadow-sm">
                    <p className="font-black uppercase tracking-wider text-xs text-zinc-500">Worldwide Network: Lesotho Hub</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> 1 South Road, Lithabaneng, Maseru, Lesotho. (P.O Box 0008)</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Phone size={14} /> +266-20321818, +266-50342222</p>
                    <p className="text-zinc-500 dark:text-slate-400 text-xs flex gap-2"><Mail size={14} /> lesotho@horizonsintl.com</p>
                  </div>

                  {/* United Arab Emirates */}
                  <div className="p-4 bg-zinc-100 dark:bg-slate-800 border-l-4 border-zinc-300 rounded-sm opacity-60">
                    <p className="font-black uppercase tracking-wider text-xs text-zinc-400">Branch Office United Arab Emirates</p>
                    <p className="text-zinc-400 dark:text-slate-500 text-xs italic">Operational Core Deployment — Coming Soon</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>

      {/* GLOBAL FOOTER ADDED */}
      <Footer />
      
    </div>
  );
}