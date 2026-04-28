"use client"
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { CheckCircle, AlertCircle, Ship, Calculator, Fuel, Gauge, Zap, Cog, ArrowLeft, Info, FileText } from 'lucide-react';
import Link from 'next/link';

export default function CarDetailPage({ params }: { params: any }) {
  const [car, setCar] = useState<any>(null);
  const [mainImage, setMainImage] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    async function loadData() {
      const resolvedParams = await params;
      const { data } = await supabase.from('vehicles').select('*').eq('slug', resolvedParams.slug).single();
      if (data) {
        setCar(data);
        setMainImage(data.images[0]);
      } else {
        notFound();
      }
    }
    loadData();
  }, [params]);

  if (!car) return <div className="p-20 text-center font-black">LOADING VEHICLE...</div>;

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <Link href={`/one-star/${car.category_id}`} className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#D32F2F] transition-colors mb-8">
          <ArrowLeft size={14} /> Back to Inventory
        </Link>

        {/* MAIN GRID: Responsive Stacking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SECTION: Gallery & Primary Details */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. GALLERY */}
            <section className="space-y-4">
              <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 dark:bg-slate-800 border dark:border-slate-800">
                <img src={mainImage} className="w-full h-full object-cover transition-all duration-500" alt="Car" />
              </div>
              <div className="grid grid-cols-5 gap-3">
                {car.images.map((img: string, i: number) => (
                  <button key={i} onClick={() => setMainImage(img)} className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${mainImage === img ? 'border-[#D32F2F]' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                    <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                  </button>
                ))}
              </div>
            </section>

            {/* 2. DESCRIPTION (Directly Under Images) */}
            <section className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
                <FileText className="text-[#D32F2F]" size={18}/> Description
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm whitespace-pre-wrap">
                {car.description || "No specific seller notes provided."}
              </p>
            </section>

            {/* 3. SPECS & FEATURES (Side by Side on Large Screens) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Technical Specs */}
              <div className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-[#2DA7D7]">
                  <Info size={16}/> Technical Specs
                </h4>
                <div className="grid grid-cols-2 gap-y-6">
                  <DetailItem icon={<Gauge size={14}/>} label="Mileage" value={`${car.mileage?.toLocaleString()} KM`} />
                  <DetailItem icon={<Zap size={14}/>} label="Engine" value={car.engine_size} />
                  <DetailItem icon={<Fuel size={14}/>} label="Fuel" value={car.fuel_type} />
                  <DetailItem icon={<Cog size={14}/>} label="Trans" value={car.transmission} />
                </div>
              </div>

              {/* Features List */}
              <div className="bg-slate-50 dark:bg-slate-800/30 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-[#D32F2F]">
                  <CheckCircle size={16}/> Key Features
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {['Airbag', 'ABS', 'Navigation', 'Sun Roof', 'Push Start', 'Reverse Camera'].map(f => (
                    <div key={f} className={`px-3 py-2 rounded-lg text-[8px] font-bold uppercase tracking-widest border ${car.features?.includes(f) ? 'bg-[#D32F2F]/10 border-[#D32F2F] text-[#D32F2F]' : 'text-slate-300 border-slate-100 dark:border-slate-700 opacity-30'}`}>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 4. INSPECTION REPORT (Full Width under Specs/Features) */}
            <section className="bg-[#0F0F0F] p-10 rounded-[2.5rem] text-white">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-8">Full <span className="text-[#2DA7D7]">Inspection</span> Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(car.inspection_json).map(([key, value]: any) => (
                  <div key={key} className="bg-white/5 p-4 rounded-xl flex justify-between items-center border border-white/5">
                    <span className="font-bold uppercase text-[9px] tracking-widest text-slate-400">{key}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-slate-500">{value.checks} Checks</span>
                      {value.status === 'passed' ? <CheckCircle className="text-green-500" size={14}/> : <AlertCircle className="text-[#F5A623]" size={14}/>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SECTION: Pricing & Quote (Stacks under Gallery on Mobile) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24 order-last lg:order-none">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
              <div className="mb-8">
                <h1 className="text-3xl font-black tracking-tighter mb-1">{car.year} {car.make}</h1>
                <p className="text-[#2DA7D7] font-bold text-md uppercase tracking-widest">{car.model}</p>
                <div className="h-1 w-10 bg-[#D32F2F] mt-4" />
              </div>
              
              <div className="space-y-1 mb-8">
                <p className="text-[9px] font-bold uppercase text-slate-400 tracking-[0.2em]">Vehicle Price (FOB)</p>
                <p className="text-4xl font-black text-[#D32F2F] tracking-tighter">${car.price.toLocaleString()}</p>
              </div>

              <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-white/5">
                <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase text-slate-400 tracking-widest flex items-center gap-2"><Ship size={12} className="text-[#2DA7D7]"/> Port Destination</label>
                  <select onChange={(e) => setShippingCost(parseInt(e.target.value))} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 p-4 rounded-xl text-xs font-bold outline-none focus:border-[#D32F2F]">
                    <option value="0">Select Port</option>
                    <option value="1200">Karachi (RORO)</option>
                    <option value="2500">Maseru (Container)</option>
                    <option value="1800">Durban (RORO)</option>
                  </select>
                </div>

                <div className="flex justify-between items-end">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Est. Final</span>
                  <span className="text-2xl font-black text-[#F5A623]">${(car.price + shippingCost).toLocaleString()}</span>
                </div>

                <button className="w-full bg-[#D32F2F] text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#2DA7D7] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#D32F2F]/20">
                  Request Quote <Calculator size={16}/>
                </button>
              </div>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                Global Logistics Managed by <br /> One Star Trading Japan
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 text-[#D32F2F]">{icon} <span className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{label}</span></div>
      <p className="font-bold text-xs text-slate-800 dark:text-white">{value || 'N/A'}</p>
    </div>
  );
}