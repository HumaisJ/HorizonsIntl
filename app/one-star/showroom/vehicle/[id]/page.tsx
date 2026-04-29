"use client";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { 
  ShieldCheck, Zap, Gauge, Calendar, Droplets, Info, 
  Loader2, CheckCircle2, MessageSquare, Ship, CreditCard, 
  Settings2, Truck, Fuel, MapPin, Globe, RefreshCcw,
  Hash, PackageCheck, Disc, ChevronDown, Activity, 
  Search, ExternalLink
} from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// --- DATA: SUPPORTED CURRENCIES ---
const SUPPORTED_CURRENCIES = ["USD", "JPY", "EUR", "GBP", "AED", "KES", "PKR", "CAD", "AUD", "ZAR", "TZS"];

export default function VehicleDetails() {
  const { id } = useParams();

  // --- COMPONENT STATE ---
  const [car, setCar] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState("");
  const [rates, setRates] = useState<any>({});
  const [targetCurrency, setTargetCurrency] = useState("USD");
  
  // --- FORM STATE ---
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", country: "", city: "", address: "" });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Core Vehicle Data
      const { data: vehicle } = await supabase.from("vehicles").select("*").eq("id", id).single();
      if (vehicle) {
        setCar(vehicle);
        setActiveImg(vehicle.images?.[0] || "");
        const { data: related } = await supabase.from("vehicles").select("*").eq("category_id", vehicle.category_id).neq("id", id).limit(10);
        setSuggestions(related || []);
      }

      // 2. Fetch Live FX Rates
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        if (data.rates) setRates(data.rates);
      } catch (e) { console.error("FX API Error", e); }
      
      setLoading(false);
    };
    fetchData();
  }, [id]);

  // --- LOGIC: CURRENCY CONVERSION ---
  const convertedPrice = useMemo(() => {
    if (!car || !rates[targetCurrency]) return null;
    return (Number(car.price) * rates[targetCurrency]).toLocaleString(undefined, { maximumFractionDigits: 0 });
  }, [car, targetCurrency, rates]);

  // --- LOGIC: AUTOMATED PRO-FORMA SUBMISSION ---
 const handleQuoteSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setFormStatus('sending');

  const payload = {
    ...formData,
    vehicleName: `${car.make} ${car.model}`,
    vehicleId: car.ref_no,
    priceFob: car.price,
  };

  try {
    const response = await fetch('/api/send-quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setFormStatus('success');
      
      // FIX: Resetting the form state after success
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        country: "", 
        city: "", 
        address: "" 
      });

      // Clear the "Success" message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    } else {
      setFormStatus('idle');
    }
  } catch (error) {
    console.error("Submission error:", error);
    setFormStatus('idle');
  }
};

  const renderVal = (v: any) => (v === null || v === undefined || v === "" ? "-" : v);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-zinc-100"><Loader2 className="animate-spin text-red-600" size={40} /></div>;
  if (!car) return <div className="p-20 text-center font-bold text-zinc-900 uppercase">Listing Not Found</div>;

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900 py-12 px-4 md:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. HERO CARD: SYMMETRICAL BRANDING & STATUS */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 border-r border-zinc-200">
            <div className="aspect-[16/10] bg-zinc-50 rounded-lg overflow-hidden border border-zinc-200 relative">
              <img src={activeImg} className="w-full h-full object-contain" alt={car.model} />
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg flex items-center gap-2 ${
                  car.status === 'Sold' ? 'bg-red-100 text-red-700' : car.status === 'Reserved' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${car.status === 'Sold' ? 'bg-red-600' : car.status === 'Reserved' ? 'bg-amber-600' : 'bg-green-600 animate-pulse'}`} />
                  {car.status || 'In Stock'}
                </span>
              </div>
            </div>
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {car.images?.map((img: string, i: number) => (
                <button key={i} onClick={() => setActiveImg(img)} className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 transition-all ${activeImg === img ? 'border-red-600 scale-95 shadow-md' : 'border-zinc-100 opacity-60 hover:opacity-100'}`}>
                  <img src={img} className="w-full h-full object-cover rounded-md" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-10 lg:p-14 flex flex-col justify-between bg-zinc-50/20">
            <div className="space-y-10">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-[11px]">{car.make}</p>
                  <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-zinc-900">{car.model}</h1>
                  <p className="text-zinc-400 font-bold text-[10px] tracking-widest uppercase flex items-center gap-1 mt-2"><Hash size={12}/> {car.ref_no}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">FOB Price</p>
                  <p className="text-5xl font-black text-red-600 tracking-tighter leading-none">USD {Number(car.price).toLocaleString()}</p>
                </div>
              </div>

              {/* The Power Four Highlights */}
              <div className="grid grid-cols-2 gap-4 py-8 border-y border-zinc-200">
                {[
                  { i: Calendar, l: "Year", v: car.year },
                  { i: Gauge, l: "Mileage", v: car.mileage?.toLocaleString() },
                  { i: Zap, l: "Engine", v: car.engine_size },
                  { i: Fuel, l: "Fuel", v: car.fuel }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white p-4 border border-zinc-100 rounded-lg shadow-sm">
                    <item.i size={18} className="text-red-600"/>
                    <div><p className="text-[8px] font-black text-zinc-400 uppercase">Highlight</p><p className="text-sm font-black text-zinc-900">{item.v}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-10">
              <a href="#quote" className="w-full bg-zinc-900 text-white font-black py-5 rounded-xl text-[11px] uppercase tracking-[0.4em] text-center shadow-lg hover:bg-red-600 transition-all">Request Quote</a>
              <a href="#converter" className="w-full border-2 border-zinc-200 text-zinc-900 font-black py-5 rounded-xl text-[11px] uppercase tracking-[0.4em] text-center hover:bg-white transition-all">Currency Tool</a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* 2. OVERVIEW (Under Gallery) */}
            <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-black text-zinc-900 mb-6 flex items-center gap-3"><Info className="text-red-600" size={20}/> Vehicle Overview</h2>
              <p className="text-zinc-600 text-base leading-relaxed font-medium italic">
                {car.description || `This high-performance ${car.year} ${car.make} ${car.model} is a verified premium unit.`}
              </p>
            </div>

            {/* 3. TECHNICAL DATA CARD (22 Features) */}
            <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-sm">
              <h2 className="text-lg font-black text-zinc-900 mb-8 flex items-center gap-3"><Settings2 className="text-red-600" size={20}/> Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-px">
                {[
                  { l: "Manufacturer", v: car.make }, { l: "Model", v: car.model }, { l: "Year", v: car.year },
                  { l: "Stock ID", v: car.ref_no }, { l: "Chassis No", v: car.chassis_no }, { l: "Engine Size", v: car.engine_size },
                  { l: "Transmission", v: car.transmission }, { l: "Fuel", v: car.fuel }, { l: "Mileage", v: car.mileage },
                  { l: "Drive System", v: car.drive }, { l: "Ext. Color", v: car.ext_color }, { l: "Int. Color", v: car.int_color },
                  { l: "Steering", v: car.steering }, { l: "Seats / Doors", v: `${car.seats} / ${car.doors}` }, { l: "Weight", v: car.weight },
                  { l: "Model Code", v: car.model_code }, { l: "Engine Code", v: car.engine_code }, { l: "Version", v: car.version_class },
                  { l: "Registration", v: car.registration_year }, { l: "Location", v: car.location }, { l: "Dimension", v: car.dimension }, { l: "Max Cap", v: car.max_cap }
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-4 border-b border-zinc-50 group hover:bg-zinc-50 transition-colors px-2">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{spec.l}</span>
                    <span className="text-[11px] font-black text-zinc-900 uppercase">{renderVal(spec.v)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FEATURE KEYWORDS (Restored) */}
            <div className="bg-white border border-zinc-400 rounded-xl p-8 shadow-sm">
              <h3 className="text-sm font-black text-zinc-900 mb-6 uppercase tracking-widest">Features</h3>
              <div className="flex flex-wrap gap-3">
                {car.features?.map((f: string, i: number) => (
                  <span key={i} className="px-5 py-2 bg-zinc-100 text-zinc-900 text-[10px] font-black uppercase border border-zinc-200 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-red-600" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            {/* INSPECTION REPORT (Restored) */}
            <div className="bg-zinc-900 text-white rounded-xl p-8 shadow-xl relative overflow-hidden border-b-8 border-red-600">
               <Disc className="absolute -right-12 -bottom-12 text-white/5 rotate-12" size={300} />
               <h3 className="text-sm font-black uppercase tracking-widest text-red-500 mb-8 border-b border-zinc-800 pb-4 relative z-10 text-center">Inspection Report</h3>
               <div className="space-y-6 relative z-10">
                 {car.inspection_json && Object.entries(car.inspection_json).map(([key, val]: any) => (
                   <div key={key}>
                     <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                       <span className="text-zinc-100">{key.replace(/_/g, ' ')}</span>
                       <span className="text-red-500">{val.score}/10</span>
                     </div>
                     <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                       <div className="h-full bg-red-700 transition-all duration-1000" style={{ width: `${val.score * 10}%` }} />
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* PURCHASE FLOW */}
            <div className="bg-white border border-red-600 rounded-xl p-8 shadow-sm">
              <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-red-600 mb-8 border-b border-zinc-100 pb-4">Purchase Flow</h3>
              <div className="space-y-4">
                {[
                  { i: MessageSquare, t: "Official Enquiry", d: "Confirm CIF Destination" },
                  { i: CreditCard, t: "Secure Payment", d: "Pay via Bank TT / Swift" },
                  { i: Ship, t: "Vessel Dispatch", d: "Export tracking & BL" },
                  { i: Truck, t: "Arrival Dispatch", d: "Ready for collection" }
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-5 items-center p-5 bg-zinc-50 border border-zinc-100 rounded-xl group hover:border-red-600/30 transition-all">
                    <step.i className="text-red-600" size={22} />
                    <div><h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 leading-none mb-1">{step.t}</h4><p className="text-[9px] text-zinc-400 font-bold uppercase">{step.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. CURRENCY CONVERTER & REQUEST QUOTE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section id="converter" className="bg-white border border-zinc-200 rounded-xl p-10 shadow-sm">
            <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 mb-10 flex items-center gap-4">
              <Globe className="text-red-600" size={24}/> Currency <span className="text-red-600">Converter</span>
            </h2>
            <div className="space-y-8">
              <div className="relative group">
                <select className="w-full bg-zinc-100 border border-zinc-200 p-6 rounded-2xl font-black text-zinc-900 appearance-none outline-none focus:border-red-600 transition-all" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
                  {SUPPORTED_CURRENCIES.map(c => <option key={c} value={c}>{c} - International Rate</option>)}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400" size={18}/>
              </div>
              <div className="bg-zinc-700 text-white p-12 rounded-3xl relative overflow-hidden shadow-2xl">
                 <Globe className="absolute -right-10 -bottom-10 text-white/5" size={250} />
                 <div className="relative z-10"><p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-2"><RefreshCcw size={12}/> Global Exchange Rates</p>
                    <div className="flex flex-col gap-2">
                       <span className="text-6xl font-black tracking-tighter text-white">{targetCurrency} {convertedPrice}</span>
                       <span className="text-[10px] font-bold text-green-500 uppercase">Rate: 1 USD = {rates[targetCurrency]?.toFixed(4)} {targetCurrency}</span>
                    </div>
                 </div>
              </div>
            </div>
          </section>

          <section id="quote" className="bg-white border-2 border-zinc-900 rounded-xl p-10 shadow-xl relative overflow-hidden">
  <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 mb-8">Request a <span className="text-red-600">Quote</span></h2>
  <form onSubmit={handleQuoteSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* ADDED value={} TO ALL INPUTS TO ENABLE STATE RESET */}
    <input 
      required 
      className="q-input" 
      placeholder="Full Name" 
      value={formData.name|| ""} // Bound to state
      onChange={(e) => setFormData({...formData, name: e.target.value})} 
    />
    <input 
      required 
      className="q-input" 
      type="email" 
      placeholder="Email Address" 
      value={formData.email} // Bound to state
      onChange={(e) => setFormData({...formData, email: e.target.value})} 
    />
    <input 
      required 
      className="q-input" 
      placeholder="Telephone No" 
      value={formData.phone} // Bound to state
      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
    />
    <input 
      required 
      className="q-input" 
      placeholder="Country" 
      value={formData.country} // Bound to state
      onChange={(e) => setFormData({...formData, country: e.target.value})} 
    />
    <input 
      required 
      className="q-input" 
      placeholder="City / Port" 
      value={formData.city} // Bound to state
      onChange={(e) => setFormData({...formData, city: e.target.value})} 
    />
    <textarea 
      className="q-input h-24 pt-4 resize-none md:col-span-2" 
      placeholder="Full Street Address" 
      value={formData.address} // Bound to state
      onChange={(e) => setFormData({...formData, address: e.target.value})} 
    />
    
    <button className="md:col-span-2 bg-red-600 text-white font-black py-6 rounded-xl text-[11px] uppercase tracking-[0.5em] hover:bg-zinc-900 transition-all shadow-2xl">
      {formStatus === 'sending' ? <Loader2 className="animate-spin mx-auto"/> : "Submit Quote Request"}
    </button>
    
    {formStatus === 'success' && <p className="md:col-span-2 text-green-600 text-center font-black animate-pulse">Our Sales Team will contact soon.</p>}
  </form>
</section>
        </div>

        {/* 5. REFINED RECOMMENDATION ORBIT */}
<section className="bg-white border border-zinc-200 rounded-xl p-12 shadow-sm overflow-hidden">
  <h2 className="text-3xl font-black uppercase tracking-tighter mb-16 flex items-center gap-4">
    <div className="w-16 h-1.5 bg-red-600" /> More <span className="text-red-600">Inventory</span>
  </h2>
  
  <Swiper
    modules={[Autoplay, Pagination]}
    // ORBIT SETTINGS: Flat horizontal loop
    spaceBetween={30}
    slidesPerView={1}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 }
    }}
    loop={true}
    speed={2000} // Smooth rotation speed
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    className="pb-24 recommendation-orbit"
  >
    {suggestions.map((s) => (
      <SwiperSlide key={s.id}>
        {/* REMOVED: motion.div hover animations */}
        <div className="group bg-zinc-50 border border-zinc-100 p-6 rounded-3xl transition-colors hover:border-red-600/30">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 mb-6 bg-white relative">
            <img 
              src={s.images?.[0]} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt={s.model} 
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] italic">{s.make}</p>
            <h3 className="text-lg font-black uppercase tracking-tight truncate text-zinc-900 group-hover:text-red-600 transition-colors leading-none">
              {s.model}
            </h3>
            
            <div className="flex justify-between items-end pt-4 border-t border-zinc-200">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{s.year}</span>
              <span className="text-2xl font-black text-zinc-900 tracking-tighter italic">
                ${Number(s.price).toLocaleString()}
              </span>
            </div>
          </div>
          
          <Link 
            href={`/one-star/showroom/vehicle/${s.id}`} 
            className="mt-8 w-full bg-white border-2 border-zinc-200 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-center block hover:bg-zinc-900 hover:text-white transition-all"
          >
            Details
          </Link>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>

        <div className="text-center py-20 border-t border-zinc-200"><p className="text-[10px] font-black text-zinc-400 uppercase tracking-[1em]">One Star Trading Ltd.</p></div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .q-input { @apply w-full bg-zinc-100 border-b-2 border-zinc-200 p-5 outline-none focus:border-red-600 transition-all text-xs font-black uppercase tracking-widest text-zinc-900 placeholder:text-zinc-400; }
        .recommendation-orbit .swiper-pagination-bullet-active { background: #dc2626 !important; width: 60px; border-radius: 99px; }
      `}</style>
    </div>
  );
}