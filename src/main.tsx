
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  // Preview other palettes with ?palette=b or ?palette=c
  const palette = new URLSearchParams(window.location.search).get("palette");
  if (palette) document.documentElement.dataset.palette = palette;

  createRoot(document.getElementById("root")!).render(<App />);
  