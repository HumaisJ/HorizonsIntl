import { supabase } from '@/lib/supabase';
import Link from 'next/link';

// Notice we await the params at the very beginning
export default async function CategoryInventory({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params; 
  const categorySlug = resolvedParams.category;

  // 1. Find the Category ID based on the unwrapped slug
  const { data: categoryData } = await supabase
    .from('categories')
    .select('id, name')
    .eq('slug', categorySlug)
    .single();

  if (!categoryData) {
    return (
      <div className="p-40 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tighter">Category Not Found</h2>
        <p className="text-slate-500 text-sm mt-2">Please check the URL or return to the showroom.</p>
      </div>
    );
  }

  // 2. Fetch real vehicles that match this category
  const { data: vehicles } = await supabase
    .from('vehicles')
    .select('*')
    .eq('category_id', categoryData.id)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 min-h-screen">
      <div className="mb-16 border-l-4 border-[#D32F2F] pl-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
          {categoryData.name} <span className="text-[#2DA7D7]">Inventory</span>
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7A7A7A] mt-2">
          Hand-picked Japanese Imports
        </p>
      </div>

      {vehicles && vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {vehicles.map((car) => (
            <Link key={car.id} href={`/one-star/${categorySlug}/${car.slug}`} className="group block">
              <div className="aspect-[16/10] bg-[#E0E0E0] dark:bg-slate-800 rounded-[3rem] overflow-hidden shadow-xl mb-6 relative border border-slate-100 dark:border-slate-800">
                <div className="absolute top-6 left-6 z-10 bg-[#D32F2F] text-white text-[10px] font-black uppercase px-4 py-2 rounded-full shadow-lg">
                  {car.status}
                </div>
                <img 
                  src={car.images[0]} 
                  alt={`${car.make} ${car.model}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="flex justify-between items-start px-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                    {car.year} {car.make} <span className="text-[#2DA7D7]">{car.model}</span>
                  </h3>
                  <p className="text-[#7A7A7A] text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                    {car.engine_size} • {car.transmission} • {car.fuel_type}
                  </p>
                </div>
                <span className="text-[#D32F2F] font-black text-2xl tracking-tighter">
                  ${car.price.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-40 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
          <p className="text-[#7A7A7A] font-bold uppercase tracking-widest italic">No vehicles listed in this category yet.</p>
        </div>
      )}
    </div>
  );
}