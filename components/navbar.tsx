"use client"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Sun, Moon, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { businessSections } from "@/lib/business-data"

export default function Navbar() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-brand-gray/20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/horizons.png"
            alt="Horizons Intl logo"
            width={102}
            height={32}
            className="h-10 w-20 rounded-lg object-cover"
            priority
          />
          <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
            HORIZONS <span className="text-brand-orange">INTL</span>
          </span>
        </div>
        
        {/* Desktop Navigation - All 6 Options */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex space-x-5">
            {businessSections.map((section) => (
              <a 
                key={section.id}
                href={`#${section.id}`} 
                className="text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-brand-blue dark:text-slate-400 dark:hover:text-brand-orange transition-colors"
              >
                {section.title.split(' ')[0]} {/* Shows first word to save space */}
              </a>
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

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b p-6 space-y-4 shadow-2xl">
          {businessSections.map((section) => (
            <a 
              key={section.id}
              href={`#${section.id}`} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block font-bold text-slate-700 dark:text-slate-200"
            >
              {section.title}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}