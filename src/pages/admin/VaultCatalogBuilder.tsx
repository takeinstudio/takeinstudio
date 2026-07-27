import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Plus, Edit, Trash2, Eye, EyeOff, Loader2, Package, Tag, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function VaultCatalogBuilder() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const defaultFormData = {
    slug: "",
    name: "",
    short_description: "",
    description: "",
    category: "Execution Guide",
    price_in: 99,
    status: "coming_soon",
    is_published: false
  };

  const [formData, setFormData] = useState(defaultFormData);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("vault_products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data);
    if (error) console.error("Error fetching products:", error);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        slug: product.slug || "",
        name: product.name || "",
        short_description: product.short_description || "",
        description: product.description || "",
        category: product.category || "Execution Guide",
        price_in: product.price_in || 0,
        status: product.status || "coming_soon",
        is_published: !!product.is_published
      });
    } else {
      setEditingProduct(null);
      setFormData(defaultFormData);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData(defaultFormData);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.slug || !formData.name) return toast.error("Slug and Name are required");
    
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        const { error } = await supabase.from("vault_products").update(formData).eq("id", editingProduct.id);
        if (error) throw error;
        toast.success("Product updated successfully!");
      } else {
        const { error } = await supabase.from("vault_products").insert([formData]);
        if (error) throw error;
        toast.success("Product created successfully!");
      }
      closeModal();
      fetchData();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you absolutely sure you want to delete ${name}? This action cannot be undone.`)) return;
    try {
      const { error } = await supabase.from("vault_products").delete().eq("id", id);
      if (error) throw error;
      toast.success("Product deleted permanently.");
      fetchData();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to delete product. Make sure there are no existing purchases tied to it.");
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase.from("vault_products").update({ is_published: !currentStatus }).eq("id", id);
      if (error) throw error;
      toast.success(currentStatus ? "Product drafted" : "Product published!");
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update publish status");
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "coming_soon" : "active";
    try {
      const { error } = await supabase.from("vault_products").update({ status: newStatus }).eq("id", id);
      if (error) throw error;
      toast.success(`Product marked as ${newStatus === 'active' ? 'Available' : 'Coming Soon'}`);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update availability");
    }
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex justify-between items-center bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <div>
          <h3 className="font-display font-bold text-lg flex items-center gap-2"><Package className="text-orange-500" size={20} /> Vault Catalog</h3>
          <p className="text-xs text-muted-foreground">Manage your premium resources, courses, and execution guides.</p>
        </div>
        <button onClick={() => openModal()} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 hover:opacity-90">
          <Plus size={16}/> New Product
        </button>
      </div>

      {loading ? (
        <div className="p-12 flex justify-center"><Loader2 className="animate-spin text-muted-foreground" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className={`bg-card border rounded-2xl overflow-hidden shadow-sm flex flex-col group transition-all ${!product.is_published ? 'border-dashed border-border/70 opacity-80' : 'border-border/50 hover:shadow-md'}`}
            >
              <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black tracking-widest text-muted-foreground uppercase">{product.category}</span>
                    <h4 className="font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h4>
                    <p className="text-xs text-muted-foreground font-mono">/{product.slug}</p>
                  </div>
                  <div className="flex gap-1.5">
                    <button 
                      onClick={() => togglePublish(product.id, product.is_published)}
                      className={`p-1.5 rounded-lg border ${product.is_published ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-muted text-muted-foreground border-border'} hover:opacity-80 transition-opacity`}
                      title={product.is_published ? "Published (Live)" : "Draft Mode"}
                    >
                      {product.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {product.short_description}
                </p>

                <div className="flex items-center justify-between border-t border-border/50 pt-4 mt-auto">
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => toggleStatus(product.id, product.status)}
                      className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md transition-colors ${product.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20' : 'bg-orange-500/10 text-orange-500 hover:bg-orange-500/20'}`}
                    >
                      {product.status === 'active' ? 'AVAILABLE' : 'COMING SOON'}
                    </button>
                    {product.status === 'active' ? (
                      <span className="text-sm font-bold text-foreground">₹{product.price_in}</span>
                    ) : (
                      <span className="text-sm font-bold text-muted-foreground">TBA (₹{product.price_in})</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button onClick={() => openModal(product)} className="p-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"><Edit size={16}/></button>
                    <button onClick={() => handleDelete(product.id, product.name)} className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive hover:text-destructive-foreground transition-colors"><Trash2 size={16}/></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {products.length === 0 && (
            <div className="col-span-full p-12 text-center text-muted-foreground bg-card border border-dashed border-border/50 rounded-2xl">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-medium">No products found in the catalog.</p>
              <button onClick={() => openModal()} className="mt-4 text-sm font-bold text-primary hover:underline">Create your first product</button>
            </div>
          )}
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border/50 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
          >
            <div className="p-6 border-b border-border/50 flex justify-between items-center bg-muted/30">
              <h3 className="font-display font-bold text-xl">{editingProduct ? 'Edit Product' : 'Create New Product'}</h3>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground font-bold text-xs uppercase tracking-widest">Cancel</button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6 flex-1">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Product Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. AI / ML Engineer" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">URL Slug</label>
                  <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm font-mono" placeholder="e.g. ai-ml-engineer" />
                  <p className="text-[10px] text-muted-foreground mt-1">Must be unique, lowercase, no spaces.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Category</label>
                  <input type="text" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="e.g. Execution Guide" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Price (INR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-2.5 text-muted-foreground font-bold">₹</span>
                    <input type="number" required min="0" value={formData.price_in} onChange={e => setFormData({...formData, price_in: Number(e.target.value)})} className="w-full bg-background border border-border rounded-xl pl-8 pr-4 py-2.5 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Launch Status</label>
                  <select required value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm">
                    <option value="active">Active (Available)</option>
                    <option value="coming_soon">Coming Soon (Vote)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Short Description</label>
                <input type="text" required value={formData.short_description} onChange={e => setFormData({...formData, short_description: e.target.value})} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm" placeholder="Brief 1-liner for grid view..." />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Long Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm resize-none" placeholder="Detailed description for the product page..."></textarea>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted/30 border border-border/50 rounded-xl">
                <input type="checkbox" id="publishToggle" checked={formData.is_published} onChange={e => setFormData({...formData, is_published: e.target.checked})} className="w-4 h-4 rounded text-primary accent-primary" />
                <label htmlFor="publishToggle" className="text-sm font-semibold cursor-pointer">Publish this product publicly</label>
              </div>

            </form>
            
            <div className="p-6 border-t border-border/50 bg-muted/30">
              <button onClick={handleSave} disabled={isSubmitting} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold uppercase tracking-wider text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : (editingProduct ? 'Save Changes' : 'Create Product')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
