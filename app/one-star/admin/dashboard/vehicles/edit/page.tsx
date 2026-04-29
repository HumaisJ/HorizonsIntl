"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Edit2, X, Info, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function EditVehicle() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  
  const [formData, setFormData] = useState<any>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const [inspection, setInspection] = useState<any>(null);

  useEffect(() => {
    fetchVehicles();
    fetchCategories();
  }, []);

  const fetchVehicles = async () => {
    const { data } = await supabase.from("vehicles").select("id, make, model, ref_no, year").order("created_at", { ascending: false });
    if (data) setVehicles(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from("categories").select("id, name");
    if (data) setCategories(data);
  };

  const loadVehicleForEdit = async (id: string) => {
    setLoading(true);
    const { data } = await supabase.from("vehicles").select("*").eq("id", id).single();
    if (data) {
      setFormData({
        ...data,
        manufacture_year: data.year, 
        m3: data.m3_size,            
      });
      setFeatures(data.features || []);
      setInspection(data.inspection_json || {
        "Body_Chassis": { score: 10, desc: "Excellent" },
        "Engine_Transmission": { score: 10, desc: "Excellent" },
        "Electronics": { score: 10, desc: "Excellent" },
        "Interior": { score: 10, desc: "Excellent" },
        "Road_Test": { score: 10, desc: "Excellent" }
      });
      setSelectedId(id);
    }
    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const cleanInt = (val: any) => {
        const parsed = parseInt(val);
        return isNaN(parsed) ? null : parsed;
      };

      // Destructure to separate DB-only fields and mapped fields
      const { m3, manufacture_year, year, mileage, registration_year, seats, doors, price, id, created_at, slug, images, ...restOfData } = formData;

      const submissionData = {
        ...restOfData,
        year: cleanInt(manufacture_year) || year,
        price: parseFloat(price.toString()) || 0,
        mileage: cleanInt(mileage),
        registration_year: cleanInt(registration_year),
        seats: cleanInt(seats),
        doors: cleanInt(doors),
        m3_size: m3 ? parseFloat(m3) : null,
        features: features,
        inspection_json: inspection,
      };

      const { error } = await supabase.from("vehicles").update(submissionData).eq("id", selectedId);

      if (error) throw error;
      alert("Vehicle Listing Updated Successfully.");
      setSelectedId(null);
      fetchVehicles();
    } catch (err: any) {
      alert(`Update Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedId) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-black uppercase tracking-widest text-[10px]">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-12">Edit <span className="text-red-600">Inventory</span></h1>
        <div className="space-y-4">
          {vehicles.map((v) => (
            <div key={v.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 flex justify-between items-center shadow-sm hover:border-red-600 transition-all">
              <div>
                <h3 className="font-black uppercase tracking-widest text-sm">{v.make} {v.model}</h3>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Ref: {v.ref_no || "N/A"} | Year: {v.year}</p>
              </div>
              <button onClick={() => loadVehicleForEdit(v.id)} className="p-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-600 hover:text-white transition-all"><Edit2 size={18} /></button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <button onClick={() => setSelectedId(null)} className="flex items-center gap-2 text-zinc-500 mb-8 font-black uppercase tracking-widest text-[10px] hover:text-red-600">
        <X size={14} /> Cancel Editing
      </button>

      <form onSubmit={handleUpdate} className="space-y-10 pb-20">
        
        {/* SECTION 1: CORE DETAILS */}
        <div className="bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-8 flex items-center gap-2 italic underline">Editing: {formData.make} {formData.model}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="md:col-span-2"><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Make</label>
              <input type="text" required value={formData.make} onChange={(e)=>setFormData({...formData, make: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-red-600" />
            </div>
            <div><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Model</label>
              <input type="text" required value={formData.model} onChange={(e)=>setFormData({...formData, model: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
            </div>
            <div><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Price (USD)</label>
              <input type="number" required value={formData.price} onChange={(e)=>setFormData({...formData, price: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" />
            </div>
            <div><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Status</label>
              <select value={formData.status} onChange={(e)=>setFormData({...formData, status: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-red-600 font-bold">
                <option value="In Stock">In Stock</option><option value="Sold">Sold</option><option value="Reserved">Reserved</option><option value="On Transit">On Transit</option>
              </select>
            </div>
            <div><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Category</label>
              <select value={formData.category_id} onChange={(e)=>setFormData({...formData, category_id: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none">
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 2: TECHNICAL SPECIFICATIONS (The full grid) */}
        <div className="bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-8 flex items-center gap-2"><Zap size={16} /> Technical Specifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { label: "Ref No", key: "ref_no" }, { label: "Chassis No", key: "chassis_no" },
              { label: "Model Code", key: "model_code" }, { label: "Engine Size", key: "engine_size" },
              { label: "Location", key: "location" }, { label: "Version/Class", key: "version_class" },
              { label: "Engine Code", key: "engine_code" }, { label: "Ext Color", key: "ext_color" },
              { label: "Dimension", key: "dimension" }, { label: "Weight", key: "weight" },
              { label: "Max Cap", key: "max_cap" }, { label: "Sub Ref No", key: "sub_ref_no" },
              { label: "Transmission", key: "transmission" }, { label: "Fuel Type", key: "fuel" },
              { label: "Steering", key: "steering" }, { label: "Drive Type", key: "drive" }
            ].map((spec) => (
              <div key={spec.key}>
                <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">{spec.label}</label>
                <input type="text" value={formData[spec.key] || ""} onChange={(e)=>setFormData({...formData, [spec.key]: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
              </div>
            ))}
            
            {/* Numeric/Special Mapped Fields */}
            <div><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Manufacture Year</label>
              <input type="number" value={formData.manufacture_year || ""} onChange={(e)=>setFormData({...formData, manufacture_year: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
            </div>
            <div><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Reg. Year</label>
              <input type="number" value={formData.registration_year || ""} onChange={(e)=>setFormData({...formData, registration_year: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
            </div>
            <div><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Mileage</label>
              <input type="number" value={formData.mileage || ""} onChange={(e)=>setFormData({...formData, mileage: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
            </div>
            <div><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">M3 Size</label>
              <input type="number" step="0.01" value={formData.m3 || ""} onChange={(e)=>setFormData({...formData, m3: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none border-b border-red-600/30" />
            </div>
            <div><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Seats</label>
              <input type="number" value={formData.seats || ""} onChange={(e)=>setFormData({...formData, seats: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
            </div>
            <div><label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Doors</label>
              <input type="number" value={formData.doors || ""} onChange={(e)=>setFormData({...formData, doors: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
            </div>
          </div>
        </div>

        {/* SECTION 3: FEATURES */}
        <div className="bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 flex items-center gap-2"><Zap size={16} /> Features</h2>
          <div className="flex gap-2 mb-4">
            <input type="text" value={currentFeature} onChange={(e)=>setCurrentFeature(e.target.value)} className="flex-1 bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none" placeholder="Add feature (e.g. Sunroof)..." />
            <button type="button" onClick={() => { if(currentFeature) { setFeatures([...features, currentFeature]); setCurrentFeature(""); } }} className="bg-zinc-900 text-white px-8 font-black uppercase text-[10px]">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {features.map((f, i) => (
              <span key={i} className="bg-red-600 text-white text-[9px] font-black px-3 py-1.5 uppercase flex items-center gap-2">{f} <X size={12} className="cursor-pointer" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} /></span>
            ))}
          </div>
        </div>

        {/* SECTION 4: INSPECTION */}
        <div className="bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-8 flex items-center gap-2"><ShieldCheck size={16} /> Inspection Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.keys(inspection || {}).map((key) => (
              <div key={key} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
                <label className="block text-[10px] font-black uppercase tracking-widest mb-3 text-zinc-500">{key.replace(/_/g, ' ')}</label>
                <div className="flex gap-4 items-center">
                  <input type="number" min="1" max="10" value={inspection[key].score} onChange={(e) => setInspection({...inspection, [key]: {...inspection[key], score: parseInt(e.target.value)}})} className="w-16 bg-white dark:bg-zinc-900 p-2 text-center font-bold text-red-600 border border-zinc-200 outline-none" />
                  <input type="text" value={inspection[key].desc} onChange={(e) => setInspection({...inspection, [key]: {...inspection[key], desc: e.target.value}})} className="flex-1 bg-white dark:bg-zinc-900 p-2 text-xs border border-zinc-200 outline-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button disabled={loading} className="w-full bg-red-600 text-white font-black py-6 uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-zinc-950 transition-colors shadow-2xl">
          {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />} Finalize Changes
        </button>
      </form>
    </div>
  );
}