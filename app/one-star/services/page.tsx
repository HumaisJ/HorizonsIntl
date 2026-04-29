"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  Settings, ShieldCheck, Ship, Truck, 
  ChevronRight, ArrowRight, MessageSquare 
} from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from("services").select("*");
      if (data) setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER: Element 1 - Featured Services */}
        <header className="text-center space-y-4">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-zinc-900">
            Our <span className="text-red-600">Services</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs">
            Global Automotive Solutions & Export Expertise
          </p>
        </header>

        {/* Element 2 - List of All Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link 
              key={service.id} 
              href={`/one-star/services/${service.id}`}
              className="bg-white border border-zinc-200 p-10 rounded-2xl shadow-sm hover:shadow-xl hover:border-red-600/30 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 bg-zinc-50 rounded-xl flex items-center justify-center mb-8 group-hover:bg-red-50 transition-colors">
                  <Settings className="text-zinc-400 group-hover:text-red-600" size={28} />
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 mb-4 italic">
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium line-clamp-3">
                  {service.description}
                </p>
              </div>
              <div className="mt-10 flex items-center gap-2 text-zinc-900 font-black text-[10px] uppercase tracking-widest group-hover:text-red-600 transition-colors">
                View Details <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        {/* Element 3 - Contact Us / Request CTA */}
        <div className="bg-zinc-900 text-white rounded-3xl p-12 text-center space-y-8 relative overflow-hidden shadow-2xl">
           <div className="relative z-10 space-y-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Need a Custom <span className="text-red-600">Solution?</span></h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-sm font-medium">Contact our specialized team for logistics, inspection, or custom procurement requests tailored to your region.</p>
              <Link href="/one-star/contact" className="inline-flex items-center gap-4 bg-red-600 px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
                <MessageSquare size={18} /> Message Our Experts
              </Link>
           </div>
        </div>

      </div>
    </div>
  );
}