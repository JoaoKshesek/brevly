import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "@/pages/home/home.page";

import { RedirectPage } from "@/pages/redirect/redirect.page";
import { NotFoundPage } from "@/pages/not-found/not-found.page";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/:slug" element={<RedirectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
