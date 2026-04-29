"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { UserMinus, ArrowLeft, Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function RevokeAdmin() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    setLoading(true);
    const { data } = await supabase.from("admin_users").select("*").order("email", { ascending: true });
    setAdmins(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAdmins(); }, []);

  const handleRevoke = async (id: string, email: string) => {
    if (confirm(`Are you sure you want to revoke access for ${email}?`)) {
      const { error } = await supabase.from("admin_users").delete().eq("id", id);
      if (!error) fetchAdmins();
      else alert(error.message);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <Link href="/one-star/admin/dashboard" className="flex items-center gap-2 text-zinc-500 mb-8 font-black uppercase tracking-widest text-[10px]">
        <ArrowLeft size={14} /> Back
      </Link>
      
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-12">Revoke <span className="text-red-600">Privileges</span></h1>

      {loading ? <Loader2 className="animate-spin mx-auto text-red-600" /> : (
        <div className="space-y-4">
          {admins.map((admin) => (
            <div key={admin.id} className="flex justify-between items-center p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm group">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-red-600 group-hover:animate-ping" />
                <span className="font-black uppercase tracking-widest text-sm">{admin.email}</span>
              </div>
              <button 
                onClick={() => handleRevoke(admin.id, admin.email)}
                className="p-3 bg-zinc-100 dark:bg-zinc-800 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-md"
              >
                <UserMinus size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}