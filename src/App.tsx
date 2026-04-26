/**
 * src/App.tsx
 *
 * Main application component for the Dartmouth Climbing Gym website.
 */

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import useAnonymousAuth from "./hooks/useAnonymousAuth";
import AdminPage from "./pages/AdminPage";
import ContactUsPage from "./pages/ContactUsPage";
import HoursPage from "./pages/HoursPage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import SafetyPage from "./pages/SafetyPage";
import SignInPage from "./pages/SignInPage";
import WaiverPage from "./pages/WaiverPage";
import ServicesPage from "./pages/ServicesPage";
import VisitUsPage from "./pages/VisitUsPage";

function WithChrome() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/visit-us" element={<VisitUsPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/hours" element={<HoursPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

function Bare() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/waiver" element={<WaiverPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

function AppRoutes() {
  useAnonymousAuth();
  const { pathname } = useLocation();
  const bare = ["/signin", "/waiver", "/admin"].some((p) => pathname.startsWith(p));

  return bare ? <Bare /> : <WithChrome />;
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppRoutes />
    </BrowserRouter>
  );
}
