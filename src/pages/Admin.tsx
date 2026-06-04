import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Loader2, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string | null;
  website: string;
  project_description: string | null;
  created_at: string;
}

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1912") {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    supabase
      .from("client_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setLeads(data as Lead[]);
        setLoading(false);
      });
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--cyan)) 0%, transparent 70%)" }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, hsl(var(--navy)) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 w-full max-w-md px-6">
          {/* Card */}
          <div className="rounded-2xl border border-border bg-surface-elevated/60 backdrop-blur-xl shadow-card overflow-hidden">
            {/* Top gradient bar */}
            <div className="h-1 w-full bg-gradient-cyan" />

            <div className="p-8 space-y-8">
              {/* Header */}
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex items-center gap-3 mb-2">
                  <img src="/logo/logo_no_text.png" alt="TakeIN Studio" className="h-10 w-auto mix-blend-multiply rounded-xl" />
                  <span className="text-xl font-bold text-gradient tracking-tight">TakeIN Studio</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-cyan flex items-center justify-center shadow-lg">
                  <ShieldCheck size={26} className="text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
                  <p className="text-sm text-muted-foreground mt-1">Enter your password to continue</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter admin password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-9 pr-10 h-11 bg-background/50 border-border focus:border-cyan transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {error && (
                    <p className="text-sm text-destructive flex items-center gap-1.5 mt-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-destructive" />
                      {error}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-cyan text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Unlock Dashboard
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground">
                Restricted access · TakeIN Studio internal use only
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border py-4 px-6 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gradient">TakeIN Studio Admin</h1>
        <Button variant="outline" size="sm" onClick={() => setAuthenticated(false)}>
          Logout
        </Button>
      </div>
      <div className="container mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6 text-foreground">Client Requests ({leads.length})</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-cyan" size={32} />
          </div>
        ) : leads.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">No submissions yet.</p>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-surface border-b border-border">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Email</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Company</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Website</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Description</th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                      <td className="px-4 py-3 text-foreground">{lead.name}</td>
                      <td className="px-4 py-3 text-foreground">{lead.email}</td>
                      <td className="px-4 py-3 text-foreground">{lead.company || "—"}</td>
                      <td className="px-4 py-3">
                        <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-cyan hover:underline">
                          {lead.website}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-foreground max-w-xs truncate">{lead.project_description || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{new Date(lead.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
