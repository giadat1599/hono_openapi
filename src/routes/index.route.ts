import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

import { createRouter } from "@/lib/create-app.js";

const router = createRouter().openapi(createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Tasks API Index",
    },
  },
}), (c) => {
  return c.json({
    message: "Tasks API",
  }, 200);
});

export default router;
