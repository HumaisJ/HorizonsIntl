import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16 px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
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
            {/* Facebook Link using your SVG */}
            <a 
              href="https://www.facebook.com/HorizonsInternational" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] transition-all hover:-translate-y-1"
              title="Facebook"
            >
              <Image 
                src="/icons/facebook.svg" 
                alt="Facebook" 
                width={20} 
                height={20} 
                className="brightness-0 invert" 
              />
            </a>

            {/* X (Twitter) Link using your SVG */}
            <a 
              href="https://x.com/horizonsintl" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-black transition-all hover:-translate-y-1 border border-slate-700"
              title="X (formerly Twitter)"
            >
              <Image 
                src="/icons/x.svg" 
                alt="X" 
                width={18} 
                height={18} 
                className="brightness-0 invert" 
              />
            </a>

            {/* Email Link using Lucide icon */}
            <a 
              href="mailto:info@horizonsintl.com" 
              className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-brand-orange transition-all hover:-translate-y-1"
              title="Email Us"
            >
              <Mail size={20} className="text-white" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs tracking-widest uppercase">
        Copyright 1995-2026. Horizons International. All Rights Reserved.
      </div>
    </footer>
  );
}