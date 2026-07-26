import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, LayoutDashboard, Grid, Compass, MessageSquare, UserCircle, Menu, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function VaultDashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase.from("vault_profiles").select("*").eq("id", session.user.id).single();
        if (data) setProfile(data);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/vault/login");
  };

  const navItems = [
    { name: "Overview", path: "/vault/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "My Vault", path: "/vault/dashboard/my-vault", icon: <Grid size={18} /> },
    { name: "Explore", path: "/vault/dashboard/explore", icon: <Compass size={18} /> },
    { name: "Support", path: "/vault/dashboard/support", icon: <MessageSquare size={18} /> },
    { name: "Account", path: "/vault/dashboard/account", icon: <UserCircle size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-[#FCFBF9] flex flex-col md:flex-row relative font-sans text-gray-900">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white/90 backdrop-blur-md sticky top-0 z-50">
        <Link to="/vault/dashboard" className="flex items-center gap-2.5">
          <img src="/logo/logo_no_text.png" alt="TakeIN Logo" className="h-7 w-auto mix-blend-multiply object-contain" />
          <div className="flex items-center text-xl">
            <span className="text-gray-900 font-black tracking-tight">Take</span>
            <span className="text-[#FF6B00] font-black tracking-tight">IN</span>
            <span className="text-gray-500 font-semibold ml-1.5 tracking-normal text-sm self-end pb-0.5 uppercase">Vault</span>
          </div>
        </Link>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-900">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col fixed md:sticky top-[69px] md:top-0 h-[calc(100vh-69px)] md:h-screen z-40 transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b border-gray-200 hidden md:block">
          <Link to="/vault/dashboard" className="flex items-center gap-2.5">
            <img src="/logo/logo_no_text.png" alt="TakeIN Logo" className="h-7 w-auto mix-blend-multiply object-contain" />
            <div className="flex items-center text-xl">
              <span className="text-gray-900 font-black tracking-tight">Take</span>
              <span className="text-[#FF6B00] font-black tracking-tight">IN</span>
              <span className="text-gray-500 font-semibold ml-1.5 tracking-normal text-sm self-end pb-0.5 uppercase">Vault</span>
            </div>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-orange-50 text-[#FF6B00] border border-orange-100" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-200">
          <div className="px-4 pb-4 mb-4 border-b border-gray-100">
            <p className="text-xs text-gray-500 font-medium truncate">
              {profile?.full_name || profile?.email || "Loading..."}
            </p>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
            <LogOut size={16}/> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative w-full">
        {children}
      </main>
    </div>
  );
}
