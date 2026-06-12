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

  // 2. Prevent background scroll when mobile menu is open
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
        scrolled || isOpen
          ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-lg border-b border-zinc-200 dark:border-zinc-800" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/one-star" className="flex items-center gap-0.5 group z-[100]" onClick={() => setIsOpen(false)}>
          <div className="relative w-12 h-20 transition-transform group-hover:scale-110 duration-300">
            <Image
              src="/images/logo.png"
              alt="One Star Trading Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-black text-2xl tracking-tighter text-zinc-900 dark:text-white uppercase">
            One <span className="text-red-600">Star</span>
          </span>
        </Link>

        {/* Desktop Navigation - Kept exact behaviors intact */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.label}
              href={item.href}
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

        {/* Mobile Action Controls Group - Places toggle and hamburger side-by-side cleanly */}
        <div className="flex md:hidden items-center gap-2 z-[110]">
          {mounted && (
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <button 
            className="p-2.5 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Clean Mobile Menu Dropdown Panel (Replaces broken text string overlay blocks) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col px-6 py-4 divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className="py-4 font-bold text-sm uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:text-red-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <Link 
              href="/one-star/admin/login" 
              className="py-4 flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-blue-500 hover:text-blue-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <LayoutDashboard size={16} /> Admin Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}