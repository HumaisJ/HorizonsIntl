import OneStarNavbar from "../../components/one-star/navbar";
import OneStarFooter from "../../components/one-star/footer";

export default function OneStarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-zinc-950 font-sans selection:bg-red-600 selection:text-white">
      {/* Sticky Navbar with Glassmorphism */}
      <OneStarNavbar />
      
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* PakWheels-Style SEO Footer */}
      <OneStarFooter />
    </div>
  );
}