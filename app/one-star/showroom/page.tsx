"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Star, Loader2, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/swiper-bundle.css';

export default function ShowroomPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [featured, setFeatured] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      const { data: cats } = await supabase.from("categories").select("*");
      const { data: cars } = await supabase
        .from("vehicles")
        .select("*")
        .eq("status", "In Stock")
        .order("created_at", { ascending: false })
        .limit(5);

      setCategories(cats || []);
      
      const displayCars = cars && cars.length > 0 && cars.length < 6 
        ? [...cars, ...cars, ...cars] 
        : (cars || []);
        
      setFeatured(displayCars);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading || !mounted) return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <Loader2 className="animate-spin text-red-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <section className="bg-zinc-900 text-white py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-10 ml-4">
            <Star className="text-red-600 fill-red-600" size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Trending Now</span>
          </div>

          {/* Wrapper for Slider and Pagination */}
          <div className="relative pb-20"> 
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              loop={true}
              speed={2000} 
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={{ 
                clickable: true,
                el: '.custom-pagination',
              }}
              className="orbit-container"
            >
              {featured.map((car, index) => (
                <SwiperSlide key={`${car.id}-${index}`}>
                  <Link href={`/one-star/showroom/vehicle/${car.id}`} className="group block bg-zinc-800 border border-zinc-700 hover:border-red-600 transition-all duration-700 shadow-2xl">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={car.images?.[0] || "/placeholder-car.jpg"} 
                        alt={car.make} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                      />
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start">
                         <h3 className="font-black uppercase tracking-tighter text-2xl group-hover:text-red-600 transition-colors leading-none">
                          {car.make} {car.model}
                        </h3>
                        <span className="text-[9px] bg-red-600 px-2 py-0.5 font-black uppercase italic">New</span>
                      </div>
                      <p className="text-zinc-400 font-black text-sm mt-3 tracking-widest">
                        ${car.price?.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            
            {/* MOVED OUTSIDE SWIPER: Custom pagination container */}
            <div className="custom-pagination absolute bottom-0 left-0 right-0 flex justify-center gap-2 z-50"></div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES GRID */}
<section className="max-w-7xl mx-auto py-24 px-8">
  <div className="mb-12 border-l-8 border-red-600 pl-6">
    <h2 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">
      Browse by <span className="text-red-600">Category</span>
    </h2>
    <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest mt-2">
      Precision selected global inventory
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {categories.map((cat) => (
      <Link 
        href={`/one-star/showroom/category/${cat.id}`} 
        key={cat.id}
        className="relative aspect-square overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-end group shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Category Cover Image */}
        {/* Updated Category Cover Image */}
<div className="absolute inset-0 z-0">
  <img 
    src={cat.image_url || "/placeholder-category.jpg"} 
    alt={cat.name}
    className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
  />
  {/* Gradient Overlay for Text Readability */}
  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
</div>

        {/* Content Area */}
        <div className="relative z-10 p-8">
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all text-red-600 transform translate-x-2 group-hover:translate-x-0">
            <ChevronRight size={24} />
          </div>
          
          <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2 leading-none">
            {cat.name}
          </h3>
          
          {/* Animated Red Accent Line */}
          <div className="w-8 h-1 bg-red-600 group-hover:w-full transition-all duration-500 ease-in-out"></div>
          
          <p className="mt-3 text-[9px] font-bold text-zinc-300 uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            View Inventory
          </p>
        </div>
      </Link>
    ))}
  </div>
</section>

      <style jsx global>{`
        .custom-pagination { 
          height: 10px; 
          width: 100%;
        }
        .custom-pagination .swiper-pagination-bullet { 
          background: #3f3f46 !important; 
          opacity: 1; 
          width: 10px;
          height: 10px;
          margin: 0 4px !important; 
          border-radius: 99px;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active { 
          background: #dc2626 !important; 
          width: 40px; 
          border-radius: 4px; 
        }
      `}</style>
    </div>
  );
}