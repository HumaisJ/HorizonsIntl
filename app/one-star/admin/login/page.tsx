"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Starting login for:", email);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Auth Error:", error.message);
        alert(`Login Failed: ${error.message}`);
        setLoading(false);
        return;
      }

      if (data.session) {
  console.log("Login successful!");
  // This is the "Nuclear Option" to force a redirect
  window.location.replace("/one-star/admin/dashboard");
}
    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("An unexpected error occurred. Check the terminal.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black uppercase tracking-tighter">Admin <span className="text-red-600">Login</span></h1>
          <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest font-bold">Internal Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full bg-zinc-100 dark:bg-zinc-800 border-none p-4 text-sm focus:ring-2 focus:ring-red-600 outline-none" 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest mb-2 text-zinc-400">Password</label>
            <input 
              type="password" 
              required
              className="w-full bg-zinc-100 dark:bg-zinc-800 border-none p-4 text-sm focus:ring-2 focus:ring-red-600 outline-none" 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button 
            disabled={loading}
            className="w-full bg-red-600 text-white font-black py-4 uppercase tracking-widest text-xs hover:bg-zinc-900 transition-colors shadow-lg"
          >
            {loading ? "Authenticating..." : "Authorize Login"}
          </button>
        </form>

        <button className="w-full mt-6 text-[10px] text-zinc-400 uppercase font-bold hover:text-red-600 transition-colors">
          Forgot Password? (Backup: system@horizonsintl.com)
        </button>
      </div>
    </div>
  );
}