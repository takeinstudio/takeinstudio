import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function VaultProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/vault/login");
          return;
        }

        // Verify/Create profile
        const { data: profile, error } = await supabase
          .from("vault_profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error && error.code === "PGRST116") {
          // No profile exists, create one
          const { error: insertError } = await supabase.from("vault_profiles").insert({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata?.full_name || "",
            role: "customer"
          });
          
          if (insertError) {
            console.error("Failed to create vault profile", insertError);
            navigate("/vault/login");
            return;
          }
        } else if (profile?.role === "admin") {
          // Optionally allow admins in vault, but usually fine
          console.log("Admin accessing vault");
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Auth check error", error);
        navigate("/vault/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/vault/login");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <Loader2 className="w-8 h-8 animate-spin text-[#FF6B00]" />
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
}
