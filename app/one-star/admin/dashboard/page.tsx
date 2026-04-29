"use client";

import { LayoutDashboard, Car, Layers, Briefcase, FileText, UserCog, Plus, Edit3, Trash2, LogOut } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const dashboardModules = [
  { name: "Categories", icon: Layers, path: "categories" },
  { name: "Car Listings", icon: Car, path: "vehicles" },
  { name: "Services", icon: Briefcase, path: "services" },
  { name: "Blogs", icon: FileText, path: "blogs" },
];

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/one-star/admin/login"); // Redirect to your login page
    } else {
      alert("Error logging out: " + error.message);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* HEADER WITH LOGOUT */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="text-red-600" size={32} />
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Control <span className="text-red-600">Panel</span>
          </h1>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-6 py-3 bg-zinc-900 text-white font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all shadow-lg"
        >
          <LogOut size={16} /> Logout Session
        </button>
      </div>

      <div className="space-y-4">
        {dashboardModules.map((module) => (
          <div key={module.name} className="flex items-center justify-between p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-red-600/50 transition-all group">
            <div className="flex items-center gap-6">
              <module.icon className="text-zinc-400 group-hover:text-red-600 transition-colors" size={24} />
              <span className="font-bold uppercase tracking-widest text-sm">{module.name}</span>
            </div>
            
            <div className="flex gap-2">
              <Link title="Add New" href={`/one-star/admin/dashboard/${module.path}/add`} className="p-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-green-600 hover:text-white transition-all">
                <Plus size={18} />
              </Link>
              <Link title="Edit Existing" href={`/one-star/admin/dashboard/${module.path}/edit`} className="p-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-blue-600 hover:text-white transition-all">
                <Edit3 size={18} />
              </Link>
              <Link title="Delete" href={`/one-star/admin/dashboard/${module.path}/delete`} className="p-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-600 hover:text-white transition-all">
                <Trash2 size={18} />
              </Link>
            </div>
          </div>
        ))}

        {/* SUPER ADMIN ROLE SECTION */}
        <div className="mt-12 bg-zinc-50 dark:bg-zinc-900/50 p-8 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/10 text-blue-600 rounded-full">
                <UserCog size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1">Super Admin Role</p>
                <h2 className="text-xl font-black uppercase tracking-tighter">Manage Administrators</h2>
              </div>
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <Link 
                href="/one-star/admin/dashboard/admins/add" 
                className="flex-1 md:flex-none bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-950 hover:text-white text-zinc-700 dark:text-zinc-300 font-black py-4 px-8 uppercase tracking-widest text-[10px] text-center transition-all shadow-sm"
              >
                Add Admin
              </Link>
              <Link 
                href="/one-star/admin/dashboard/admins/delete" 
                className="flex-1 md:flex-none bg-zinc-200 dark:bg-zinc-800 hover:bg-red-600 hover:text-white text-zinc-700 dark:text-zinc-300 font-black py-4 px-8 uppercase tracking-widest text-[10px] text-center transition-all shadow-sm"
              >
                Revoke
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}