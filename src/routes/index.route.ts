import { createRoute } from "@hono/zod-openapi";

import * as HttpStatusCodes from "@/http-status-codes";
import { createRouter } from "@/lib/create-app";
import jsonContent from "@/openapi/helpers/json-content";
import createMessageObjectSchema from "@/openapi/schemas/create-message-object";

const router = createRouter().openapi(createRoute({
  tags: ["Index"],
  method: "get",
  path: "/",
  responses: {
    [HttpStatusCodes.OK]: jsonContent(createMessageObjectSchema("Tasks API ABC"), "Tasks Api"),
  },
}), (c) => {
  return c.json({
    message: "Tasks API111",
  }, HttpStatusCodes.OK);
});

export default router;
