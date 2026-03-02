import { api } from "@/shared/lib/api/client";
import type { CreateLinkDTO } from "../types/link.types";

export function createLink(data: CreateLinkDTO) {
  return api<{ success: true }>("/links", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
