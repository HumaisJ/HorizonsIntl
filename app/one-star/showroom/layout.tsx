import Navbar from "@/components/one-star/navbar";
import Footer from "@/components/one-star/footer";

export default function ShowroomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-grow">
        {children}
      </main>

      
    </div>
  );
}