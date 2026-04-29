import Link from 'next/link';
import { Mail, Phone, MapPin, Smartphone, ChevronRight } from 'lucide-react';

const footerData = {
  makes: ["Toyota", "Suzuki", "Honda", "Daihatsu", "Mitsubishi", "Nissan", "Mercedes", "BMW"],
  categories: ["SUV", "Sedan", "Hatchback", "Crossover", "Japanese Cars", "Imported Cars", "Automatic Cars", "660cc Cars"],
  explore: [
    { label: "Used Cars", href: "/one-star/showroom" },
    { label: "New Cars", href: "/one-star/showroom?status=new" },
    { label: "Automotive News", href: "/one-star/blog" },
    { label: "Shipping Info", href: "/one-star/shipping" },
    { label: "Sitemap", href: "/sitemap.xml" }
  ],
  africa: ["Lesotho", "South Africa", "Zimbabwe", "Namibia", "Botswana"]
};

// Custom SVG Social Icons for a professional look
const SocialIcon = ({ path, href }: { path: string; href: string }) => (
  <Link href={href} className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300 text-zinc-600 dark:text-zinc-400">
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  </Link>
);

export default function OneStarFooter() {
  return (
    <footer id="main-footer" className="bg-zinc-100 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-900 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-4">
        
        {/* Main Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1: Makes */}
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-tighter text-zinc-900 dark:text-white text-base">Cars By Make</h4>
            <ul className="space-y-3">
              {footerData.makes.map(make => (
                <li key={make}>
                  <Link href={`/one-star/showroom?make=${make.toLowerCase()}`} className="text-zinc-500 hover:text-red-600 flex items-center gap-1 group transition-colors">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {make} for Sale
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Categories */}
          <div className="space-y-6">
            <h4 className="font-black uppercase tracking-tighter text-zinc-900 dark:text-white text-base">Body Types</h4>
            <ul className="space-y-3">
              {footerData.categories.map(cat => (
                <li key={cat}>
                  <Link href={`/one-star/showroom?cat=${cat.toLowerCase()}`} className="text-zinc-500 hover:text-red-600 flex items-center gap-1 group transition-colors">
                    <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore & Africa */}
          <div className="space-y-10">
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-tighter text-zinc-900 dark:text-white text-base">Explore</h4>
              <ul className="space-y-3">
                {footerData.explore.map(item => (
                  <li key={item.label}><Link href={item.href} className="text-zinc-500 hover:text-red-600 transition-colors">{item.label}</Link></li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-black uppercase tracking-tighter text-red-600 text-base">Africa Regions</h4>
              <ul className="space-y-3">
                {footerData.africa.map(country => (
                  <li key={country}><Link href="#" className="text-zinc-500 hover:text-red-600 transition-colors">Export to {country}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Detailed Addresses */}
          <div className="lg:col-span-1 space-y-8">
            <h4 className="font-black uppercase tracking-tighter text-zinc-900 dark:text-white text-base">Our Presence</h4>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <MapPin size={18} className="text-red-600 shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-zinc-800 dark:text-zinc-200 uppercase text-[11px] tracking-widest">Head Office</p>
                  <p className="text-zinc-500 leading-relaxed text-xs">Huma Block, Allama Iqbal Town, Lahore, Pakistan.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Phone size={16} className="text-red-600 shrink-0" />
                <p className="text-zinc-500 text-xs">+92 344 7200002</p>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm">
              <p className="font-bold text-[10px] uppercase text-red-600 mb-2">Japan Global Hub</p>
              <p className="text-zinc-500 text-[11px] leading-relaxed italic">513-0818 Mie Ken, Suzuka shi, Yasuzukacho 1350-72.</p>
            </div>
          </div>

          {/* Column 5: Connect Us & Apps */}
<div className="space-y-8">
  <div className="space-y-6">
    <h4 className="font-black uppercase tracking-tighter text-zinc-900 dark:text-white text-base">Connect Us</h4>
    <div className="flex flex-wrap gap-2">
      
      {/* Facebook */}
      <SocialIcon 
        href="https://www.facebook.com/HorizonsInternational" 
        path="M24 12.073c0-6.627-5.373-12.073-12-12.073s-12 5.446-12 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" 
      />

      {/* X (Twitter) */}
      <SocialIcon 
        href="https://x.com/horizonsintl" 
        path="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" 
      />

      {/* Instagram */}
      <SocialIcon 
        href="https://www.instagram.com/horizonsintl/" 
        path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" 
      />

      {/* TikTok */}
      <SocialIcon 
        href="https://www.tiktok.com/@horizonsintl" 
        path="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.54-4.06-1.47-.9-.71-1.58-1.7-2.02-2.78-.01 2.3-.01 4.6-.01 6.9 0 1.86-.45 3.73-1.48 5.27-1.36 2.04-3.8 3.25-6.27 3.01-2.73-.26-5.12-2.31-5.77-5.01-.73-3.05.65-6.42 3.39-7.98.92-.53 1.95-.81 3.01-.84v4.02c-.52.02-1.04.16-1.5.42-1.12.63-1.74 1.91-1.5 3.17.21 1.1.99 2.06 2.03 2.41 1.05.35 2.29.07 3.06-.71.69-.71 1.03-1.71 1.02-2.71 0-5.42 0-10.84 0-16.27z" 
      />

      {/* YouTube */}
      <SocialIcon 
        href="https://www.youtube.com/" 
        path="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.872.505 9.377.505 9.377.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
      />

      {/* LinkedIn */}
      <SocialIcon 
        href="https://www.linkedin.com/company/horizons-international/" 
        path="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" 
      />

      {/* Gmail */}
      <SocialIcon 
        href="mailto:info@horizonsintl.com" 
        path="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.573l8.073-6.08c1.618-1.214 3.927-.059 3.927 1.964z" 
      />
    </div>
  </div>

  {/* Mobile Apps Section */}
  <div className="space-y-4">
    <h4 className="font-black uppercase tracking-tighter text-zinc-900 dark:text-white text-base">Mobile Apps</h4>
    <div className="flex items-center gap-3 bg-zinc-200 dark:bg-zinc-900 p-3 rounded-sm opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-not-allowed border border-zinc-300 dark:border-zinc-800">
      <Smartphone size={28} className="text-zinc-600 dark:text-zinc-400" />
      <div>
        <p className="text-[10px] font-black uppercase text-zinc-400">Available on</p>
        <p className="text-xs font-bold text-zinc-800 dark:text-white">App Store / Play Store</p>
        <p className="text-[9px] text-red-600 font-bold uppercase mt-1 tracking-widest animate-pulse">Coming Soon</p>
      </div>
    </div>
  </div>
</div>
        </div>

        {/* Corporate Branding Footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-900 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col">
              <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 mb-1">A Project by</p>
              <p className="font-black text-xs text-blue-500 tracking-tighter uppercase">Horizons International Group</p>
            </div>
            <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>
            <p className="text-zinc-400 text-xs">© 2007 - 2026 One Star Trading. All Rights Reserved.</p>
          </div>

          <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest">
            <Link href="/privacy" className="text-zinc-400 hover:text-red-600 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-zinc-400 hover:text-red-600 transition-colors">Terms</Link>
            <Link href="/cookies" className="text-zinc-400 hover:text-red-600 transition-colors">Cookies</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}