"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push('/one-star/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#D32F2F] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#D32F2F]/20">
            <Lock className="text-white" size={28} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">Admin <span className="text-[#2DA7D7]">Portal</span></h2>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-2">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Admin Email" 
            className="w-full p-4 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 rounded-xl border bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <button className="w-full bg-[#D32F2F] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#2DA7D7] transition-all flex items-center justify-center gap-2">
            Enter Dashboard <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}