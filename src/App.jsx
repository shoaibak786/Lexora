
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import CaseDetails from "./pages/CaseDetails";
import CaseDocuments from "./pages/CaseDocuments";
import AIWorkspace from "./pages/AIWorkspace";
import AIAnalysis from "./pages/AIAnalysis";
import LegalDrafting from "./pages/LegalDrafting";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="/cases/:id" element={<CaseDetails />} />
      <Route path="/cases/:id/documents" element={<CaseDocuments />} />
      <Route path="/cases/:id/ai" element={<AIWorkspace />} />
      <Route path="/cases/:id/analysis" element={<AIAnalysis />} />
      <Route path="/cases/:id/drafting" element={<LegalDrafting />} />
    </Routes>
  );
};

export default App;

