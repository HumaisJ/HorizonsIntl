import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function OneStarHome() {
  const { data: categories } = await supabase.from('categories').select('*');

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Category Selection Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-os-red font-bold uppercase tracking-[0.4em] text-xs">
              Gateway to Japanese Automobiles
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 dark:text-white mt-4">
              Select <span className="text-brand-blue">Category</span>
            </h1>
            <div className="h-1 w-24 bg-brand-orange mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {categories?.map((cat) => (
              <Link key={cat.id} href={`/one-star/${cat.slug}`} className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <img 
                  src={cat.image_url} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                {/* Overlay using os-dark-gray for grounding */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent opacity-90" />
                
                <div className="absolute bottom-10 left-10">
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                    {cat.name}
                  </h3>
                  <p className="text-os-light-gray/70 text-xs font-bold uppercase tracking-widest mt-2 group-hover:text-brand-orange transition-colors">
                    Explore Inventory →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}