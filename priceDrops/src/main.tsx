import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import NotFound from "./pages/notFound.tsx";
import Create from "./Create.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sign-up" element={<Create />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </StrictMode>
);
