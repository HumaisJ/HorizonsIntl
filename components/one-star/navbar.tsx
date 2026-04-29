"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X, LayoutDashboard } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

const navItems = [
  { label: "Showroom", href: "/one-star/showroom" },
  { label: "Services", href: "/one-star/services" },
  { label: "Blogs", href: "/one-star/blog" },
];

export default function OneStarNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false); // To fix hydration issues
  const { theme, setTheme } = useTheme();

  // 1. Handle mounting and scroll logic
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${
        scrolled 
          ? "bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md shadow-lg border-b border-zinc-200 dark:border-zinc-800" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Section */}
<Link href="/one-star" className="flex items-center gap-0.5 group z-[100]">
  <div className="relative w-12 h-20 transition-transform group-hover:scale-110 duration-300">
    <Image
      src="/images/logo.png" // Path to your file in the public folder
      alt="One Star Trading Logo"
      fill
      className="object-contain"
      priority // Ensures the logo loads immediately
    />
  </div>
  <span className="font-black text-2xl tracking-tighter text-zinc-900 dark:text-white uppercase">
    One <span className="text-red-600">Star</span>
  </span>
</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
  {navItems.map((item) => (
    <Link 
      key={item.label}
      href={item.href} // CHANGE: Changed from "/one-star/admin/login" to item.href
      className="font-bold uppercase tracking-widest text-[11px] hover:text-red-600 transition-colors text-zinc-600 dark:text-zinc-300"
    >
      {item.label}
    </Link>
  ))}
          
          <Link 
            href="/one-star/admin/login" 
            className="flex items-center gap-2 font-bold uppercase tracking-widest text-[11px] text-blue-500 hover:text-blue-400 border-l border-zinc-300 dark:border-zinc-700 pl-6 transition-all"
          >
            <LayoutDashboard size={14} /> Admin
          </Link>
          
          {/* Theme Toggle - Only shows once mounted to prevent errors */}
          {mounted && (
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-400"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="md:hidden z-[110] text-zinc-900 dark:text-white" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 ... md:hidden ${isOpen ? "translate-y-0" : "-translate-y-full"}`}>
  {navItems.map((item) => (
    <Link 
      key={item.label} 
      href={item.href} // CHANGE: Changed from "/one-star/admin/login" to item.href
      className="font-black uppercase text-3xl tracking-tighter hover:text-red-600 transition-colors"
      onClick={() => setIsOpen(false)}
    >
      {item.label}
    </Link>
  ))}
        <Link 
          key="/one-star/admin/login"
          href="/one-star/admin/login" 
          className="font-black uppercase text-3xl tracking-tighter text-blue-500 hover:text-blue-400 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Admin Portal
        </Link>
        
        {mounted && (
          <button 
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setIsOpen(false);
            }}
            className="mt-4 flex items-center gap-2 font-bold uppercase tracking-widest text-xs text-zinc-400"
          >
            Switch to {theme === "dark" ? "Light" : "Dark"} Mode
          </button>
        )}
      </div>
    </nav>
  );
}