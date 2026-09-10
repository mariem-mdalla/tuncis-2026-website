import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Programme from "./pages/Programme";
import CallForCommunications from "./pages/CallForCommunications";
import Committees from "./pages/Committees";
import Registration from "./pages/Registration";
import PracticalInfo from "./pages/PracticalInfo";
import BestPaperAward from "./pages/BestPaperAward";
import Partners from "./pages/Partners";
import About from "./pages/About";

// Temporary placeholders for new pages
function PlaceholderPage({ title }) {
  return (
    <div className="py-24 max-w-4xl mx-auto px-6 text-center min-h-[50vh]">
      <h1 className="text-3xl font-heading font-bold text-tuncis-blue mb-4">{title}</h1>
      <p className="text-gray-500">This page is currently under construction.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/programme" element={<Programme />} />
            <Route path="/call-for-communications" element={<CallForCommunications />} />
            <Route path="/committees" element={<Committees />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/practical-info" element={<PracticalInfo />} />
            
            {/* New Routes */}
            <Route path="/partners" element={<Partners />} />
            <Route path="/about" element={<About />} />
            <Route path="/best-paper-award" element={<BestPaperAward />} />
            <Route path="/nvidia-certification" element={<PlaceholderPage title="NVIDIA Certification" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
