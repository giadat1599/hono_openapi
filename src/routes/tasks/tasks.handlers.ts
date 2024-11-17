import { eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { tasks } from "@/db/schema";
import * as HttpStatusCodes from "@/http-status-codes";
import * as HttpStatusPhrases from "@/http-status-phrases";

import type { CreateRoute, GetOneRoute, ListRoute, PathUpdateRoute, RemoveRoute } from "./tasks.routes";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany();
  return c.json(tasks, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const params = c.req.valid("param");
  const task = await db.query.tasks.findFirst({
    where: (tasks, { eq }) => eq(tasks.id, params.id),
  });

  if (!task) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const pathUpdate: AppRouteHandler<PathUpdateRoute> = async (c) => {
  const params = c.req.valid("param");
  const updates = c.req.valid("json");

  const [task] = await db.update(tasks).set(updates).where(eq(tasks.id, params.id)).returning();

  if (!task) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const params = c.req.valid("param");
  const result = await db.delete(tasks).where(eq(tasks.id, params.id));

  if (result.rowsAffected === 0) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid("json");
  const [insertedTask] = await db.insert(tasks).values(task).returning();
  return c.json(insertedTask, HttpStatusCodes.CREATED);
};
