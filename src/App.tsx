/**
 * src/App.tsx
 *
 * Main application component for the Dartmouth Climbing Gym website.
 */
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Pages — filled in during later phases
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
      <div className="flex min-h-screen flex-col bg-surface">
        <Navbar />

        <Routes>
          <Route path="/" element={<Placeholder name="Landing Page" />} />
          <Route path="/visit-us" element={<Placeholder name="Visit Us" />} />
          <Route path="/safety" element={<Placeholder name="Safety" />} />
          <Route path="/hours" element={<Placeholder name="Hours" />} />
          <Route path="/services" element={<Placeholder name="Services" />} />
          <Route path="/contact" element={<Placeholder name="Contact Us" />} />
          <Route path="/signin" element={<Placeholder name="Sign In" />} />
          <Route path="/waiver" element={<Placeholder name="Waiver" />} />
          <Route path="/admin" element={<Placeholder name="Admin" />} />
          <Route path="*" element={<Placeholder name="404 — Not Found" />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
