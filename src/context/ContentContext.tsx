import { supabase } from '@/lib/supabase';
import React, { createContext, useContext, useState, useEffect } from 'react';

const API_BASE = window.location.hostname === "localhost" ? "http://localhost:8000" : "/api";

interface ContentContextType {
  content: Record<string, string>;
  loading: boolean;
  refreshContent: () => Promise<void>;
  getText: (key: string, fallback: string) => string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    try {
      const res = await supabase.from('content').select('*');
      setContent(res.data ? res.data.reduce((acc, curr) => ({ ...acc, [curr.section_key]: curr.text_value }), {}) : {});
    } catch (err) {
      console.error("Failed to fetch dynamic content", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const getText = (key: string, fallback: string) => {
    return content[key] || fallback;
  };

  return (
    <ContentContext.Provider value={{ content, loading, refreshContent: fetchContent, getText }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
