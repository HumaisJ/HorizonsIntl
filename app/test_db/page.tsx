import { businessSections } from '@/lib/business-data';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function HomePage() {
  return (
    <main className="scroll-smooth bg-white dark:bg-slate-900">
      <Navbar />
      
      {/* 1. HERO SECTION */}
      <section className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6 pt-20">
        <h1 className="text-5xl md:text-7xl font-black text-[#2DA7D7] mb-6 tracking-tight uppercase">
          Horizons International <span className="text-[#F5A623]">Group</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-12">
          Providing high-tech services since 1995[cite: 15]. 
          An ISO 9001:2008 certified multinational group [cite: 19] dedicated to 
          excellence in IT, Engineering, and Global Trading[cite: 14].
        </p>
        
        {/* Navigation Grid (PU-Style Layout) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
          {businessSections.map((section) => (
            <a 
              key={section.id} 
              href={`#${section.id}`}
              className="group p-8 border-2 rounded-2xl transition-all duration-300 border-[#CFCFCF]/30 hover:border-[#F5A623] bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl"
            >
              <div className="h-2 w-12 mb-4 rounded-full" style={{ backgroundColor: section.color }} />
              <span className="font-bold text-base block text-left group-hover:text-[#F5A623] transition-colors">
                {section.title}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 2. DYNAMIC SECTIONS */}
      {businessSections.map((section, index) => (
        <section 
          key={section.id} 
          id={section.id} 
          className={`py-32 px-8 ${index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-900'}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-1 w-20 rounded-full" style={{ backgroundColor: section.color }} />
               <h2 className="text-4xl font-black uppercase tracking-tighter" style={{ color: section.color }}>
                 {section.title}
               </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{section.intro}</p>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{section.content}</p>
                <a 
                  href={section.link}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2DA7D7] text-white font-bold hover:bg-[#F5A623] transition-all transform hover:scale-105"
                >
                  {section.id === 'one-star' ? 'Explore Inventory' : 'View Details'}
                  <span className="text-xl">→</span>
                </a>
              </div>
              <div className="aspect-video bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-[#CFCFCF]/20 flex items-center justify-center">
                 <span className="text-[#CFCFCF] font-bold uppercase tracking-widest opacity-50">Visual Preview</span>
              </div>
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </main>
  );
}