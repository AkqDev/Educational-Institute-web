import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { initSmoothScroll } from "./lib/smoothScroll";
import { initMicroInteractions } from "./lib/microInteractions";

const AppWithAnimations = () => {
  useEffect(() => {
    initSmoothScroll();
    
    // Initialize micro-interactions after a short delay to ensure DOM is ready
    setTimeout(() => {
      initMicroInteractions();
    }, 100);
  }, []);

  return <App />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppWithAnimations />
    </BrowserRouter>
  </StrictMode>
);
