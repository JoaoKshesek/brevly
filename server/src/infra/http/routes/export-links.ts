import { exportLinks } from "@/app/functions/export-links";
import { isRight, unwrapEither } from "@/infra/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links/export",
    {
      schema: {
        summary: "Export links",
        tags: ["links"],
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
          500: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (_request, reply) => {
      const result = await exportLinks();

      if (isRight(result)) {
        const { reportUrl } = unwrapEither(result);
        return reply.status(200).send({ reportUrl });
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "ExportFailed":
          return reply.status(400).send({ message: error.message });

        default:
          return reply.status(500).send({ message: "Unexpected error." });
      }
    },
  );
};
