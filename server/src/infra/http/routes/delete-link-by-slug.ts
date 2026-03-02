import { deleteLinkBySlug } from "@/app/functions/delete-link-by-slug";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:slug",
    {
      schema: {
        summary: "Delete link by slug",
        tags: ["links"],

        params: z.object({
          slug: z.string(),
        }),

        response: {
          204: z.null(),
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

      const result = await deleteLinkBySlug(slug);

      if (isRight(result)) {
        return reply.status(204).send(null);
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