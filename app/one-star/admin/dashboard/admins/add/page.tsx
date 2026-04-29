"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AddAdmin() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

 const handleAddAdmin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  // We only send email and role; DB handles the ID
  const { error } = await supabase
    .from("admin_users")
    .insert([{ 
      email: email.toLowerCase(), 
      role: 'admin' 
    }]);

  if (error) {
    // If the recursion is fixed, this should succeed
    alert(`Authorization Failed: ${error.message}`);
  } else {
    alert(`${email} is now authorized. You can now invite them from Supabase Auth.`);
    router.push("/one-star/admin/dashboard");
  }
  setLoading(false);
};

  return (
    <div className="p-8 max-w-2xl mx-auto min-h-screen">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-black uppercase tracking-widest text-[10px] hover:text-red-600 transition-colors">
        <ArrowLeft size={14} /> Back to Hub
      </Link>

      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Authorize <span className="text-red-600">Admin</span></h1>

      <form onSubmit={handleAddAdmin} className="bg-white dark:bg-zinc-900 p-10 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
        <div className="mb-8">
          <label className="block text-[10px] font-black uppercase tracking-widest mb-4 text-zinc-400">User Email Address</label>
          <div className="relative">
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-100 dark:bg-zinc-800 p-5 text-sm outline-none border-l-4 border-red-600 font-bold" 
              placeholder="admin@onestartrading.com"
            />
          </div>
          <p className="mt-4 text-[9px] text-zinc-500 uppercase font-bold tracking-widest leading-relaxed">
            Note: The user must sign up with this exact email to gain dashboard access.
          </p>
        </div>

        <button disabled={loading} className="w-full bg-red-600 text-white font-black py-6 uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-zinc-950 transition-all">
          {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck size={18} />} Grant Administrative Access
        </button>
      </form>
    </div>
  );
}