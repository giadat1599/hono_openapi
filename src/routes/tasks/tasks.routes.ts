import { createRoute, z } from "@hono/zod-openapi";

import { selectTaskSchema } from "@/db/schema";
import * as HttpStatusCodes from "@/http-status-codes";
import jsonContent from "@/openapi/helpers/json-content";

const tags = ["Tasks"];

export const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTaskSchema),
      "The list of tasks",
    ),
  },
});

export type ListRoute = typeof list;
