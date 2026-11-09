import { Navigate, Route, Routes } from "react-router-dom";

import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import Work from "./pages/Work";
import AiEnablement from "./pages/AiEnablement";
import Experience from "./pages/Experience";
import Studio from "./pages/Studio";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/ai-enablement" element={<AiEnablement />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/studio" element={<Studio />} />
        {/* Tutoring now lives as a band inside Studio; keep the old link working. */}
        <Route path="/tutoring" element={<Navigate to="/studio#tutoring" replace />} />
        {/* Recommendations now live at the foot of Work. */}
        <Route path="/testimonials" element={<Navigate to="/work#recommendations" replace />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteLayout>
  );
}
