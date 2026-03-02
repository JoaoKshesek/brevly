import { Toaster } from "sonner";
import { Router } from "./routes";

export function App() {
  return (
    <>
      <Router />
      <Toaster richColors position="bottom-right" />
    </>
  );
}
