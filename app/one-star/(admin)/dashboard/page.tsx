"use client"
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, Car, Settings, UploadCloud } from 'lucide-react';

const AVAILABLE_FEATURES = ['Airbag', 'ABS', 'Navigation', 'Alloy Wheels', 'Leather Seats', 'Sun Roof', 'Push Start', 'Reverse Camera'];

export default function AdminDashboard() {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [inspection, setInspection] = useState({
    body: { status: 'passed', checks: 0 },
    engine: { status: 'passed', checks: 0 },
    electronics: { status: 'passed', checks: 0 },
    road_test: { status: 'passed', checks: 0 },
    tires: { status: 'passed', checks: 0 }
  });

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('categories').select('*');
      if (data) setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // --- HARD VALIDATION CHECKS ---
    const year = parseInt(formData.get('year') as string);
    const price = parseFloat(formData.get('price') as string);
    const mileage = parseInt(formData.get('mileage') as string);
    const currentYear = new Date().getFullYear();
    
    if (year < 1980 || year > currentYear + 1) {
      alert(`Invalid Year. Must be between 1980 and ${currentYear + 1}.`);
      return;
    }
    if (price <= 0) { alert("FOB Price must be a positive number."); return; }
    if (mileage < 0) { alert("Mileage cannot be negative."); return; }
    if (!files || files.length === 0) { alert("Vehicle requires at least one image."); return; }

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < (files?.length || 0); i++) {
        const file = files![i];
        const fileName = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from('vehicle-images').upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('vehicle-images').getPublicUrl(fileName);
        uploadedUrls.push(urlData.publicUrl);
      }

      const carData = {
        make: formData.get('make'),
        model: formData.get('model'),
        year,
        price,
        category_id: formData.get('category_id'),
        status: formData.get('status'),
        mileage,
        fuel_type: formData.get('fuel_type'),
        transmission: formData.get('transmission'),
        engine_size: formData.get('engine_size'),
        images: uploadedUrls,
        features: selectedFeatures,
        inspection_json: inspection,
        slug: `${year}-${formData.get('make')}-${formData.get('model')}-${Date.now()}`.toLowerCase().replace(/ /g, '-'),
        description: formData.get('description')
      };

      const { error: dbError } = await supabase.from('vehicles').insert([carData]);
      if (dbError) throw dbError;

      alert("Professional Listing Published Successfully!");
      window.location.reload(); 
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-12 bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl my-20 border border-slate-100 dark:border-slate-800">
      <header className="mb-12 border-l-4 border-[#D32F2F] pl-6 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tighter">Inventory <span className="text-[#2DA7D7]">CMS</span></h2>
          <p className="text-[#7A7A7A] text-[10px] font-bold uppercase tracking-[0.3em] mt-2">One Star Trading Inventory Management</p>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Small Team Security</p>
           <p className="text-[9px] text-green-500 font-bold uppercase tracking-widest">Admin: Dr. Noha Hazzazi</p>
        </div>
      </header>

      <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-8">
          <SectionHeader icon={<Car size={16}/>} title="Identity" />
          <input name="make" placeholder="Make" className="w-full p-4 rounded-xl border bg-slate-50 dark:bg-slate-800" required />
          <input name="model" placeholder="Model" className="w-full p-4 rounded-xl border bg-slate-50 dark:bg-slate-800" required />
          <div className="grid grid-cols-2 gap-4">
            <input name="year" type="number" min="1980" max="2027" placeholder="Year" className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-800" required />
            <input name="price" type="number" min="1" step="0.01" placeholder="Price ($)" className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-800" required />
          </div>
          <textarea name="description" placeholder="Description..." className="w-full p-4 rounded-xl border bg-slate-50 dark:bg-slate-800 h-32" />
          <div className="border-2 border-dashed rounded-3xl p-8 text-center hover:border-[#D32F2F] transition-colors relative">
            <UploadCloud className="mx-auto mb-2 text-slate-300" />
            <input type="file" multiple onChange={(e) => setFiles(e.target.files)} className="absolute inset-0 opacity-0 cursor-pointer" />
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{files ? `${files.length} selected` : 'Select Assets'}</p>
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeader icon={<Settings size={16}/>} title="Specifications" />
          <select name="category_id" className="w-full p-4 rounded-xl border bg-slate-50 dark:bg-slate-800" required>
            <option value="">Category</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-4">
            <select name="transmission" className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-800"><option>Automatic</option><option>Manual</option></select>
            <select name="fuel_type" className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-800"><option>Petrol</option><option>Diesel</option><option>Hybrid</option><option>Electric</option></select>
          </div>
          <input name="engine_size" placeholder="Engine (e.g. 1.5L)" className="w-full p-4 rounded-xl border bg-slate-50 dark:bg-slate-800" />
          <input name="mileage" type="number" min="0" placeholder="Mileage (KM)" className="w-full p-4 rounded-xl border bg-slate-50 dark:bg-slate-800" />
          <div className="grid grid-cols-2 gap-2">
            {AVAILABLE_FEATURES.map(f => (
              <button type="button" key={f} onClick={() => setSelectedFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])} 
                className={`p-3 rounded-lg text-[9px] font-bold uppercase border transition-all ${selectedFeatures.includes(f) ? 'bg-[#D32F2F] text-white border-[#D32F2F]' : 'bg-transparent text-slate-400 border-slate-100'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <SectionHeader icon={<ShieldCheck size={16}/>} title="Inspection" />
          {Object.keys(inspection).map((key) => (
            <div key={key} className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-4 text-[#2DA7D7]">{key}</p>
              <div className="flex gap-4">
                <input type="number" min="0" placeholder="Passed" className="w-20 p-2 rounded-lg border text-xs"
                  onChange={(e) => setInspection(prev => ({...prev, [key]: {...prev[key as keyof typeof inspection], checks: parseInt(e.target.value)}}))} />
                <select className="grow p-2 rounded-lg border text-xs"
                  onChange={(e) => setInspection(prev => ({...prev, [key]: {...prev[key as keyof typeof inspection], status: e.target.value}}))}>
                  <option value="passed">Passed</option><option value="imperfection">Imperfection</option><option value="failed">Failed</option>
                </select>
              </div>
            </div>
          ))}
          <button type="submit" disabled={uploading} className="w-full bg-[#D32F2F] text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl shadow-[#D32F2F]/20 hover:bg-[#2DA7D7] transition-all">
            {uploading ? "Syncing..." : "Publish Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: any, title: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
      <div className="text-[#D32F2F]">{icon}</div>
      <h3 className="text-xs font-black uppercase tracking-widest">{title}</h3>
    </div>
  );
}