/**
 * src/App.tsx
 *
 * Main application component for the Dartmouth Climbing Gym website.
 */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ContactUsPage from "./pages/ContactUsPage";
import HoursPage from "./pages/HoursPage";
import NotFoundPage from "./pages/NotFoundPage";
import SafetyPage from "./pages/SafetyPage";
import ServicesPage from "./pages/ServicesPage";
import VisitUsPage from "./pages/VisitUsPage";

// Placeholders — replaced as each phase completes
function Placeholder({ name }: { name: string }) {
  return (
    <main className="flex flex-1 items-center justify-center font-jost text-2xl text-forest-green">
      {name}
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />

        <Routes>
          <Route path="/" element={<Placeholder name="Landing Page" />} />
          <Route path="/visit-us" element={<VisitUsPage />} />
          <Route path="/safety" element={<SafetyPage />} />
          <Route path="/hours" element={<HoursPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/signin" element={<Placeholder name="Sign In" />} />
          <Route path="/waiver" element={<Placeholder name="Waiver" />} />
          <Route path="/admin" element={<Placeholder name="Admin" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
