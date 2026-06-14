"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { 
  Cpu, Cloud, ShieldAlert, Code2, Database, Terminal,
  MapPin, Phone, Mail, Send, Loader2, CheckCircle2, AlertTriangle, ArrowRight 
} from "lucide-react";

export default function ITSolutionsPage() {
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
        body: JSON.stringify({ ...formData, source: "IT Solutions" })
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
        
        {/* SECTION 1: Tech Matrix Hero Header */}
        <section className="relative h-[550px] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 z-0 opacity-25">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80" 
              alt="Advanced High-Tech Data Center Circuit Infrastructure" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />
          </div>
          
          {/* Subtle Cyber Grid Lines overlay effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 z-0" />
          
          <div className="container mx-auto px-4 z-10 text-center max-w-4xl space-y-6">
            <div className="inline-flex p-3 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-blue shadow-2xl mx-auto">
              <Terminal size={32} className="animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Information Technology <span className="text-brand-orange">Solutions</span>
            </h1>
            <div className="h-1.5 w-24 bg-brand-blue mx-auto rounded-full" />
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium tracking-wide">
              Enterprise Architecture, Scalable Infrastructures & Digital Transformation
            </p>
          </div>
        </section>

        {/* SECTION 2: Division Overview */}
        <section className="py-24 border-b border-zinc-100 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                  Engineering Next-Generation <span className="text-brand-blue">Enterprise Systems</span>
                </h2>
                <p className="text-zinc-600 dark:text-slate-300 text-base leading-relaxed">
                  The Information Technology division at Horizons International addresses structural business complexities by deploying scalable, data-driven system topologies. From configuring robust cloud compute models to executing custom microservice architectures, we equip multi-national industries with advanced, cloud-native technology stacks.
                </p>
                <p className="text-zinc-600 dark:text-slate-300 text-base leading-relaxed">
                  We bridge legacy enterprise constraints with high-performance computing capabilities. Our specialized developers, solution architects, and engineering networks implement strict security measures and precise logic parameters to maximize operational runtime metrics globally.
                </p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-1 gap-4">
                <div className="p-6 bg-zinc-50 dark:bg-slate-800/60 rounded-sm border-l-4 border-brand-orange shadow-sm">
                  <p className="text-xs uppercase tracking-wider font-black text-zinc-400">System Integration Focus</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white mt-1">High-Availability Operations</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-slate-800/60 rounded-sm border-l-4 border-brand-blue shadow-sm">
                  <p className="text-xs uppercase tracking-wider font-black text-zinc-400">Cyber Resilience Framework</p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white mt-1">Zero-Trust Network Archetypes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Technology Stack Capabilities */}
        <section className="py-24 bg-zinc-50 dark:bg-slate-900/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                Core Tech <span className="text-brand-orange">Ecosystem</span>
              </h2>
              <p className="text-zinc-500 dark:text-slate-400 text-sm tracking-widest uppercase font-bold">Enterprise Computing Disciplines</p>
              <div className="h-1 w-20 bg-brand-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Pillar 1: Enterprise Software Architecture */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-brand-blue bg-brand-blue/10 p-3 rounded-sm w-fit"><Code2 size={24} /></div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Full-Stack Architecture</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    Engineering reliable corporate software platforms using advanced languages and runtime engines. We specialize in decoupled event-driven systems, decoupled API logic models, and low-latency state synchronization.
                  </p>
                </div>
                <span className="text-[9px] font-black text-brand-blue bg-brand-blue/5 px-2.5 py-1 uppercase tracking-widest rounded-sm w-fit mt-4">Microservices</span>
              </div>

              {/* Pillar 2: Cloud Computing & Elastic Infra */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-brand-orange bg-brand-orange/10 p-3 rounded-sm w-fit"><Cloud size={24} /></div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Cloud & DevOps</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    Deploying cloud computing networks via modern container pipelines and orchestration layers. We build auto-scaling, fault-tolerant infrastructures across serverless topologies to prevent runtime failure points.
                  </p>
                </div>
                <span className="text-[9px] font-black text-brand-orange bg-brand-orange/5 px-2.5 py-1 uppercase tracking-widest rounded-sm w-fit mt-4">Infrastructure As Code</span>
              </div>

              {/* Pillar 3: Defensive Security Matrices */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="text-brand-blue bg-brand-blue/10 p-3 rounded-sm w-fit"><ShieldAlert size={24} /></div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Information Security</h3>
                  <p className="text-zinc-600 dark:text-slate-300 text-xs leading-relaxed">
                    Enforcing absolute defense perimeters utilizing automated encryption loops and identity lifecycle verification engines. Providing penetration profiling, secure token audits, and data isolation strategies.
                  </p>
                </div>
                <span className="text-[9px] font-black text-brand-blue bg-brand-blue/5 px-2.5 py-1 uppercase tracking-widest rounded-sm w-fit mt-4">Zero-Trust Layer</span>
              </div>

            </div>

            {/* Tech Capabilities List Box */}
            <div className="mt-12 bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-100 dark:border-slate-700 pb-6 mb-6 gap-4">
                <div>
                  <h4 className="font-black uppercase text-zinc-900 dark:text-white tracking-tight text-lg">System Scope Deployments</h4>
                  <p className="text-zinc-400 text-xs mt-1">Specialized industrial development scopes executed on-demand</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-black text-brand-orange uppercase bg-brand-orange/5 px-3 py-1.5 rounded-sm">
                  <Database size={14} /> Global Database Clusters
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-xs font-bold text-zinc-700 dark:text-slate-300">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Cpu size={14} className="text-brand-blue" /> Custom Enterprise Resource Planning (ERP)</li>
                  <li className="flex items-center gap-2"><Cpu size={14} className="text-brand-blue" /> Customer Relationship Management (CRM)</li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Cpu size={14} className="text-brand-orange" /> Real-time Spatiotemporal Data Streams</li>
                  <li className="flex items-center gap-2"><Cpu size={14} className="text-brand-orange" /> High-Performance API Gateway Sharding</li>
                </ul>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Cpu size={14} className="text-brand-blue" /> Big Data Analytics & Metric Warehousing</li>
                  <li className="flex items-center gap-2"><Cpu size={14} className="text-brand-blue" /> Distributed Ledger Integration Layers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Contact & Digital Infrastructure Communication Form */}
        <section className="pt-24 pb-12 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Form Column */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Consult an Architect</h2>
                  <div className="h-1 w-16 bg-brand-blue" />
                  <p className="text-zinc-500 text-xs">Submit your infrastructural specifications or scope parameters below.</p>
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
                      <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">Your Corporate Email *</label>
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
                    <label className="text-xs uppercase tracking-widest font-black text-zinc-700 dark:text-slate-300">System Architecture/Project Scope *</label>
                    <textarea 
                      rows={6} required value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-zinc-50 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 p-3 rounded-sm font-medium text-sm focus:outline-none focus:border-brand-blue text-zinc-900 dark:text-white resize-none leading-relaxed"
                      placeholder="Outline target data volumes, server parameters, or expected scaling scopes..."
                    />
                  </div>

                  <button 
                    type="submit" disabled={status === "loading"}
                    className="bg-brand-orange text-white font-black py-4 px-10 uppercase tracking-widest text-xs inline-flex items-center gap-2 shadow-lg hover:bg-zinc-900 dark:hover:bg-brand-blue transition-colors rounded-sm disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <>Running System Verification <Loader2 className="animate-spin" size={16} /></>
                    ) : (
                      <>Initialize Consultation <Send size={14} /></>
                    )}
                  </button>

                  {status === "error" && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 text-sm font-bold flex items-center gap-2 rounded-sm">
                      <AlertTriangle size={18} /> Error ! Please refresh the server pipeline to resend enquiry parameters.
                    </div>
                  )}

                  {status === "success" && (
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-600 text-sm font-bold flex items-center gap-2 rounded-sm">
                      <CheckCircle2 size={18} /> Data secure. Architecture review requested successfully.
                    </div>
                  )}
                </form>
              </div>

              {/* Presence Infrastructure Column */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Our Locations</h2>
                  <div className="h-1 w-16 bg-brand-orange" />
                  <p className="text-zinc-500 text-xs">Our Presence Map and Data Network Contacts</p>
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

                  {/* Islamabad Office */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-blue rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-brand-blue">Capital Development Center</p>
                    <p className="font-bold text-zinc-800 dark:text-slate-200 text-sm">Islamabad Dev Center</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Basement Floor, ONYX Plaza, Plot No.26, Northern Commercial Area, E-11-2, Islamabad, Pakistan.</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +92-51-8732952</p>
                  </div>

                  {/* Global Hubs: Japan */}
                  <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-zinc-400 rounded-sm space-y-2 shadow-sm text-xs">
                    <p className="font-black uppercase tracking-wider text-zinc-500">Worldwide Server Operations: Japan Hub</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> 513-0818 Mie Ken, Suzuka shi, Yasuzukacho 1350-72 Hub</p>
                    <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> 059 343 9106</p>
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