import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DirectionProvider } from "@/components/foundations/direction/direction";
import { pages } from "@/pages";
import "@/styles/site.css";

const root = document.getElementById("root")!;
const Page = pages[root.dataset.page ?? ""];

createRoot(root).render(
  <StrictMode>
    <DirectionProvider locale="en-US">{Page ? <Page /> : null}</DirectionProvider>
  </StrictMode>,
);
