import Link from "next/link"; // Ensure this import is present

export default function Hero() {
  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
      {/* Video Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />
      
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic mb-4">
          ONE <span className="text-red-600">STAR</span> TRADING
        </h1>
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-medium">
          Premium Japanese Automobile Importers — Engineering Trust Across Borders.
        </p>
        
        {/* Call to Action - Fixed with Links */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link 
            href="#showroom-section" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 uppercase tracking-widest text-sm transition-all transform hover:-translate-y-1 inline-block"
          >
            Explore Showroom
          </Link>
          
          <Link 
            href="#services-section" 
            className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 font-bold py-4 px-10 uppercase tracking-widest text-sm transition-all transform hover:-translate-y-1 inline-block"
          >
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}