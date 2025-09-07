import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // only affects development build, enables additional checks and warnings to avoid errors
  <StrictMode>
    {/* enables routes */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
