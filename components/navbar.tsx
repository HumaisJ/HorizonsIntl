"use client"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { businessSections } from "@/lib/business-data"
import Link from "next/link"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-brand-gray/20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo - Added onClick handler to reset menu visibility on click */}
        <Link 
          href="/" 
          onClick={() => setIsMobileMenuOpen(false)} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/images/horizons.png"
            alt="Horizons Intl logo"
            width={102}
            height={32}
            className="h-10 w-20 rounded-lg object-cover"
            priority
          />
          <span className="text-xl font-black tracking-tighter text-brand-blue dark:text-white">
            HORIZONS <span className="text-brand-orange">INTL</span>
          </span>
        </Link>
        
        {/* Desktop Navigation - Unchanged */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex space-x-5">
            {businessSections.map((section) => (
              <Link 
                key={section.id}
                href={section.link} 
                className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand-blue dark:text-slate-400 dark:hover:text-brand-orange transition-colors"
              >
                {section.title.split(' ')[0]}
              </Link>
            ))}
          </div>
          
          <div className="h-6 w-[1px] bg-brand-gray/30" />

          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-brand-orange transition-transform hover:scale-110"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Action Controls Group */}
        <div className="flex lg:hidden items-center gap-4">
          {/* Mobile Dark Mode Toggle */}
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-brand-orange transition-transform"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Hamburger Trigger */}
          <button 
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu List Panel Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-zinc-200 dark:border-slate-800 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col px-6 py-4 divide-y divide-zinc-100 dark:divide-slate-800/60">
            {businessSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link 
                  key={section.id}
                  href={section.link} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 py-4 font-bold text-sm uppercase tracking-wider text-slate-700 dark:text-slate-200 hover:text-brand-orange dark:hover:text-brand-blue transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-zinc-100 dark:bg-slate-800/40 text-slate-400 group-hover:text-brand-orange dark:group-hover:text-brand-blue transition-colors">
                    <Icon size={16} />
                  </div>
                  <span>{section.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  )
}