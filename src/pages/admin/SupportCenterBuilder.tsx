import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { Send, Search, CheckCircle2, AlertCircle, ArrowLeft, Clock } from "lucide-react";
import { toast } from "sonner";

export default function SupportCenterBuilder() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeConversation, setActiveConversation] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");

  const fetchConversations = async () => {
    setLoading(true);
    let query = supabase
      .from("vault_support_conversations")
      .select("*, vault_profiles(full_name, email), vault_products(name)")
      .order("updated_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data } = await query;
    if (data) setConversations(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchConversations();
  }, [filter]);

  const loadConversation = async (conv: any) => {
    setActiveConversation(conv);
    
    const { data } = await supabase
      .from("vault_support_messages")
      .select("*")
      .eq("conversation_id", conv.id)
      .order("created_at", { ascending: true });
      
    if (data) setMessages(data);
    
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeConversation) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const { data: msgData, error } = await supabase
        .from("vault_support_messages")
        .insert({
          conversation_id: activeConversation.id,
          sender_id: session?.user.id,
          sender_type: "admin",
          message: replyText
        })
        .select()
        .single();

      if (error) throw error;

      await supabase
        .from("vault_support_conversations")
        .update({ status: "awaiting_customer" })
        .eq("id", activeConversation.id);

      setMessages([...messages, msgData]);
      setReplyText("");
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      
      // Refresh list behind the scenes
      const { data } = await supabase
        .from("vault_support_conversations")
        .select("*, vault_profiles(full_name, email), vault_products(name)")
        .order("updated_at", { ascending: false });
      if (data) setConversations(data);

    } catch (error: any) {
      toast.error(error.message || "Failed to send reply");
    }
  };

  const updateStatus = async (status: string) => {
    if (!activeConversation) return;
    try {
      await supabase
        .from("vault_support_conversations")
        .update({ status })
        .eq("id", activeConversation.id);
        
      setActiveConversation({ ...activeConversation, status });
      fetchConversations();
      toast.success(`Status updated to ${status.replace('_', ' ')}`);
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  if (activeConversation) {
    return (
      <div className="bg-card border border-border/50 rounded-2xl overflow-hidden h-[calc(100vh-12rem)] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-muted/20">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveConversation(null)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h3 className="font-bold text-lg">{activeConversation.subject}</h3>
              <p className="text-xs text-muted-foreground">
                {activeConversation.vault_profiles?.full_name || activeConversation.vault_profiles?.email} • {activeConversation.category} 
                {activeConversation.vault_products && ` • Product: ${activeConversation.vault_products.name}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={activeConversation.status}
              onChange={(e) => updateStatus(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none"
            >
              <option value="open">Open</option>
              <option value="awaiting_support">Awaiting Support</option>
              <option value="awaiting_customer">Awaiting Customer</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => {
            const isAdmin = msg.sender_type === "admin";
            return (
              <div key={msg.id} className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}>
                <div className={`max-w-[75%] p-4 rounded-2xl ${
                  isAdmin 
                    ? "bg-primary text-primary-foreground rounded-tr-sm" 
                    : "bg-muted/50 border border-border/50 text-foreground rounded-tl-sm"
                }`}>
                  <p className="text-[10px] font-bold tracking-widest uppercase mb-2 opacity-70">
                    {isAdmin ? "TAKEIN STUDIO (YOU)" : (activeConversation.vault_profiles?.full_name || "CUSTOMER")}
                  </p>
                  <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                </div>
                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                  {new Date(msg.created_at).toLocaleString()}
                </span>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Reply Area */}
        <div className="p-4 border-t border-border/50 bg-muted/10">
          <form onSubmit={handleReply} className="flex items-end gap-3 max-w-4xl mx-auto">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Reply to ${activeConversation.vault_profiles?.full_name || 'customer'}...`}
              rows={3}
              className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
            <button 
              type="submit"
              disabled={!replyText.trim()}
              className="bg-primary text-primary-foreground p-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden min-h-[60vh]">
      <div className="p-4 border-b border-border/50 flex justify-between items-center bg-muted/20">
        <div className="flex gap-2">
          {["all", "open", "awaiting_support", "awaiting_customer", "resolved"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                filter === f ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>
      
      {loading ? (
        <div className="p-8 text-center text-muted-foreground animate-pulse">Loading conversations...</div>
      ) : conversations.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground">
          <MessageSquare size={40} className="mx-auto mb-4 opacity-20" />
          <p>No conversations found.</p>
        </div>
      ) : (
        <div className="divide-y divide-border/50">
          {conversations.map(conv => (
            <div 
              key={conv.id} 
              onClick={() => loadConversation(conv)}
              className="p-4 hover:bg-muted/20 cursor-pointer transition-colors flex items-center justify-between"
            >
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    conv.status === 'resolved' || conv.status === 'closed' ? 'bg-emerald-500/10 text-emerald-500' :
                    conv.status === 'awaiting_customer' ? 'bg-orange-500/10 text-orange-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    {conv.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-muted-foreground">#{conv.id.split('-')[0].toUpperCase()}</span>
                </div>
                <h4 className="font-bold text-sm text-foreground truncate">{conv.subject}</h4>
                <p className="text-xs text-muted-foreground truncate mt-1">
                  {conv.vault_profiles?.full_name || conv.vault_profiles?.email} • {conv.category}
                </p>
              </div>
              <div className="text-right whitespace-nowrap text-xs text-muted-foreground">
                <p className="mb-1">{new Date(conv.updated_at).toLocaleDateString()}</p>
                <p>{new Date(conv.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
