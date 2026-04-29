"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, MessageSquare, ShieldCheck, 
  Globe, Clock, CheckCircle2 
} from "lucide-react";

export default function ServiceDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("id", id)
        .single();
      
      if (data) setService(data);
      setLoading(false);
    };
    fetchService();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-zinc-100 flex items-center justify-center font-black uppercase tracking-widest text-zinc-400">Loading Service Data...</div>;
  if (!service) return <div className="min-h-screen bg-zinc-100 flex items-center justify-center">Service Not Found</div>;

  return (
    <div className="min-h-screen bg-zinc-100 py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-zinc-400 mb-12 font-black uppercase text-[10px] tracking-widest hover:text-red-600 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area: Elements 1 & 2 from Sketch */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white border border-zinc-200 rounded-[2.5rem] p-8 md:p-16 shadow-sm">
              <div className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
                Premium Service Solution
              </div>
              
              {/* 1. Service Title */}
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 mb-10 leading-none">
                {service.title}
              </h1>

              {/* 2. Service Description */}
              <div className="prose prose-zinc max-w-none">
                <p className="text-zinc-600 text-lg font-medium leading-relaxed whitespace-pre-wrap">
                  {service.description}
                </p>
              </div>

              {/* Added Value Highlights */}
              <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t border-zinc-50">
                <div className="flex gap-4 items-start">
                  <CheckCircle2 className="text-red-600 shrink-0" size={20} />
                  <p className="text-xs font-bold text-zinc-900 uppercase tracking-tight">Full Compliance Documentation</p>
                </div>
                <div className="flex gap-4 items-start">
                  <CheckCircle2 className="text-red-600 shrink-0" size={20} />
                  <p className="text-xs font-bold text-zinc-900 uppercase tracking-tight">Global Logistics Integration</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area: Element 3 from Sketch */}
          <aside className="lg:col-span-4 space-y-6">
            {/* 3. Contact Us Option */}
            <div className="bg-zinc-900 rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="relative z-10 space-y-8">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <MessageSquare className="text-red-600" size={24} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-xl font-black uppercase tracking-tighter">Inquire About This Service</h2>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">
                    Ready to proceed? Speak with our department head for a custom quote and timeline.
                  </p>
                </div>
                <Link 
                  href={{
                    pathname: '/one-star/contact',
                    query: { service: service.title }
                  }}
                  className="w-full bg-red-600 py-5 rounded-xl font-black uppercase tracking-[0.3em] text-[10px] text-center block hover:bg-white hover:text-black transition-all"
                >
                  Start Consultation
                </Link>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <ShieldCheck size={140} />
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="bg-white border border-zinc-200 rounded-[2rem] p-8 space-y-6">
              <div className="flex items-center gap-4">
                <Clock className="text-zinc-300" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Response: 24 Hours</span>
              </div>
              <div className="flex items-center gap-4">
                <Globe className="text-zinc-300" size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Available Globally</span>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}