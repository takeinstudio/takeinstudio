import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import WorkPage from "@/pages/WorkPage";
import ContactPage from "@/pages/ContactPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import JoinUs from "@/pages/JoinUs";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/legal/Privacy";
import TermsOfService from "@/pages/legal/Terms";
import CookiePolicy from "@/pages/legal/Cookies";
import { useEffect } from "react";

// Service Pages
import WebDevBhubaneswar from "@/pages/services/WebDevBhubaneswar";
import AppDevBhubaneswar from "@/pages/services/AppDevBhubaneswar";
import WebDevGlobal from "@/pages/services/WebDevGlobal";
import AppDevGlobal from "@/pages/services/AppDevGlobal";
import UXDesignAgency from "@/pages/services/UXDesignAgency";
import Locations from "@/pages/Locations";

// Blog
import WebsiteCostBhubaneswar from "@/pages/blog/WebsiteCostBhubaneswar";

// Projects
import FitZoneProject from "@/pages/projects/FitZoneProject";
import MediCareProject from "@/pages/projects/MediCareProject";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/join" element={<JoinUs />} />
              <Route path="/contact" element={<ContactPage />} />
              
              {/* Service Pages */}
              <Route path="/web-development" element={<WebDevGlobal />} />
              <Route path="/mobile-app-development" element={<AppDevGlobal />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/web-development-bhubaneswar" element={<WebDevBhubaneswar />} />
              <Route path="/mobile-app-development-bhubaneswar" element={<AppDevBhubaneswar />} />
              <Route path="/ui-ux-design-agency" element={<UXDesignAgency />} />

              {/* Blog */}
              <Route path="/blog/website-development-cost-bhubaneswar" element={<WebsiteCostBhubaneswar />} />

              {/* Projects */}
              <Route path="/projects/fitzone-gym-app" element={<FitZoneProject />} />
              <Route path="/projects/medicare-portal" element={<MediCareProject />} />

              <Route path="/admin" element={<AdminLoginPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Legal */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
