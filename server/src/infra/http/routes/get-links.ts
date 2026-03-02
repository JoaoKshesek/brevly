import { getLinks } from "@/app/functions/get-links";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links",
    {
      schema: {
        summary: "Get links",
        tags: ["links"],
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                originalUrl: z.string(),
                shortUrl: z.string(),
                accessCount: z.number(),
                createdAt: z.date(),
              }),
            ),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (_request, reply) => {

      const result = await getLinks();

      if (isRight(result)) {
        const { links } = unwrapEither(result);

        return reply.status(200).send({ links });
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "GetLinksFailed":
          return reply.status(500).send({ message: error.message });

        default:
          return reply.status(500).send({ message: "Unexpected error." });
      }
    },
  );
};
