import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { tasks } from "@/db/schema";
import * as HttpStatusCodes from "@/http-status-codes";

import type { CreateRoute, ListRoute } from "./tasks.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks, HttpStatusCodes.OK);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json");
  const [insertedTask] = await db.insert(tasks).values(task).returning();
  return c.json(insertedTask, HttpStatusCodes.CREATED);
};
