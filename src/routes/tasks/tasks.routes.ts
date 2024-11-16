import { createRoute, z } from "@hono/zod-openapi";

import { insertTaskSchema, selectTaskSchema } from "@/db/schema";
import * as HttpStatusCodes from "@/http-status-codes";
import jsonContent from "@/openapi/helpers/json-content";
import jsonContentRequired from "@/openapi/helpers/json-content-required";
import createErrorSchema from "@/openapi/schemas/create-error-schema";

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

export const create = createRoute({
  path: "/tasks",
  method: "post",
  tags,
  request: {
    body: jsonContentRequired(insertTaskSchema, "The task to create"),
  },
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(
      selectTaskSchema,
      "The created task",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(insertTaskSchema), "The validation error"),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
