"use client";

import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { 
  Shield, Eye, Key, Bell, Users, Download, 
  MapPin, Phone, Mail, Send, Loader2, CheckCircle2, AlertTriangle, Star 
} from "lucide-react";

export default function SecuritySolutionsPage() {
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
        body: JSON.stringify({ ...formData, source: "Security Solutions" })
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
              src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1920&q=80" 
              alt="Advanced Security Infrastructure" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 z-10 text-center max-w-4xl space-y-6">
            <div className="inline-flex p-3 rounded-full bg-brand-orange text-white shadow-lg mx-auto">
              <Shield size={36} className="animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white leading-tight">
              Security Solutions & <span className="text-brand-orange">Services</span>
            </h1>
            <div className="h-1.5 w-24 bg-brand-blue mx-auto rounded-full" />
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Welcome to Horizons Security Solutions & Services
            </p>
          </div>
        </section>

        {/* SECTION 2: Core Philosophy Introduction */}
        <section className="py-24 border-b border-zinc-100 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                  Protecting Environments Globally, <span className="text-brand-blue">Exceeding Expectations</span>
                </h2>
                <p className="text-zinc-600 dark:text-slate-300 text-base leading-relaxed">
                  Horizons International field experience and system knowledge enable us to implement our security solutions virtually into any environment, from large multi-national organizations to small businesses. By carefully assessing our client’s requirements, we design, install and maintain cost effective security systems which achieve and exceed our clients’ expectations.
                </p>
                <p className="text-zinc-600 dark:text-slate-300 text-base leading-relaxed">
                  Our vast network of worldwide solution providers and manufacturers enables Horizons International to provide some of the most technologically advanced solutions within the security industry. Horizons International is comprised of a seasoned team of engineers that espouse a philosophy of dedicated customer service. To attain the potential benefits of our equipment, all our clients are provided full training of their new systems allowing them to use the equipment confidently and efficiently.
                </p>
              </div>
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-6 bg-zinc-50 dark:bg-slate-800 rounded-sm border-l-4 border-brand-orange col-span-2">
                  <p className="text-sm font-black text-brand-orange uppercase tracking-wider">In Right Place at Right Time</p>
                  <p className="text-xl font-bold text-zinc-800 dark:text-white mt-1">Anywhere, Anytime</p>
                </div>
                <div className="p-6 bg-zinc-50 dark:bg-slate-800 rounded-sm border-l-4 border-brand-blue col-span-2">
                  <p className="text-xs uppercase tracking-wider font-bold text-zinc-500 dark:text-slate-400">Security Ecosystem</p>
                  <p className="text-md font-bold text-zinc-800 dark:text-white mt-1">Full System Training Provided</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Capabilities Grid */}
        <section className="py-24 bg-zinc-50 dark:bg-slate-900/40">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-4xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                Horizons Security <span className="text-brand-orange">Core Infrastructure</span>
              </h2>
              <p className="text-zinc-500 dark:text-slate-400 text-sm tracking-widest uppercase font-bold">Technologically Advanced Systems Portfolio</p>
              <div className="h-1 w-20 bg-brand-orange mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* Surveillance (CCTV) */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden p-8 space-y-4">
                <div className="text-brand-orange bg-brand-orange/10 p-3 rounded-sm w-fit">
                  <Eye size={24} />
                </div>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">CCTV & Surveillance</h3>
                <p className="text-zinc-600 dark:text-slate-300 text-sm leading-relaxed">
                  Closed Circuit Television (CCTV) integration matching high-fidelity environments. Complete turnkey configuration, architectural layout simulation, and smart matrix controls designed to operate smoothly over centralized system monitors.
                </p>
              </div>

              {/* Access Control & Biometrics */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden p-8 space-y-4">
                <div className="text-brand-blue bg-brand-blue/10 p-3 rounded-sm w-fit">
                  <Key size={24} />
                </div>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Access Control & Biometrics</h3>
                <p className="text-zinc-600 dark:text-slate-300 text-sm leading-relaxed">
                  Secure Identity verification protocols. Features biometric tracking engines, sophisticated identification/verification portals, and hardware infrastructure layout loops designed to enforce authorization bounds.
                </p>
              </div>

              {/* Intruder & Fire Detection */}
              <div className="bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm overflow-hidden p-8 space-y-4">
                <div className="text-brand-orange bg-brand-orange/10 p-3 rounded-sm w-fit">
                  <Bell size={24} />
                </div>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">Intruder & Fire Detection</h3>
                <p className="text-zinc-600 dark:text-slate-300 text-sm leading-relaxed">
                  Real-time threat recognition frameworks. Comprehensive deployment arrays covering intruder mitigation grids, fire response sensory paths, and intelligent perimeter protection options.
                </p>
              </div>

            </div>

            {/* Catalog & Quick-List Secondary Grid Split */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Core Offerings List */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-800 border border-zinc-200 dark:border-slate-700 shadow-xl rounded-sm p-8">
                <h4 className="font-black uppercase text-zinc-900 dark:text-white tracking-tight text-xl mb-6">Unified Security Solutions Matrix</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-zinc-700 dark:text-slate-300">
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">• Walk Through Gates</p>
                    <p className="flex items-center gap-2">• Handheld Metal Detection</p>
                    <p className="flex items-center gap-2">• Perimeter Protection Systems</p>
                  </div>
                  <div className="space-y-3">
                    <p className="flex items-center gap-2">• Advanced Inspection Systems</p>
                    <p className="flex items-center gap-2">• Identification & Verification</p>
                    <p className="flex items-center gap-2">• Integrated Network Control</p>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-slate-700 text-xs text-zinc-500 dark:text-slate-400">
                  With partnering with some of the worldwide leaders and manufacturers in Security Systems, we foresee an incredible growth and success in this field. It is the attitude and commitment of our staff at Horizons International that enables us to cope and adapt to various developments.
                </div>
              </div>

              {/* PDF Document Catalog Download Callout */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-sm p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
                <div className="absolute right-0 bottom-0 opacity-5 translate-x-10 translate-y-10 group-hover:scale-110 transition-transform duration-500">
                  <Shield size={300} />
                </div>
                <div className="space-y-3 z-10">
                  <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-sm w-fit block">Resource Asset</span>
                  <h4 className="text-2xl font-black uppercase tracking-tight">Horizons Security Catalog</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Security Catalog has been published by Horizons International. You can download now its optimized PDF file directly to your local file system.
                  </p>
                </div>
                <a 
                  href="/docs/security-catalog.pdf" 
                  download
                  className="mt-6 inline-flex items-center gap-2 bg-brand-orange text-white text-xs font-black uppercase tracking-wider py-3.5 px-6 rounded-sm w-fit shadow-md hover:bg-white hover:text-slate-950 transition-colors z-10"
                >
                  Coming Soon <Download size={14} />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 4: Client Testimonials Grid */}
        <section className="py-24 bg-white dark:bg-slate-900 border-b border-zinc-100 dark:border-slate-800">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center space-y-2 mb-16">
              <h2 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">What Our Clients Say</h2>
              <div className="h-1 w-12 bg-brand-blue mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Testimonial 1: Sharon */}
              <div className="bg-zinc-50 dark:bg-slate-800/60 p-8 rounded-sm flex flex-col justify-between space-y-6 shadow-sm border border-zinc-100 dark:border-slate-800">
                <div className="flex gap-1 text-brand-orange"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                <p className="text-zinc-600 dark:text-slate-300 text-xs italic leading-relaxed">
                  "My project needed a company that can do more then develop it, that can contribute ideals that would complement my vision. I found that Horizons International are true professionals and did everything what I needed & what they promised me they would do."
                </p>
                <p className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider">- Sharon <span className="text-zinc-400 font-medium">(China)</span></p>
              </div>

              {/* Testimonial 2: Ealn */}
              <div className="bg-zinc-50 dark:bg-slate-800/60 p-8 rounded-sm flex flex-col justify-between space-y-6 shadow-sm border border-zinc-100 dark:border-slate-800">
                <div className="flex gap-1 text-brand-orange"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                <p className="text-zinc-600 dark:text-slate-300 text-xs italic leading-relaxed">
                  "I must say that we are impressed ! We thank Horizons International very much for the great job they did helping to increase our business. You met or exceeded all of our goals."
                </p>
                <p className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider">- Ealn <span className="text-zinc-400 font-medium">(Singapore)</span></p>
              </div>

              {/* Testimonial 3: Candis */}
              <div className="bg-zinc-50 dark:bg-slate-800/60 p-8 rounded-sm flex flex-col justify-between space-y-6 shadow-sm border border-zinc-100 dark:border-slate-800">
                <div className="flex gap-1 text-brand-orange"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
                <p className="text-zinc-600 dark:text-slate-300 text-xs italic leading-relaxed">
                  "I was real pleased with the solutions Horizons International team offered. The integration with PayPal was a great idea and works well. The database was simple and fast. Navigating the site is easy and the design is superb."
                </p>
                <p className="text-xs font-black text-zinc-900 dark:text-white uppercase tracking-wider">- Candis <span className="text-zinc-400 font-medium">(China)</span></p>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 5: Contact & Interactive Communication Form */}
        <section className="pt-24 pb-12 bg-white dark:bg-slate-900">
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
                <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-orange rounded-sm space-y-2 shadow-sm text-xs">
                  <p className="font-black uppercase tracking-wider text-brand-orange">Corporate Head Office</p>
                  <p className="font-bold text-zinc-800 dark:text-slate-200 text-sm">Horizons International — Islamabad</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Office# 1201, 12th Floor, Green Trust Tower, Jinnah Ave, Islamabad 44000, PAKISTAN.</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> Landline: 0092 51 844-CARE / 0092 51 8317545</p>
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

                {/* Islamabad Branch */}
                <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-zinc-400 rounded-sm space-y-2 shadow-sm text-xs">
                  <p className="font-black uppercase tracking-wider text-zinc-500">Capital Branch Office</p>
                  <p className="font-bold text-zinc-800 dark:text-slate-200 text-sm">Branch Office Islamabad</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Office No 05 , 2nd Floor, Block 20, PHA Apartments, G-7/1, Islamabad, PAKISTAN.</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +92-51-8732952, +92-51-8735360</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> isb@horizonsintl.com</p>
                </div>

                {/* Global Hubs: South Africa */}
                <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-orange rounded-sm space-y-2 shadow-sm text-xs">
                  <p className="font-black uppercase tracking-wider text-brand-orange">Worldwide Network: South Africa</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Cosmos No. 3, 5th Street, Ladybrand, Free State 9745 (P.O Box 0792)</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +27605555550, +27715525207</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> rsa@horizonsintl.com</p>
                </div>

                {/* Global Hubs: China */}
                <div className="p-4 bg-zinc-50 dark:bg-slate-800 border-l-4 border-brand-blue rounded-sm space-y-2 shadow-sm text-xs">
                  <p className="font-black uppercase tracking-wider text-brand-blue">Worldwide Network: China Operations Hub</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><MapPin size={14} className="shrink-0 mt-0.5" /> Songxia Industrial Zone of Shangyu, Zhejiang, China.</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Phone size={14} /> +86 575 82328001</p>
                  <p className="text-zinc-500 dark:text-slate-400 flex gap-2"><Mail size={14} /> china@horizonsintl.com</p>
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
                  <p className="font-black uppercase tracking-wider text-xs text-zinc-400">Branch Office United Arab Emirates</p>
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