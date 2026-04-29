"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Plus, X, ShieldCheck, Zap, Info, FileText } from "lucide-react";
import Link from "next/link";

export default function AddVehicleListing() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    // Things to Enter
    make: "", model: "", year: new Date().getFullYear(), price: 0, description: "", 
    category_id: "", status: "In Stock",
    
    // Specs to Enter #1-22
    ref_no: "", chassis_no: "", model_code: "", engine_size: "", location: "", 
    version_class: "", drive: "2WD", transmission: "Automatic", registration_year: "", 
    manufacture_year: "", mileage: "", steering: "Right", ext_color: "", 
    engine_code: "", fuel_type: "Petrol", seats: "", doors: "", m3: "", 
    dimension: "", weight: "", max_cap: "", sub_ref_no: ""
  });

  const [features, setFeatures] = useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [inspection, setInspection] = useState({
    body: { score: 10, desc: "" },
    engine_transmission: { score: 10, desc: "" },
    electronics: { score: 10, desc: "" },
    road_test: { score: 10, desc: "" },
    tires_brakes: { score: 10, desc: "" },
    scratches_defects: { score: 10, desc: "" }
  });

  useEffect(() => {
    const fetchCats = async () => {
      const { data } = await supabase.from("categories").select("id, name");
      if (data) setCategories(data);
    };
    fetchCats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    // 1. Image Upload Logic (Keep as is)
    const imageUrls = [];
    for (const file of imageFiles) {
      const path = `vehicles/${Date.now()}-${file.name}`;
      const { error: upErr } = await supabase.storage.from("categories").upload(path, file);
      if (!upErr) {
        const { data } = supabase.storage.from("categories").getPublicUrl(path);
        imageUrls.push(data.publicUrl);
      }
    }

    // 2. Helper to safely handle optional numbers
    const cleanInt = (val: any) => {
      const parsed = parseInt(val);
      return isNaN(parsed) ? null : parsed;
    };

    // 3. Map frontend keys to exact Database column names
    const { 
      m3, 
      manufacture_year, 
      year,
      mileage,
      registration_year,
      seats,
      doors,
      price,
      ...restOfData 
    } = formData;

    const submissionData = {
      ...restOfData,
      // Core required fields
      year: cleanInt(manufacture_year) || year || new Date().getFullYear(),
      price: parseFloat(price.toString()) || 0,

      // Optional numeric fields - Now safely handled
      mileage: cleanInt(mileage),
      registration_year: cleanInt(registration_year),
      seats: cleanInt(seats),
      doors: cleanInt(doors),
      m3_size: m3 ? parseFloat(m3) : null,

      images: imageUrls,
      features: features,
      inspection_json: inspection,
      slug: `${formData.make}-${formData.model}-${formData.ref_no || Date.now()}`
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
    };

    // 4. Insert into Database
    const { error } = await supabase.from("vehicles").insert([submissionData]);

    if (error) throw error;
    
    alert("Vehicle Listing Successfully Deployed.");
    router.push("/one-star/admin/dashboard");
  } catch (err: any) {
    alert(`Deployment Error: ${err.message}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-8 max-w-7xl mx-auto bg-zinc-50 dark:bg-black min-h-screen">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-black uppercase tracking-widest text-[10px] hover:text-red-600">
        <ArrowLeft size={14} /> Back to Hub
      </Link>

      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Deploy <span className="text-red-600">New Listing</span></h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        
        {/* --- THINGS TO ENTER --- */}
<div className="bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-8 flex items-center gap-2">
    <Info size={16} /> Things to Enter
  </h2>
  
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
    {/* 1. Name / Make - Compulsory */}
    <div className="md:col-span-2 lg:col-span-2">
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
        Name / Make <span className="text-red-600">*</span>
      </label>
      <input 
        type="text" 
        required 
        placeholder="e.g., Toyota"
        onChange={(e)=>setFormData({...formData, make: e.target.value})} 
        className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-transparent focus:border-red-600 transition-all invalid:border-red-300" 
      />
    </div>

    {/* 2. Model - Compulsory */}
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
        Model <span className="text-red-600">*</span>
      </label>
      <input 
        type="text" 
        required 
        placeholder="e.g., Land Cruiser"
        onChange={(e)=>setFormData({...formData, model: e.target.value})} 
        className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-transparent focus:border-red-600 invalid:border-red-300" 
      />
    </div>

    {/* 3. Year Make - Logic Constraints */}
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
        Year Make <span className="text-red-600">*</span>
      </label>
      <input 
        type="number" 
        required 
        min="1900" 
        max={new Date().getFullYear() + 1} 
        value={formData.year}
        onChange={(e)=>setFormData({...formData, year: parseInt(e.target.value)})} 
        className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none focus:ring-1 focus:ring-red-600" 
      />
    </div>

    {/* 4. Price - Precision Constraints */}
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
        Price (USD) <span className="text-red-600">*</span>
      </label>
      <input 
        type="number" 
        required 
        min="1" 
        step="0.01" 
        placeholder="0.00"
        onChange={(e)=>setFormData({...formData, price: parseFloat(e.target.value)})} 
        className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none focus:ring-1 focus:ring-red-600" 
      />
    </div>

    {/* 5. Status - Compulsory Selection */}
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
        Status <span className="text-red-600">*</span>
      </label>
      <select 
        required 
        value={formData.status}
        onChange={(e)=>setFormData({...formData, status: e.target.value})} 
        className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-red-600 cursor-pointer"
      >
        <option value="In Stock">In Stock</option>
        <option value="Sold Out">Sold Out</option>
        <option value="Reserved">Reserved</option>
        <option value="On Transit">On Transit</option>
      </select>
    </div>

    {/* 6. Category - Compulsory Selection */}
    <div className="md:col-span-3 lg:col-span-2">
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
        Select Category <span className="text-red-600">*</span>
      </label>
      <select 
        required 
        value={formData.category_id}
        onChange={(e)=>setFormData({...formData, category_id: e.target.value})} 
        className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-l-4 border-zinc-400 focus:border-red-600 cursor-pointer"
      >
        <option value="">Choose Inventory Category...</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
  </div>

  {/* 7. Description - Compulsory */}
  <div className="mt-6">
    <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
      Description <span className="text-red-600">*</span>
    </label>
    <textarea 
      rows={4} 
      required
      placeholder="Detailed vehicle history, condition, and highlights..."
      onChange={(e)=>setFormData({...formData, description: e.target.value})} 
      className="w-full bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none resize-none border-b-2 border-transparent focus:border-red-600" 
    />
  </div>
</div>

        {/* --- SPECS TO ENTER (1-22) --- */}
<div className="bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-8 flex items-center gap-2">
    <Zap size={16} /> Technical Specifications
  </h2>
  
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
    {/* 1. COMPULSORY BASIC FEATURES */}
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
        Transmission <span className="text-red-600">*</span>
      </label>
      <select required onChange={(e)=>setFormData({...formData, transmission: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none border-l-4 border-red-600">
        <option value="Automatic">Automatic</option>
        <option value="Manual">Manual</option>
        <option value="CVT">CVT</option>
      </select>
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
        Fuel Type <span className="text-red-600">*</span>
      </label>
      <select required onChange={(e)=>setFormData({...formData, fuel_type: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none border-l-4 border-red-600">
        <option value="Petrol">Petrol</option>
        <option value="Diesel">Diesel</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Electric">Electric</option>
      </select>
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
        Engine Size <span className="text-red-600">*</span>
      </label>
      <input type="text" required placeholder="e.g. 2000cc" onChange={(e)=>setFormData({...formData, engine_size: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none border-l-4 border-red-600" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400 font-bold">
        Milage (KM) <span className="text-red-600">*</span>
      </label>
      <input type="number" required min="0" onChange={(e)=>setFormData({...formData, mileage: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none border-l-4 border-red-600" />
    </div>

    {/* 2. OPTIONAL SPECS (Will show "-" if empty on frontend) */}
    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Ref No.</label>
      <input type="text" onChange={(e)=>setFormData({...formData, ref_no: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Chassis No.</label>
      <input type="text" onChange={(e)=>setFormData({...formData, chassis_no: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Model Code</label>
      <input type="text" onChange={(e)=>setFormData({...formData, model_code: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Location</label>
      <input type="text" onChange={(e)=>setFormData({...formData, location: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Version/Class</label>
      <input type="text" onChange={(e)=>setFormData({...formData, version_class: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Ext Color</label>
      <input type="text" onChange={(e)=>setFormData({...formData, ext_color: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Seats</label>
      <input type="number" min="1" onChange={(e)=>setFormData({...formData, seats: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Doors</label>
      <input type="number" min="1" onChange={(e)=>setFormData({...formData, doors: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">M3</label>
      <input type="text" onChange={(e)=>setFormData({...formData, m3: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Dimension</label>
      <input type="text" onChange={(e)=>setFormData({...formData, dimension: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Weight</label>
      <input type="text" onChange={(e)=>setFormData({...formData, weight: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Max Cap</label>
      <input type="text" onChange={(e)=>setFormData({...formData, max_cap: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>

    <div>
      <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Sub Ref No.</label>
      <input type="text" onChange={(e)=>setFormData({...formData, sub_ref_no: e.target.value})} className="w-full bg-zinc-100 dark:bg-zinc-800 p-3 text-xs outline-none" />
    </div>
  </div>
</div>

        {/* --- SECTION 3: FEATURES (Tag System) --- */}
        <div className="bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 flex items-center gap-2">
    <Zap size={16} /> Vehicle Features
  </h2>
  <p className="text-[9px] text-zinc-400 uppercase mb-4 font-bold tracking-widest italic">
    Add features one by one (e.g., Sunroof, Alloy Rims, Cruise Control)
  </p>
  <div className="flex gap-2 mb-4">
    <input 
      type="text" 
      value={currentFeature} 
      onChange={(e)=>setCurrentFeature(e.target.value)} 
      className="flex-1 bg-zinc-100 dark:bg-zinc-800 p-4 text-sm outline-none border-b-2 border-transparent focus:border-red-600" 
      placeholder="Type feature name..." 
    />
    <button 
      type="button" 
      onClick={() => { if(currentFeature) { setFeatures([...features, currentFeature]); setCurrentFeature(""); } }} 
      className="bg-zinc-900 text-white px-8 font-black uppercase text-[10px] tracking-widest hover:bg-red-600 transition-colors"
    >
      Add Feature
    </button>
  </div>
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
    {features.map((f, i) => (
      <span key={i} className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[10px] font-black px-3 py-2 uppercase flex items-center justify-between tracking-tighter border border-zinc-200 dark:border-zinc-700">
        {f} <X size={12} className="cursor-pointer text-red-600" onClick={() => setFeatures(features.filter((_, idx) => idx !== i))} />
      </span>
    ))}
  </div>
</div>

        {/* --- SECTION 4: IMAGE UPLOAD --- */}
        <div className="bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-6 flex items-center gap-2">
            <Upload size={16} /> Vehicle Images
          </h2>
          <input type="file" multiple accept="image/*" onChange={(e) => setImageFiles(Array.from(e.target.files || []))} className="text-xs text-zinc-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-zinc-800 file:text-white file:font-bold file:text-[10px] file:uppercase file:tracking-widest" />
        </div>

        {/* --- SECTION 5: INSPECTION REPORT --- */}
        <div className="bg-white dark:bg-zinc-900 p-8 border border-zinc-200 dark:border-zinc-800 shadow-xl">
  <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-red-600 mb-8 flex items-center gap-2">
    <ShieldCheck size={16} /> Inspection Report Details
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Object.keys(inspection).map((key) => (
      <div key={key} className="p-6 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800 relative">
        <label className="block text-[10px] font-black uppercase tracking-widest mb-4 text-zinc-500">
          {key.replace(/_/g, ' ')} <span className="text-red-600">*</span>
        </label>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-black text-zinc-400 uppercase">Score (1-10)</span>
            <input 
              type="number" min="1" max="10" required
              value={inspection[key as keyof typeof inspection].score}
              onChange={(e) => setInspection({
                ...inspection, 
                [key]: {...inspection[key as keyof typeof inspection], score: parseInt(e.target.value)}
              })}
              className="w-full bg-white dark:bg-zinc-900 p-2 text-center font-black text-red-600 border border-zinc-200 dark:border-zinc-700 outline-none focus:ring-1 focus:ring-red-600" 
            />
          </div>
          <textarea 
            placeholder="Detailed condition notes..."
            required
            value={inspection[key as keyof typeof inspection].desc}
            onChange={(e) => setInspection({
              ...inspection, 
              [key]: {...inspection[key as keyof typeof inspection], desc: e.target.value}
            })}
            className="w-full bg-white dark:bg-zinc-900 p-3 text-xs outline-none border border-zinc-200 dark:border-zinc-700 h-20 resize-none"
          />
        </div>
      </div>
    ))}
  </div>
</div>

        <button disabled={loading} className="w-full bg-red-600 text-white font-black py-6 uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:bg-zinc-950 transition-colors shadow-2xl">
          {loading ? "Processing..." : <Save size={18} />} Authorized Deployment to Showroom
        </button>
      </form>
    </div>
  );
}