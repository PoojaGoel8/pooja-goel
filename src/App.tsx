import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import SiteLayout from "./components/SiteLayout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import AiEnablement from "./pages/AiEnablement";
import Experience from "./pages/Experience";
import Studio from "./pages/Studio";
import NotFound from "./pages/NotFound";

/** The page was called Work until it became Projects; old links, anchors included, still land. */
function WorkRedirect() {
  const { hash } = useLocation();
  return <Navigate to={`/projects${hash}`} replace />;
}

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/ai-enablement" element={<AiEnablement />} />
        <Route path="/studio" element={<Studio />} />
        {/* Tutoring now lives as a band inside Studio; keep the old link working. */}
        <Route path="/tutoring" element={<Navigate to="/studio#tutoring" replace />} />
        <Route path="/work" element={<WorkRedirect />} />
        {/* Recommendations now live at the foot of Projects. */}
        <Route path="/testimonials" element={<Navigate to="/projects#recommendations" replace />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteLayout>
  );
}
