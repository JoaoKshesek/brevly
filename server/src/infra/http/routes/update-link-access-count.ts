import { incrementLinkAccessCount } from "@/app/functions/increment-link-access-count";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const updateLinkAccessCount: FastifyPluginAsyncZod = async (
  server,
) => {
  server.put(
    "/links/:slug",
    {
      schema: {
        summary: "Increment link access count by slug",
        tags: ["links"],

        params: z.object({
          slug: z.string(),
        }),

        response: {
          200: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { slug } = request.params;

      const result = await incrementLinkAccessCount(slug);

      if (isRight(result)) {
        return reply.status(200).send({ message: "" });
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "LinkNotFound":
          return reply.status(404).send({ message: error.message });

        default:
          return reply.status(400).send({ message: "Unexpected error." });
      }
    },
  );
};
