import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z.url("Informe uma url válida"),

  slug: z
    .string()
    .min(3, "Url muito curta")
    .regex(
      /^[a-z0-9_-]+$/,
      "Informe uma url minúscula e sem espaço/caracter especial",
    ),
});

export type CreateLinkSchema = z.infer<typeof createLinkSchema>;
