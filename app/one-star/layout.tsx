import { Mail, Phone, Share2, ArrowUpRight, Camera, Link2, Tv2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OneStarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen flex flex-col transition-colors duration-300">
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#0F0F0F] text-white px-6 py-4 shadow-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/one-star" className="flex items-center gap-3 group">
             <div className="w-10 h-10 bg-os-red rounded-lg flex items-center justify-center font-black text-xl shadow-lg shadow-[#D32F2F]/20 group-hover:scale-105 transition-transform">
               ★
             </div>
             <div className="flex flex-col line-height-none">
               <span className="font-black tracking-tighter text-xl uppercase leading-normal">One Star</span>
               <span className="text-os-red font-bold text-[10px] tracking-[0.3em] uppercase leading-none">Trading</span>
             </div>
          </Link>
          
          <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] items-center">
            <Link href="/one-star" className="hover:text-os-red transition-colors">Showroom</Link>
            <Link href="#contact" className="hover:text-os-red transition-colors">Contact</Link>
            <Link href="/one-star/login" className="bg-[#2DA7D7] text-white px-5 py-2.5 rounded-full hover:bg-[#F5A623] transition-all flex items-center gap-2 shadow-lg shadow-[#2DA7D7]/20">
              Admin Login <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      <main className="grow">{children}</main>

      {/* 2. DENSE SEO FOOTER */}
      <footer className="bg-[#0F0F0F] text-slate-400 pt-24 pb-12 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          
          {/* SEO QUICK LINKS SECTION (PakWheels Style) */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10 mb-16 pb-16 border-b border-white/5">
            <FooterColumn title="Cars By Make">
              {['Toyota', 'Suzuki', 'Honda', 'Daihatsu', 'Mitsubishi', 'Nissan', 'Mercedes', 'BMW'].map(make => (
                <Link key={make} href={`/one-star/search?make=${make.toLowerCase()}`} className="hover:text-os-red transition-colors">{make} for Sale</Link>
              ))}
            </FooterColumn>

            <FooterColumn title="Cars By Category">
              {['SUV', 'Sedan', 'Hatchback', 'Crossover', 'Japanese Cars', 'Imported Cars', 'Automatic Cars', '660cc Cars'].map(cat => (
                <Link key={cat} href={`/one-star/search?category=${cat.toLowerCase().replace(' ', '-')}`} className="hover:text-os-red transition-colors">{cat}</Link>
              ))}
            </FooterColumn>

            <FooterColumn title="Explore One Star">
              <Link href="/one-star/search?status=used" className="hover:text-os-red transition-colors">Used Cars</Link>
              <Link href="/one-star/search?status=new" className="hover:text-os-red transition-colors">New Cars</Link>
              <Link href="/one-star/news" className="hover:text-os-red transition-colors">Automotive News</Link>
              <Link href="/one-star/shipping" className="hover:text-os-red transition-colors">Shipping Info</Link>
              <Link href="/one-star/sitemap" className="hover:text-os-red transition-colors">Sitemap</Link>
            </FooterColumn>

            <FooterColumn title="Africa Exports">
              {['Lesotho', 'South Africa', 'Zimbabwe', 'Namibia', 'Botswana'].map(region => (
                <Link key={region} href={`/one-star/search?region=${region.toLowerCase()}`} className="hover:text-os-red transition-colors">Export to {region}</Link>
              ))}
            </FooterColumn>
          </div>

          {/* CONTACT & OFFICES SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div>
              <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-8 border-l-2 border-os-red pl-4">Head Office</h4>
              <p className="text-sm leading-relaxed mb-6">Office# 148 Huma Block Allama Iqbal Town Lahore, 54570 Pakistan.</p>
              <div className="space-y-3 text-xs">
                <p className="flex items-center gap-3 hover:text-white transition-colors"><Phone size={14} className="text-os-red"/> +923447200002</p>
                <p className="flex items-center gap-3 hover:text-white transition-colors"><Mail size={14} className="text-os-red"/> info@horizonsintl.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-8 border-l-2 border-os-red pl-4">Africa Regions</h4>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] text-os-red font-bold uppercase tracking-widest mb-2">Lesotho Branch</p>
                  <p className="text-xs leading-relaxed">1 South Road, Lithabaneng, Maseru. <br />+266-20321818</p>
                </div>
                <div>
                  <p className="text-[10px] text-os-red font-bold uppercase tracking-widest mb-2">South Africa</p>
                  <p className="text-xs leading-relaxed">Cosmos No. 1, 5th Street, Ladybrand, Free State 9745.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-8 border-l-2 border-os-red pl-4">Global Hubs</h4>
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] text-os-red font-bold uppercase tracking-widest mb-2">Japan Office</p>
                  <p className="text-xs leading-relaxed">513-0818 Mie Ken, Suzuka shi, Yasuzukacho 1350-72.</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#F5A623] font-bold uppercase tracking-widest mb-2">UAE Office</p>
                  <p className="text-xs italic opacity-50">Operational expansion coming soon.</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase text-[10px] tracking-[0.3em] mb-8 border-l-2 border-os-red pl-4">Connect</h4>
              <div className="flex flex-wrap gap-5 mb-10">
                <SocialLink href="#" icon={<Image src="/icons/facebook.svg" alt="FB" width={18} height={18} className="invert"/>} />
                <SocialLink href="#" icon={<Image src="/icons/x.svg" alt="X" width={16} height={16} className="invert"/>} />
                <SocialLink href="#" icon={<Camera size={18} />} />
                <SocialLink href="#" icon={<Link2 size={18} />} />
                <SocialLink href="#" icon={<Tv2Icon size={18} />} />
                <Share2 size={18} className="hover:text-os-red transition-colors cursor-pointer" />
              </div>
              <p className="text-[10px] leading-relaxed text-slate-500 uppercase tracking-widest font-bold">
                Certified Japanese <br /> Automobile Importers
              </p>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-5">
               <span className="text-[9px] uppercase tracking-[0.3em] text-slate-600 font-bold">A Project by</span>
               <Link href="/" className="flex items-center gap-3 group opacity-60 hover:opacity-100 transition-all">
                  <div className="w-5 h-5 bg-[#2DA7D7] rounded-sm group-hover:bg-[#F5A623] transition-colors" />
                  <span className="text-[11px] font-black text-white uppercase tracking-tighter">Horizons International</span>
               </Link>
            </div>
            <div className="flex gap-6 text-[9px] uppercase tracking-[0.2em] font-bold text-slate-600">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <span className="text-[#7A7A7A]">© 2007 - 2026 One Star Trading</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper Components for clean code
function FooterColumn({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.2em]">{title}</h4>
      <div className="flex flex-col gap-2 text-[11px] text-slate-500">
        {children}
      </div>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <Link href={href} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-os-red hover:text-os-red transition-all opacity-60 hover:opacity-100">
      {icon}
    </Link>
  );
}