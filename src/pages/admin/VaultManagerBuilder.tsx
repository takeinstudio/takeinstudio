import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Plus, Shield, ShieldOff, Loader2, ArrowLeft, Mail, Phone, Calendar, CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";

export default function VaultManagerBuilder() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // View specific customer state
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [customerPurchases, setCustomerPurchases] = useState<any[]>([]);
  const [customerEntitlements, setCustomerEntitlements] = useState<any[]>([]);

  // Create state
  const [isCreating, setIsCreating] = useState(false);
  const [isGranting, setIsGranting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    productId: ""
  });

  const fetchData = async () => {
    setLoading(true);
    const [profilesRes, productsRes] = await Promise.all([
      supabase.from("vault_profiles").select("*").eq("role", "customer").order("created_at", { ascending: false }),
      supabase.from("vault_products").select("*").order("name")
    ]);
    if (profilesRes.data) setCustomers(profilesRes.data);
    if (productsRes.data) setProducts(productsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const viewCustomer = async (customer: any) => {
    setSelectedCustomer(customer);
    const [purchases, entitlements] = await Promise.all([
      supabase.from("vault_purchases").select("*, vault_products(name)").eq("user_id", customer.id).order("purchased_at", { ascending: false }),
      supabase.from("vault_entitlements").select("*, vault_products(name)").eq("user_id", customer.id)
    ]);
    if (purchases.data) setCustomerPurchases(purchases.data);
    if (entitlements.data) setCustomerEntitlements(entitlements.data);
  };

  const toggleEntitlement = async (entitlementId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'revoked' : 'active';
    try {
      await supabase.from("vault_entitlements").update({ status: newStatus }).eq("id", entitlementId);
      toast.success(`Access ${newStatus}`);
      viewCustomer(selectedCustomer); // Refresh
    } catch (err: any) {
      toast.error("Failed to update access");
    }
  };

  const handleCreateCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.productId) {
      return toast.error("Please fill all required fields");
    }
    
    setIsSubmitting(true);
    try {
      // 1. Create a temporary Supabase client that doesn't persist the session
      // This prevents the admin from being logged out when signing up a new user
      const { createClient } = await import("@supabase/supabase-js");
      const tempClient = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_ANON_KEY,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          }
        }
      );

      // Sign up the user
      const { data: authData, error: authError } = await tempClient.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("Failed to create auth user");
      
      const newUserId = authData.user.id;

      // 2. Insert Profile (using the main admin session)
      await supabase.from("vault_profiles").insert({
        id: newUserId,
        email: formData.email,
        full_name: formData.name,
        role: "customer"
      });

      // 3. Insert Purchase
      await supabase.from("vault_purchases").insert({
        user_id: newUserId,
        product_id: formData.productId,
        payment_status: "paid",
        provider: "manual"
      });

      // 4. Grant Entitlement
      await supabase.from("vault_entitlements").insert({
        user_id: newUserId,
        product_id: formData.productId,
        status: "active"
      });

      toast.success("Customer created & access granted successfully!");
      setIsCreating(false);
      setFormData({ email: "", name: "", password: "", productId: "", razorpayId: "", amount: "99" });
      fetchData();
      
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "An error occurred during customer creation");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productId) return toast.error("Please select a product");

    setIsSubmitting(true);
    try {
      // 1. Insert Purchase
      await supabase.from("vault_purchases").insert({
        user_id: selectedCustomer.id,
        product_id: formData.productId,
        payment_status: "paid",
        provider: "manual"
      });

      // 2. Grant Entitlement
      const { error: entError } = await supabase.from("vault_entitlements").insert({
        user_id: selectedCustomer.id,
        product_id: formData.productId,
        status: "active"
      });
      
      // If they already had it, we could just update the status to active, but let's handle conflict
      if (entError && entError.code === '23505') { // unique violation
         await supabase.from("vault_entitlements").update({ status: "active" }).eq("user_id", selectedCustomer.id).eq("product_id", formData.productId);
      }

      toast.success("Access granted to existing customer!");
      setIsGranting(false);
      setFormData({ email: "", name: "", password: "", productId: "", razorpayId: "", amount: "99" });
      viewCustomer(selectedCustomer); // Refresh customer details
    } catch (err: any) {
      toast.error(err.message || "Failed to grant access");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (selectedCustomer) {
    return (
      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden p-6">
        <button onClick={() => setSelectedCustomer(null)} className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground mb-6 uppercase tracking-wider">
          <ArrowLeft size={14} /> Back to Customers
        </button>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Customer Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-muted/30 border border-border/50 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-4">{selectedCustomer.full_name || 'No Name'}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted-foreground"><Mail size={14} /> {selectedCustomer.email}</div>
                <div className="flex items-center gap-3 text-muted-foreground"><Phone size={14} /> {selectedCustomer.phone || 'No phone'}</div>
                <div className="flex items-center gap-3 text-muted-foreground"><Calendar size={14} /> Joined {new Date(selectedCustomer.created_at).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Entitlements & Purchases */}
          <div className="md:col-span-2 space-y-6">
            
            {isGranting ? (
              <div className="bg-muted/30 border border-primary/20 rounded-xl overflow-hidden p-5 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold">Grant New Product</h4>
                  <button onClick={() => setIsGranting(false)} className="text-xs text-muted-foreground hover:text-foreground font-bold">CANCEL</button>
                </div>
                <form onSubmit={handleGrantAccess} className="space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5 block">Select Product</label>
                    <select required value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm">
                      <option value="">Select Product...</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity mt-4">
                    {isSubmitting ? "Granting..." : "Grant Access"}
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-muted/30 border border-border/50 rounded-xl overflow-hidden">
                <div className="p-4 border-b border-border/50 bg-muted/50 flex justify-between items-center">
                  <h4 className="font-bold">Active Entitlements</h4>
                  <button onClick={() => setIsGranting(true)} className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5"><Plus size={14}/> Grant Product</button>
                </div>
                <div className="divide-y divide-border/50">
                {customerEntitlements.map(ent => (
                  <div key={ent.id} className="p-4 flex items-center justify-between hover:bg-muted/20">
                    <div>
                      <p className="font-semibold text-sm">{ent.vault_products?.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Granted: {new Date(ent.granted_at).toLocaleDateString()}</p>
                    </div>
                    <button 
                      onClick={() => toggleEntitlement(ent.id, ent.status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                        ent.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                      }`}
                    >
                      {ent.status === 'active' ? <><Shield size={14} /> Active</> : <><ShieldOff size={14} /> Revoked</>}
                    </button>
                  </div>
                ))}
                {customerEntitlements.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground">No access granted.</div>}
              </div>
            </div>
            )}

            <div className="bg-muted/30 border border-border/50 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-border/50 bg-muted/50"><h4 className="font-bold">Purchase History</h4></div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="text-muted-foreground text-xs uppercase font-semibold border-b border-border/50">
                    <tr>
                      <th className="p-4">Product</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {customerPurchases.map(p => (
                      <tr key={p.id} className="hover:bg-muted/20">
                        <td className="p-4 font-medium">{p.vault_products?.name}</td>
                        <td className="p-4"><span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded text-[10px] uppercase font-bold">{p.payment_status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {customerPurchases.length === 0 && <div className="p-6 text-center text-sm text-muted-foreground border-t border-border/50">No purchases found.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="bg-card border border-border/50 rounded-2xl p-6 max-w-2xl mx-auto">
        <button onClick={() => setIsCreating(false)} className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground mb-6 uppercase tracking-wider">
          <ArrowLeft size={14} /> Back to List
        </button>
        <h3 className="font-display font-bold text-2xl mb-6">Onboard Customer</h3>
        
        <form onSubmit={handleCreateCustomer} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Full Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="John Doe" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Email Address</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="john@example.com" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 flex items-center gap-1"><Lock size={12}/> Account Password</label>
              <input type="text" required minLength={6} value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-mono" placeholder="Set a secure password" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1.5 block">Product to Grant</label>
              <select required value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm">
                <option value="">Select Product...</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-6">
            <p className="text-xs text-primary font-medium">
              This action creates the user account, provisions their Vault profile, records the purchase, and grants immediate access. You must provide the password to the customer securely. (Note: If your Supabase has "Confirm Email" enabled, the user must click the link in their email before logging in).
            </p>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-4">
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : "Create & Onboard Customer"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <div>
          <h3 className="font-display font-bold text-lg">Vault Customers</h3>
          <p className="text-xs text-muted-foreground">Manage accounts, purchases, and access.</p>
        </div>
        <button onClick={() => setIsCreating(true)} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90">
          <Plus size={16}/> Onboard Customer
        </button>
      </div>
      
      {loading ? (
        <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="bg-card border border-border/50 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
            <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-semibold">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Email</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4 font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
                      {(c.full_name || '?')[0].toUpperCase()}
                    </div>
                    {c.full_name || 'No Name'}
                  </td>
                  <td className="p-4 text-muted-foreground">{c.email}</td>
                  <td className="p-4 text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <button onClick={() => viewCustomer(c)} className="text-xs font-bold bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-lg transition-colors">
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">No customers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
