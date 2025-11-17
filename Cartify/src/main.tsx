import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root") as HTMLElement;

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
