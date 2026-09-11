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
import NvidiaCertification from "./pages/NvidiaCertification";
import Partners from "./pages/Partners";
import About from "./pages/About";

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
            <Route path="/best-project-award" element={<BestPaperAward />} />
            <Route path="/best-paper-award" element={<BestPaperAward />} />
            <Route path="/nvidia-certification" element={<NvidiaCertification />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
