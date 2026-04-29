"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  Filter, ArrowLeft, Search, ListFilter, 
  ChevronDown, Settings2, Fuel, Users, 
  Palette, Gauge, Calendar, DollarSign 
} from "lucide-react";

export default function CategoryListing() {
  const { id } = useParams();
  const [allCars, setAllCars] = useState<any[]>([]); 
  const [filteredCars, setFilteredCars] = useState<any[]>([]); 
  const [categoryName, setCategoryName] = useState("");
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTransmission, setActiveTransmission] = useState("All");
  const [activeFuel, setActiveFuel] = useState("All");
  const [activeSeats, setActiveSeats] = useState("All");
  const [activeColor, setActiveColor] = useState("All");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [minYear, setMinYear] = useState<number>(2010);

  useEffect(() => {
    const fetchCars = async () => {
      const { data: cat } = await supabase.from("categories").select("name").eq("id", id).single();
      const { data: vehicles } = await supabase.from("vehicles").select("*").eq("category_id", id);
      if (cat) setCategoryName(cat.name);
      if (vehicles) {
        setAllCars(vehicles);
        setFilteredCars(vehicles);
      }
    };
    fetchCars();
  }, [id]);

  useEffect(() => {
    let result = allCars;
    if (searchQuery) {
      result = result.filter(car => 
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (activeTransmission !== "All") result = result.filter(car => car.transmission === activeTransmission);
    if (activeFuel !== "All") result = result.filter(car => car.fuel === activeFuel);
    if (activeSeats !== "All") result = result.filter(car => car.seats === activeSeats);
    if (activeColor !== "All") result = result.filter(car => car.ext_color === activeColor);
    
    result = result.filter(car => Number(car.price) <= maxPrice);
    result = result.filter(car => Number(car.year || 0) >= minYear);

    setFilteredCars(result);
  }, [searchQuery, activeTransmission, activeFuel, activeSeats, activeColor, maxPrice, minYear, allCars]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveTransmission("All");
    setActiveFuel("All");
    setActiveSeats("All");
    setActiveColor("All");
    setMinYear(2010);
    setMaxPrice(100000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans antialiased">
      <div className="max-w-[1440px] mx-auto p-6 lg:p-10">
        
        {/* TOP HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-6">
             <Link href="/one-star/showroom" className="p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full hover:text-red-600 transition-all shadow-sm">
                <ArrowLeft size={20} />
             </Link>
             <div>
                <h1 className="text-4xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">{categoryName} <span className="text-red-600">Inventory</span></h1>
                <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-[0.4em]">{filteredCars.length} results</p>
             </div>
          </div>
          
          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
             <span className="text-[10px] font-black uppercase pl-4 text-zinc-400">Sort</span>
             <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
             <select className="bg-transparent border-none outline-none font-bold text-[10px] uppercase pr-4 cursor-pointer text-zinc-900 dark:text-white">
                <option>Trending Units</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
             </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          
          {/* SIDEBAR FILTER PANEL */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8 shadow-sm sticky top-10">
              <div className="flex justify-between items-center mb-10 border-b border-zinc-50 dark:border-zinc-800 pb-4">
                <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-zinc-900 dark:text-white">
                   <ListFilter size={18} className="text-red-600" /> Filters
                </h4>
                <button onClick={clearFilters} className="text-[10px] font-black uppercase text-red-600 hover:text-zinc-900 transition-colors">Reset</button>
              </div>

              <div className="space-y-10">
                
                {/* Search */}
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-red-600 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search Make/Model..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800 border-none rounded-2xl font-bold text-[11px] uppercase outline-none focus:ring-2 ring-red-600/20 text-zinc-900 dark:text-white"
                  />
                </div>

                {/* Price & Year Sliders */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center"><label className="sidebar-label">Max Price</label><span className="text-[11px] font-black text-red-600">${maxPrice.toLocaleString()}</span></div>
                    <input type="range" min="0" max="150000" step="1000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="modern-range" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center"><label className="sidebar-label">Newer Than</label><span className="text-[11px] font-black text-red-600">{minYear}</span></div>
                    <input type="range" min="2000" max="2026" step="1" value={minYear} onChange={(e) => setMinYear(Number(e.target.value))} className="modern-range" />
                  </div>
                </div>

                {/* Transmission - Proper Buttons */}
                <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-2"><Settings2 size={14} className="text-zinc-400"/><label className="sidebar-label mb-0">Transmission</label></div>
                  <div className="grid grid-cols-2 gap-3">
                    {["All", "Automatic", "Manual"].map((type) => (
                      <button 
                        key={type} 
                        onClick={() => setActiveTransmission(type)} 
                        className={`filter-btn ${activeTransmission === type ? 'active-btn' : ''} ${type === "All" ? 'col-span-2' : ''}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fuel Type - Proper Buttons */}
                <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                   <div className="flex items-center gap-2 mb-2"><Fuel size={14} className="text-zinc-400"/><label className="sidebar-label mb-0">Fuel Type</label></div>
                   <div className="grid grid-cols-2 gap-3">
                    {["All", "Petrol", "Diesel", "Hybrid", "Electric"].map((fuel) => (
                      <button 
                        key={fuel} 
                        onClick={() => setActiveFuel(fuel)} 
                        className={`filter-btn ${activeFuel === fuel ? 'active-btn' : ''} ${fuel === "All" ? 'col-span-2' : ''}`}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seatings - Proper Buttons */}
                <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                   <div className="flex items-center gap-2 mb-2"><Users size={14} className="text-zinc-400"/><label className="sidebar-label mb-0">Seatings</label></div>
                   <div className="grid grid-cols-3 gap-3">
                    {["All", "2", "4", "5", "7", "8"].map((seat) => (
                      <button 
                        key={seat} 
                        onClick={() => setActiveSeats(seat)} 
                        className={`filter-btn ${activeSeats === seat ? 'active-btn' : ''} ${seat === "All" ? 'col-span-3' : ''}`}
                      >
                        {seat === "All" ? "All Seats" : `${seat} Seat`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800 pb-4">
                   <div className="flex items-center gap-2 mb-2"><Palette size={14} className="text-zinc-400"/><label className="sidebar-label mb-0">Body Colour</label></div>
                   <div className="grid grid-cols-5 gap-3">
                    {[
                      { name: "All", color: "bg-zinc-200" },
                      { name: "White", color: "bg-white border-zinc-200" },
                      { name: "Black", color: "bg-black" },
                      { name: "Silver", color: "bg-zinc-300" },
                      { name: "Red", color: "bg-red-600" },
                    ].map((c) => (
                      <button 
                        key={c.name} 
                        onClick={() => setActiveColor(c.name)} 
                        className={`w-full aspect-square rounded-xl border-2 transition-all p-1 flex items-center justify-center ${activeColor === c.name ? 'border-red-600 scale-110' : 'border-transparent hover:border-zinc-200'}`}
                      >
                         <div className={`${c.color} w-full h-full rounded-lg border border-zinc-100 dark:border-zinc-800`} />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* MAIN GRID */}
          <main className="lg:col-span-3">
            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredCars.map((car) => (
                  <Link href={`/one-star/showroom/vehicle/${car.id}`} key={car.id} className="group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-[4/3] overflow-hidden relative p-4">
                      <img src={car.image_url || car.images?.[0]} alt={car.make} className="w-full h-full object-cover rounded-[2rem] group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute top-8 left-8 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-1.5 text-[10px] font-black uppercase italic rounded-full border border-zinc-100 dark:border-zinc-800 shadow-xl">{car.year}</div>
                    </div>
                    <div className="px-8 pb-8 pt-2">
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1 italic">{car.make}</p>
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 transition-colors">{car.model}</h3>
                      <div className="mt-6 flex justify-between items-end border-t border-zinc-50 dark:border-zinc-800 pt-6">
                        <p className="text-zinc-900 dark:text-white font-black text-3xl tracking-tighter">${Number(car.price).toLocaleString()}</p>
                        <div className="flex flex-col items-end text-[10px] font-black text-zinc-400 uppercase tracking-widest leading-none gap-2">
                          <span>{car.mileage?.toLocaleString()} KM</span>
                          <span>{car.transmission}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-40 text-center bg-white dark:bg-zinc-900 rounded-[3rem] border-2 border-dashed border-zinc-100 dark:border-zinc-800">
                 <p className="text-zinc-300 font-black uppercase tracking-[0.4em]">No results match your criteria</p>
                 <button onClick={clearFilters} className="mt-8 px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white transition-all">Clear Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        .sidebar-label { @apply block text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-zinc-100 mb-4; }
        .filter-btn { @apply w-full py-4 px-4 bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 rounded-2xl text-[10px] font-black uppercase transition-all text-zinc-500 hover:border-red-600 hover:text-red-600 flex items-center justify-center text-center shadow-sm; }
        .active-btn { @apply bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white text-white dark:text-black hover:text-white dark:hover:text-black shadow-lg shadow-zinc-200 dark:shadow-none; }
        .modern-range { @apply w-full accent-red-600 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer; }
      `}</style>
    </div>
  );
}