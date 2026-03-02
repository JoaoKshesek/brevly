import { createLink } from "@/app/functions/create-link";
import { isRight, unwrapEither } from "@/infra/shared/either";

import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create short link",
        tags: ["links"],

        body: z.object({
          originalUrl: z.string(),
          slug: z.string(),
        }),

        response: {
          201: z.object({
            success: z.literal(true),
          }),
          400: z.object({
            message: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const result = await createLink(request.body);

      if (isRight(result)) {
        return reply.status(201).send({ success: true });
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "InvalidURLFormat":
        case "InvalidSlugFormat":
          return reply.status(400).send({ message: error.message });

        case "SlugAlreadyExists":
          return reply.status(409).send({ message: error.message });

        default:
          return reply.status(400).send({ message: "Unexpected error." });
      }
    },
  );
};