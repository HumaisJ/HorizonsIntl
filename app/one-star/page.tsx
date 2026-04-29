import Hero from "./(sections)/Hero";
import MissionVision from "./(sections)/MissionVision";
import ShowroomHighlights from "./(sections)/ShowroomHighlights";
import ServicesOverview from "./(sections)/ServicesOverview";
import BlogHighlights from "./(sections)/BlogHighlights";
import Link from "next/link"; // Ensure Link is imported

export default async function OneStarHomePage() {
  return (
    <div className="flex flex-col w-full overflow-hidden scroll-smooth">
      {/* SECTION 1: Hero Video & Primary Branding */}
      <Hero />

      {/* SECTION 2 & 3: Mission, Vision, and Policies */}
      <MissionVision />

      {/* SECTION 4: Showroom (Dynamic Data from Supabase) */}
      <section id="showroom-section" className="scroll-mt-20">
        <ShowroomHighlights />
      </section>

      {/* SECTION 5: Services (Circular Animation Overviews) */}
      <section id="services-section" className="scroll-mt-20">
        <ServicesOverview />
      </section>

      {/* SECTION 6: Blog Posts */}
      <BlogHighlights />

      {/* SECTION: Final CTA before Footer */}
      <section className="py-12 bg-red-600">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
            Ready to find your next vehicle?
          </h3>
          <div className="flex gap-4">
            {/* 1. CONTACT SALES: Anchors to the Footer */}
            <Link 
              href="#main-footer" 
              className="bg-white text-red-600 font-black py-3 px-8 uppercase tracking-widest text-[10px] hover:bg-zinc-100 transition-colors inline-block shadow-lg"
            >
              Contact Sales
            </Link>

            {/* 2. GET A SERVICE: Navigates to the Service Form */}
            <Link 
              href="/one-star/contact" 
              className="bg-transparent border-2 border-white text-white font-black py-3 px-8 uppercase tracking-widest text-[10px] hover:bg-white hover:text-red-600 transition-colors inline-block"
            >
              Get a Service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}