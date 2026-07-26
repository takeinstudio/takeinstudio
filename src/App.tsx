import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingSidebar from "@/components/FloatingSidebar";
import LeadPopup from "@/components/LeadPopup";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import WorkPage from "@/pages/WorkPage";
import ServicesPage from "@/pages/ServicesPage";
import PricingPage from "@/pages/PricingPage";
import FaqsPage from "@/pages/FaqsPage";
import CareerPage from "@/pages/CareerPage";
import ContactPage from "@/pages/ContactPage";
import LoginPage from "@/pages/LoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import TestimonialsPage from "@/pages/TestimonialsPage";
import ApplicationPage from "@/pages/ApplicationPage";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/legal/Privacy";
import TermsOfService from "@/pages/legal/Terms";
import CookiePolicy from "@/pages/legal/Cookies";
import RefundPolicy from "@/pages/legal/RefundPolicy";
import CancellationPolicy from "@/pages/legal/CancellationPolicy";
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
import VertexBuildProject from "@/pages/projects/VertexBuildProject";
import NexaHealthProject from "@/pages/projects/NexaHealthProject";
import LuxeLoungesProject from "@/pages/projects/LuxeLoungesProject";
import VaultMediaProject from "@/pages/projects/VaultMediaProject";

// Vault
import AIWebDevPage from "@/pages/vault/AIWebDevPage";
import AIWebDevCheckout from "@/pages/vault/AIWebDevCheckout";
import AIWebDevPaymentSuccess from "@/pages/vault/AIWebDevPaymentSuccess";
import VaultPage from "@/pages/vault/VaultPage";
import VaultLogin from "@/pages/vault/VaultLogin";
import VaultDashboard from "@/pages/vault/VaultDashboard";
import AIWebDevAccess from "@/pages/vault/AIWebDevAccess";
import MyVault from "@/pages/vault/MyVault";
import ExploreVault from "@/pages/vault/ExploreVault";
import SupportVault from "@/pages/vault/SupportVault";
import AccountVault from "@/pages/vault/AccountVault";
import UpdatePassword from "@/pages/vault/UpdatePassword";
import ProductViewer from "@/pages/vault/ProductViewer";
import VaultProtectedRoute from "@/components/vault/VaultProtectedRoute";
import VaultDashboardLayout from "@/components/vault/VaultDashboardLayout";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const hideNavFooter =
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/apply") ||
    pathname.startsWith("/vault");

  if (hideNavFooter) return <>{children}</>;

  return (
    <>
      <Navbar />
      <FloatingSidebar />
      <LeadPopup />
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
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/faqs" element={<FaqsPage />} />
              <Route path="/career" element={<CareerPage />} />
              <Route path="/apply" element={<ApplicationPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />

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
              <Route path="/projects/vertex-build-erp" element={<VertexBuildProject />} />
              <Route path="/projects/nexa-health-portal" element={<NexaHealthProject />} />
              <Route path="/projects/luxe-lounges-portal" element={<LuxeLoungesProject />} />
              <Route path="/projects/vault-media-server" element={<VaultMediaProject />} />

              {/* Vault public pages */}
              <Route path="/vault" element={<VaultPage />} />
              <Route path="/vault/aiwebdev" element={<AIWebDevPage />} />
              <Route path="/vault/aiwebdev/checkout" element={<AIWebDevCheckout />} />
              <Route path="/vault/aiwebdev/payment-success" element={<AIWebDevPaymentSuccess />} />
              <Route path="/vault/login" element={<VaultLogin />} />
              <Route path="/vault/update-password" element={<UpdatePassword />} />
              
              <Route path="/vault/dashboard" element={<VaultProtectedRoute><VaultDashboardLayout><VaultDashboard /></VaultDashboardLayout></VaultProtectedRoute>} />
              <Route path="/vault/dashboard/my-vault" element={<VaultProtectedRoute><VaultDashboardLayout><MyVault /></VaultDashboardLayout></VaultProtectedRoute>} />
              <Route path="/vault/dashboard/explore" element={<VaultProtectedRoute><VaultDashboardLayout><ExploreVault /></VaultDashboardLayout></VaultProtectedRoute>} />
              <Route path="/vault/dashboard/support" element={<VaultProtectedRoute><VaultDashboardLayout><SupportVault /></VaultDashboardLayout></VaultProtectedRoute>} />
              <Route path="/vault/dashboard/account" element={<VaultProtectedRoute><VaultDashboardLayout><AccountVault /></VaultDashboardLayout></VaultProtectedRoute>} />
              
              <Route path="/vault/aiwebdev/access" element={<VaultProtectedRoute><AIWebDevAccess /></VaultProtectedRoute>} />
              <Route path="/vault/aiwebdev/access/:volumeId" element={<VaultProtectedRoute><AIWebDevAccess /></VaultProtectedRoute>} />
              <Route path="/vault/view/:productId" element={<VaultProtectedRoute><ProductViewer /></VaultProtectedRoute>} />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<AdminDashboard />} />

              {/* Legal */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsOfService />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
