import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "@/env";
import { getLinksRoute } from "./routes/get-links";
import { exportLinksRoute } from "./routes/export-links";
import { createLinksRoute } from "./routes/create-link";
import { transformSwaggerSchema } from "./transform-swagger-schema";
import { getLinkBySlugRoute } from "./routes/get-link-by-slug";
import { deleteLinkRoute } from "./routes/delete-link-by-slug";
import { updateLinkAccessCount } from "./routes/update-link-access-count";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (req, body, done) => {
    if (!body) {
      return done(null, {});
    }

    try {
      const json =
        typeof body === "string"
          ? JSON.parse(body)
          : JSON.parse(body.toString());

      done(null, json);
    } catch (err) {
      done(err instanceof Error ? err : new Error("Invalid JSON"));
    }
  },
);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: "Validation error",
      issues: error.validation,
    });
  }

  return reply.status(500).send({ message: "Internal server error." });
});

server.register(fastifyCors, {
  origin: [env.FRONTEND_URL, "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
});

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: " Brev.ly Server",
      version: "1.0.0",
    },
  },
  transform: transformSwaggerSchema,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(createLinksRoute);
server.register(getLinksRoute);
server.register(deleteLinkRoute);
server.register(getLinkBySlugRoute);
server.register(exportLinksRoute);
server.register(updateLinkAccessCount);

server.listen({ port: env.PORT, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP Server running at port ${env.PORT}!`);
});
