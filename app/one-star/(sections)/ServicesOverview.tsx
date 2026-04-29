"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Ship, ShieldCheck, FileSearch, Globe, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Map the icon_name string from DB to the actual Lucide component
const SERVICE_ICONS: Record<string, any> = {
  Ship,
  ShieldCheck,
  FileSearch,
  Globe,
};

export default function ServicesOverview() {
  const [services, setServices] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 1. Fetching from DB (Cohesive with Showroom logic)
  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("*")
        .order("order", { ascending: true });
      if (data) setServices(data);
    };
    fetchServices();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || services.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % services.length);
    }, 4500); // Slightly slower than cars to allow for reading descriptions
    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length, index]);

  const next = () => setIndex((prev) => (prev + 1) % services.length);
  const prev = () => setIndex((prev) => (prev - 1 + services.length) % services.length);

  if (services.length === 0) return null;

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-100 dark:border-zinc-900">
      <div className="container mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Integrated <span className="text-red-600">Trading Services</span>
            </h2>
            <div className="h-1 w-20 bg-red-600" />
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
              We go beyond simple sales. One Star Trading provides a full-cycle import 
              ecosystem designed to make purchasing international vehicles as safe as 
              buying locally—from the auction floor to your doorstep.
            </p>
          </div>
          <Link 
  href="/one-star/services" 
  className="bg-red-600 text-white font-black py-4 px-10 uppercase tracking-widest text-[10px] inline-block shadow-lg hover:bg-zinc-900 transition-colors"
>
  Explore All Services
</Link>
        </div>
      </div>

      <div className="relative h-[480px] w-full flex flex-col items-center justify-between overflow-hidden">
        <div className="relative w-full max-w-6xl flex-grow flex items-center justify-center">
          <AnimatePresence initial={false}>
            {services.map((service, i) => {
              const offset = (i - index + services.length) % services.length;
              let displayOffset = offset;
              if (offset > services.length / 2) displayOffset = offset - services.length;
              
              const isCenter = displayOffset === 0;
              const isVisible = Math.abs(displayOffset) <= 1;
              const Icon = SERVICE_ICONS[service.icon_name] || Globe;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={service.id}
                  initial={false}
                  animate={{
                    x: displayOffset * 400,
                    scale: isCenter ? 1 : 0.85,
                    opacity: isCenter ? 1 : 0.4,
                    zIndex: isCenter ? 2 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 25 }}
                  className="absolute w-[320px] md:w-[420px]"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  {/* Dynamic Link to respective service page */}
                  <Link href={`/one-star/services/${service.id}`} className="block group">
                    <div className="bg-white dark:bg-zinc-900 p-12 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center flex flex-col items-center min-h-[340px] justify-center transition-all duration-500 group-hover:border-red-600/50">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-all duration-700 ${isCenter ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(211,47,47,0.4)]' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
                        <Icon size={36} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-zinc-900 dark:text-white group-hover:text-red-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className={`text-xs leading-relaxed font-medium transition-all duration-700 ${isCenter ? 'text-zinc-500 opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-10 z-40">
          <button onClick={prev} className="text-zinc-300 hover:text-red-600 transition-colors transform active:scale-90">
            <ChevronLeft size={24} strokeWidth={3}/>
          </button>
          
          <div className="flex gap-3">
            {services.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'bg-red-600 w-10' : 'bg-zinc-200 dark:bg-zinc-800 w-4'}`} 
              />
            ))}
          </div>

          <button onClick={next} className="text-zinc-300 hover:text-red-600 transition-colors transform active:scale-90">
            <ChevronRight size={24} strokeWidth={3}/>
          </button>
        </div>
      </div>
    </section>
  );
}