import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Plus, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SEO from "@/components/SEO";
import { toast } from "sonner";

export default function SupportVault() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  const [activeConversation, setActiveConversation] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("General Question");
  const [newProductId, setNewProductId] = useState("");
  const [newInitialMessage, setNewInitialMessage] = useState("");

  const fetchConversations = async (userId: string) => {
    const { data } = await supabase
      .from("vault_support_conversations")
      .select("*, vault_products(name)")
      .eq("customer_id", userId)
      .order("updated_at", { ascending: false });
    
    if (data) setConversations(data);
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUser(session.user);

      await fetchConversations(session.user.id);
      
      const { data: ownedProducts } = await supabase
        .from("vault_entitlements")
        .select("vault_products(id, name)")
        .eq("user_id", session.user.id);
      
      if (ownedProducts) {
        setProducts(ownedProducts.map(op => op.vault_products));
      }

      setLoading(false);
    };
    init();
  }, []);

  const loadConversation = async (conv: any) => {
    setActiveConversation(conv);
    setIsCreating(false);
    
    const { data } = await supabase
      .from("vault_support_messages")
      .select("*")
      .eq("conversation_id", conv.id)
      .order("created_at", { ascending: true });
      
    if (data) setMessages(data);
    
    // Auto-scroll
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !newInitialMessage.trim()) return;

    try {
      const { data: convData, error: convError } = await supabase
        .from("vault_support_conversations")
        .insert({
          customer_id: user.id,
          subject: newSubject,
          category: newCategory,
          product_id: newProductId || null,
          status: "open"
        })
        .select()
        .single();
        
      if (convError) throw convError;

      const { error: msgError } = await supabase
        .from("vault_support_messages")
        .insert({
          conversation_id: convData.id,
          sender_id: user.id,
          sender_type: "customer",
          message: newInitialMessage
        });

      if (msgError) throw msgError;

      toast.success("Support request sent successfully");
      setIsCreating(false);
      setNewSubject("");
      setNewInitialMessage("");
      await fetchConversations(user.id);
      loadConversation(convData);

    } catch (error: any) {
      toast.error(error.message || "Failed to create request");
    }
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConversation) return;

    try {
      const { data: msgData, error } = await supabase
        .from("vault_support_messages")
        .insert({
          conversation_id: activeConversation.id,
          sender_id: user.id,
          sender_type: "customer",
          message: replyText
        })
        .select()
        .single();

      if (error) throw error;

      await supabase
        .from("vault_support_conversations")
        .update({ status: "open" })
        .eq("id", activeConversation.id);

      setMessages([...messages, msgData]);
      setReplyText("");
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      
      // Background refresh of conversations list to update status and timestamp
      fetchConversations(user.id);
    } catch (error: any) {
      toast.error(error.message || "Failed to send reply");
    }
  };

  if (loading) {
    return <div className="p-8 animate-pulse text-gray-500">Loading support center...</div>;
  }

  return (
    <>
      <SEO
        title="Support — TakeIN Studio Customer Portal"
        description="Get help and support for your TakeIN Studio products."
        url="https://takeinstudio.com/vault/dashboard/support"
      />

      <div className="flex flex-col h-full bg-[#FCFBF9]">
        {/* Header */}
        <div className="p-4 sm:p-8 border-b border-gray-200 shrink-0">
          <div className="max-w-5xl mx-auto w-full">
            <p className="text-[10px] tracking-[0.2em] font-black text-[#FF6B00] uppercase mb-1">
              HELP CENTER
            </p>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
                  Support
                </h1>
                <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                  Send a message to the TakeIN Studio team.
                </p>
              </div>
              
              {!activeConversation && !isCreating && (
                <button
                  onClick={() => setIsCreating(true)}
                  className="flex items-center gap-2 bg-[#FF6B00] hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors shadow-sm"
                >
                  <Plus size={16} /> NEW REQUEST
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="max-w-5xl mx-auto w-full h-full flex flex-col md:flex-row">
            
            {/* Sidebar (List) */}
            <div className={`w-full md:w-1/3 md:border-r border-gray-200 h-full overflow-y-auto ${activeConversation || isCreating ? "hidden md:block" : "block"}`}>
              {conversations.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare size={32} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">No support conversations yet.</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {conversations.map(conv => (
                    <div 
                      key={conv.id}
                      onClick={() => loadConversation(conv)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        activeConversation?.id === conv.id 
                          ? "border-[#FF6B00] bg-orange-50/50" 
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 shadow-sm"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full ${
                          conv.status === 'resolved' || conv.status === 'closed' ? 'bg-green-100 text-green-700' :
                          conv.status === 'awaiting_customer' ? 'bg-[#FF6B00]/10 text-[#FF6B00]' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {conv.status.replace('_', ' ')}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {new Date(conv.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm line-clamp-1 mb-1">
                        {conv.subject}
                      </h3>
                      {conv.vault_products && (
                        <p className="text-xs text-gray-500 line-clamp-1">
                          Product: {conv.vault_products.name}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content (Chat/Form) */}
            <div className={`w-full md:w-2/3 h-full flex flex-col bg-white ${!activeConversation && !isCreating ? "hidden md:flex" : "flex"}`}>
              
              {isCreating ? (
                <div className="h-full overflow-y-auto p-4 sm:p-8">
                  <button onClick={() => setIsCreating(false)} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 mb-6 uppercase tracking-wider md:hidden">
                    <ArrowLeft size={14} /> Back to List
                  </button>
                  <h2 className="font-display text-2xl font-black mb-6">New Support Request</h2>
                  
                  <form onSubmit={handleCreate} className="space-y-5 max-w-lg">
                    <div>
                      <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase block mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder="Brief summary of your issue"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all text-sm"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase block mb-2">
                          Category
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all text-sm appearance-none"
                        >
                          <option>General Question</option>
                          <option>Vault Access</option>
                          <option>Payment</option>
                          <option>Technical Issue</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase block mb-2">
                          Related Product (Optional)
                        </label>
                        <select
                          value={newProductId}
                          onChange={(e) => setNewProductId(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all text-sm appearance-none"
                        >
                          <option value="">None</option>
                          {products.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-black tracking-widest text-gray-500 uppercase block mb-2">
                        Message
                      </label>
                      <textarea
                        value={newInitialMessage}
                        onChange={(e) => setNewInitialMessage(e.target.value)}
                        placeholder="Please describe your issue in detail..."
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all text-sm resize-none"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#FF6B00] hover:bg-orange-500 text-white py-3.5 rounded-xl font-black tracking-widest text-xs uppercase shadow-sm transition-all"
                    >
                      SEND REQUEST
                    </button>
                  </form>
                </div>

              ) : activeConversation ? (
                
                <div className="h-full flex flex-col relative">
                  {/* Conversation Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                    <button onClick={() => setActiveConversation(null)} className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-gray-900 mb-4 uppercase tracking-wider md:hidden">
                      <ArrowLeft size={14} /> Back
                    </button>
                    <h2 className="font-bold text-lg text-gray-900">{activeConversation.subject}</h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Ticket #{activeConversation.id.split('-')[0].toUpperCase()} • {activeConversation.category}
                      {activeConversation.vault_products && ` • ${activeConversation.vault_products.name}`}
                    </p>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-gray-50">
                    {messages.map((msg, i) => {
                      const isCustomer = msg.sender_type === "customer";
                      return (
                        <div key={msg.id} className={`flex flex-col ${isCustomer ? "items-end" : "items-start"}`}>
                          <div className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl ${
                            isCustomer 
                              ? "bg-gray-900 text-white rounded-tr-sm" 
                              : "bg-white border border-gray-200 text-gray-900 rounded-tl-sm shadow-sm"
                          }`}>
                            <p className="text-[10px] font-bold tracking-widest uppercase mb-2 opacity-70">
                              {isCustomer ? "YOU" : "TAKEIN STUDIO SUPPORT"}
                            </p>
                            <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                          </div>
                          <span className="text-[10px] text-gray-400 mt-1.5 px-1 font-medium">
                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Reply Input */}
                  {(activeConversation.status !== "resolved" && activeConversation.status !== "closed") ? (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <form onSubmit={handleReply} className="flex items-end gap-2">
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your reply..."
                          rows={2}
                          className="flex-1 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/20 focus:border-[#FF6B00] transition-all text-sm resize-none"
                        />
                        <button 
                          type="submit"
                          disabled={!replyText.trim()}
                          className="bg-[#FF6B00] hover:bg-orange-500 disabled:bg-gray-200 disabled:text-gray-400 text-white p-3.5 rounded-xl transition-all shadow-sm"
                        >
                          <Send size={18} />
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
                      <p className="text-sm text-gray-500 font-medium">This conversation is resolved and closed.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-8 text-center text-gray-400 bg-gray-50/50">
                  <div>
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-20" />
                    <p>Select a conversation or create a new request.</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
