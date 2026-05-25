import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

if (window.location.hostname === "www.resortsoffers.com") {
  window.location.replace(`https://resortsoffers.com${window.location.pathname}${window.location.search}${window.location.hash}`);
}

createRoot(document.getElementById("root")!).render(<App />);
