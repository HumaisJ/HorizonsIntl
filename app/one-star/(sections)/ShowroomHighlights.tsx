"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ShowroomHighlights() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    const fetchRecentCars = async () => {
      const { data } = await supabase
        .from("vehicles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);

      if (data) setVehicles(data);
    };
    fetchRecentCars();
  }, []);

  // Adjusted to 4 seconds for a slightly faster, more engaging transition
  useEffect(() => {
    if (!isAutoPlaying || vehicles.length === 0) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, vehicles.length, index]);

  const next = () => setIndex((prev) => (prev + 1) % vehicles.length);
  const prev = () => setIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);

  if (vehicles.length === 0) return null;

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 border-y border-zinc-100 dark:border-zinc-900">
      <div className="container mx-auto px-4 mb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4 max-w-2xl">
            {/* Professional & Friendly Heading */}
            <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none">
              Explore Our <span className="text-red-600">Premium Collection</span>
            </h2>
            <div className="h-1 w-20 bg-red-600" />
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
              Discover our latest arrivals of hand-picked, certified Japanese vehicles. 
              Each unit undergoes a rigorous 100-point inspection to ensure absolute 
              quality before joining our global showroom.
            </p>
          </div>
          <Link 
  href="/one-star/showroom" 
  className="bg-red-600 text-white font-black py-4 px-10 uppercase tracking-widest text-[10px] inline-block shadow-lg hover:bg-zinc-900 transition-colors"
>
  Explore Full Inventory
</Link>
        </div>
      </div>

      <div className="relative h-[480px] w-full flex flex-col items-center justify-between overflow-hidden">
        {/* Structured Card Stage */}
        <div className="relative w-full max-w-6xl flex-grow flex items-center justify-center">
          <AnimatePresence initial={false}>
            {vehicles.map((car, i) => {
              const offset = (i - index + vehicles.length) % vehicles.length;
              let displayOffset = offset;
              if (offset > vehicles.length / 2) displayOffset = offset - vehicles.length;
              
              const isCenter = displayOffset === 0;
              const isVisible = Math.abs(displayOffset) <= 1;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={car.id}
                  initial={false}
                  animate={{
                    x: displayOffset * 400, // Balanced structural spacing
                    scale: isCenter ? 1 : 0.85,
                    opacity: isCenter ? 1 : 0.4,
                    zIndex: isCenter ? 2 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 180, damping: 25 }}
                  className="absolute w-[320px] md:w-[420px]"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <Link href={`/one-star/showroom/vehicle/${car.id}`} className="block group">
                    <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
                      <img 
                        src={car.images[0]} 
                        alt={car.model} 
                        className={`object-cover w-full h-full transition-all duration-1000 ${isCenter ? 'grayscale-0 scale-105' : 'grayscale-[0.4]'} group-hover:scale-110`} 
                      />
                      {isCenter && (
                        <div className="absolute top-0 right-0 bg-red-600 px-4 py-2 text-[10px] font-black text-white uppercase tracking-wider">
                          New Arrival
                        </div>
                      )}
                    </div>
                    
                    <div className={`mt-8 transition-all duration-700 ${isCenter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <div className="flex justify-between items-end border-b border-zinc-100 dark:border-zinc-800 pb-2">
                        <div>
                          <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1">
                            {car.make}
                          </p>
                          <h3 className="text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter">
                            {car.model}
                          </h3>
                        </div>
                        <div className="text-right">
                           <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Asking Price</p>
                           <p className="text-2xl font-black text-zinc-900 dark:text-white">
                             USD {Number(car.price).toLocaleString()}
                           </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Minimal Decent Controls - Lowered to remove congestion */}
        <div className="mt-12 flex items-center gap-10 z-40">
          <button onClick={prev} className="text-zinc-300 hover:text-red-600 transition-colors transform active:scale-90">
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          
          <div className="flex gap-3">
            {vehicles.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'bg-red-600 w-10' : 'bg-zinc-200 dark:bg-zinc-800 w-4'}`} 
              />
            ))}
          </div>

          <button onClick={next} className="text-zinc-300 hover:text-red-600 transition-colors transform active:scale-90">
            <ChevronRight size={24} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
}