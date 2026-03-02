import { jsonSchemaTransform } from "fastify-type-provider-zod";

type TransformSwaggerSchemaDAta = Parameters<typeof jsonSchemaTransform>[0];

type OpenApiBody = {
  type: "object";
  required: string[];
  properties: Record<string, unknown>;
};

export function transformSwaggerSchema(data: TransformSwaggerSchemaDAta) {
  const { schema, url } = jsonSchemaTransform(data);

  if (schema.consumes?.includes("multipart/form-data")) {
    if (schema.body === undefined) {
      schema.body = {
        type: "object",
        required: [],
        properties: {},
      } satisfies OpenApiBody;
    }

    const body = schema.body as OpenApiBody;

    body.properties.file = {
      type: "string",
      format: "binary",
    };

    body.required.push("file");
  }

  return { schema, url };
}
