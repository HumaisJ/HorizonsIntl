"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  const [activeMap, setActiveMap] = useState("locator");

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* TOP SECTION: Information Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: About */}
          <div>
            <h3 className="text-brand-blue font-bold text-xl mb-4">Horizons International</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Founded in Pakistan in 1995 as an engineering based trading unit. 
              Today, we are a renowned multinational group supplying high-tech services 
              to countries around the world.
            </p>
          </div>

          {/* Column 2: Affiliations */}
          <div>
            <h4 className="font-bold mb-4 text-brand-orange">Affiliations & Quality</h4>
            <ul className="text-slate-400 text-sm space-y-3">
              <li>LCCI (Lahore Chamber of Commerce Industries)</li>
              <li>APMIA (All Pakistan Marble Industries Association)</li>
              <li className="pt-2">
                <span className="px-3 py-1 bg-slate-800 rounded border border-slate-700 text-xs uppercase font-bold text-white">
                  ISO 9001:2008 Certified
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div>
            <h4 className="font-bold mb-4 text-brand-orange">Connect With Us</h4>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Reach out to our global team for inquiries, support, or partnership opportunities.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/HorizonsInternational" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] transition-all hover:-translate-y-1" title="Facebook">
                <Image src="/icons/facebook.svg" alt="Facebook" width={20} height={20} className="brightness-0 invert" />
              </a>
              <a href="https://x.com/horizonsintl" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-black transition-all hover:-translate-y-1 border border-slate-700" title="X (Twitter)">
                <Image src="/icons/x.svg" alt="X" width={18} height={18} className="brightness-0 invert" />
              </a>
              <a href="mailto:info@horizonsintl.com" className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-orange transition-all hover:-translate-y-1" title="Email Us">
                <Mail size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Full-Width Map Area */}
        <div className="border-t border-slate-800 pt-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h4 className="font-bold text-lg text-brand-orange">Location Services</h4>
            <div className="flex bg-slate-800 rounded-lg p-1 w-fit">
              <button 
                onClick={() => setActiveMap("locator")} 
                className={`px-8 py-2 rounded-md text-sm transition-all ${activeMap === "locator" ? "bg-slate-700 font-bold text-white" : "text-slate-400 hover:text-white"}`}
              >
                Locator
              </button>
              <button 
                onClick={() => setActiveMap("discovery")} 
                className={`px-8 py-2 rounded-md text-sm transition-all ${activeMap === "discovery" ? "bg-slate-700 font-bold text-white" : "text-slate-400 hover:text-white"}`}
              >
                Discovery
              </button>
            </div>
          </div>
          
          <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-black">
            <iframe 
              src={activeMap === "locator" 
                ? "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1662.406894969884!2d136.573612!3d34.864699!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60038b0b14274fc7%3A0x625aba1ce833b2c7!2zT25lIFN0YXIgVHJhZGluZyBQdHkgTHRkICgg44Ov44Oz44K544K_44O844OI44Os44O844OH44Kj44Oz44KwIOagquW8j-S8muekviAp!5e1!3m2!1sen!2sus!4v1781002782089!5m2!1sen!2sus" 
                : "https://storage.googleapis.com/maps-solutions-9wy62ojrjl/neighborhood-discovery/4hry/neighborhood-discovery.html"
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Interactive Map"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 text-center text-slate-500 text-xs tracking-widest uppercase">
          Copyright 1995-2026. Horizons International. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}