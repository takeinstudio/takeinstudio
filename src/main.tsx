import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ContentProvider } from "./context/ContentContext";
import { ClerkProvider } from "@clerk/clerk-react";
import { HelmetProvider } from 'react-helmet-async';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  // Rather than crashing the entire app if the user hasn't put the key in .env yet, 
  // we just render a friendly fallback screen.
  createRoot(document.getElementById("root")!).render(
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', background: '#111', color: '#fff' }}>
      <h1>Authentication Missing</h1>
      <p>Please add your <strong>VITE_CLERK_PUBLISHABLE_KEY</strong> to your <code>.env</code> file.</p>
    </div>
  );
} else {
  createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ContentProvider>
          <App />
        </ContentProvider>
      </ClerkProvider>
    </HelmetProvider>
  );
}
