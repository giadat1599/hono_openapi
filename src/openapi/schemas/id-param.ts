import { z } from "@hono/zod-openapi";

const IdParamSchema = z.object({
  id: z.coerce.number().openapi({
    param: {
      name: "id",
      in: "path",
    },
    required: ["id"],
    example: 42,
  }),
});

export default IdParamSchema;
