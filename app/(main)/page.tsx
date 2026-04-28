import { businessSections } from '@/lib/business-data';
// Remove Navbar and Footer imports from here
import { companyInfo } from '@/lib/company-info';

export default function HomePage() {
  return (
    <main className="scroll-smooth bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* 1. HERO SECTION WITH VIDEO (Navbar is now handled by layout.tsx) */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-slate-950">
        <video 
          autoPlay loop muted playsInline 
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover opacity-60"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute z-10 inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />

        <div className="relative z-20 mb-24">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight uppercase drop-shadow-2xl">
            Horizons International <span className="text-brand-orange">Group</span>
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl leading-relaxed mx-auto drop-shadow-lg">
            Founded in Pakistan in 1995, Horizons International has expanded into a renowned multinational 
            company providing high-tech services across the globe.
          </p>
        </div>
      </section>

      {/* 2. NAVIGATION GRID */}
      <div className="max-w-6xl mx-auto w-full px-6 -mt-40 relative z-30 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {businessSections.slice(0, 2).map((section) => {
            const Icon = section.icon;
            return (
              <a 
                key={section.id} 
                href={`#${section.id}`}
                className="group relative overflow-hidden p-10 rounded-3xl border border-white/10 bg-slate-900/60 backdrop-blur-2xl transition-all duration-500 hover:border-brand-orange shadow-2xl h-64 flex flex-col justify-end"
              >
                <div className="absolute top-8 left-8 p-4 rounded-2xl bg-brand-blue/20 group-hover:bg-brand-orange/20 transition-colors">
                   <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <span className="text-white font-black text-3xl uppercase tracking-tighter block">
                    {section.title}
                  </span>
                  <p className="text-slate-300 mt-2 line-clamp-1 font-medium">{section.intro}</p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="text-left mb-6">
          <h3 className="text-background font-bold uppercase tracking-[0.3em] text-[10px] flex items-center gap-3 drop-shadow-md">
            <span className="w-12 h-[1px] bg-brand-orange" /> 
            Future Ventures
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {businessSections.slice(2).map((section) => {
            const Icon = section.icon;
            return (
              <div 
                key={section.id}
                className="group relative h-48 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-white/10 overflow-hidden cursor-help shadow-xl"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-500 group-hover:scale-110 group-hover:opacity-0">
                  <Icon className="w-7 h-7 mb-3 text-brand-blue" />
                  <span className="font-bold text-[10px] uppercase text-center tracking-widest text-white/90">
                    {section.title}
                  </span>
                </div>
                <div className="absolute inset-0 bg-brand-blue p-6 flex flex-col justify-center items-center text-center translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                  <span className="text-white/60 font-black text-[9px] uppercase tracking-[0.2em] mb-2">Coming Soon</span>
                  <p className="text-white text-[11px] leading-snug font-semibold">{section.intro}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MISSION & VISION */}
      <section className="relative py-40 bg-white dark:bg-slate-900 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] font-black text-slate-900/[0.02] dark:text-white/[0.02] select-none pointer-events-none tracking-tighter">
          HGC
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-16 md:gap-0">
            <div className="flex-1 md:pr-16 md:border-r border-slate-100 dark:border-slate-800">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-blue mb-8">
                {companyInfo.mission.title}
              </h2>
              <p className="text-2xl md:text-3xl font-light text-slate-800 dark:text-slate-200 leading-snug tracking-tight">
                To establish ourselves as a <span className="font-semibold italic">world-class</span> enterprise, delivering excellence through dedication and quality.
              </p>
              <p className="mt-6 text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                {companyInfo.mission.content}
              </p>
            </div>

            <div className="flex-1 md:pl-16 pt-8 md:pt-24">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-orange mb-8">
                {companyInfo.vision.title}
              </h2>
              <blockquote className="relative">
                <p className="text-xl md:text-2xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{companyInfo.vision.content}"
                </p>
                <div className="mt-8 flex items-center gap-4">
                   <div className="h-[1px] w-8 bg-brand-orange/40" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                     Horizons International Group
                   </span>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC CONTENT SECTIONS */}
      {businessSections.slice(0, 2).map((section, index) => {
        const Icon = section.icon;
        return (
          <section 
            key={section.id} 
            id={section.id} 
            className={`py-32 px-8 ${index % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/20' : 'bg-white dark:bg-slate-900'}`}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center gap-4 mb-10">
                 <div className="h-1.5 w-16 rounded-full" style={{ backgroundColor: section.color }} />
                 <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
                   {section.title}
                 </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-20 items-start">
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-100 dark:border-slate-700">
                      <Icon className="w-8 h-8" style={{ color: section.color }} />
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                      {section.intro}
                    </p>
                  </div>
                  <p className="text-lg text-slate-700 dark:text-slate-400 leading-relaxed">
                    {section.content}
                  </p>
                  <a 
                    href={section.link}
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-brand-blue text-white font-bold hover:bg-brand-orange transition-all transform hover:scale-105 shadow-xl shadow-brand-blue/20"
                  >
                    {section.id === 'one-star' ? 'Explore Inventory' : 'View Details'}
                    <span className="text-xl">→</span>
                  </a>
                </div>
                
                <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border border-slate-200/50 dark:border-slate-700/50 flex items-center justify-center overflow-hidden relative group">
                   <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <div className="text-center opacity-30 transform group-hover:scale-110 transition-transform">
                      <Icon className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                      <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">
                        {section.title} Gallery
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}
      {/* Footer is now handled by layout.tsx - remove tag from here */}
    </main>
  );
}