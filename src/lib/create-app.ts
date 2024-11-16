import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";

import notFound from "@/middlewares/not-found.js";
import onError from "@/middlewares/on-error.js";
import { pinoLogger } from "@/middlewares/pino-logger.js";
import defaultHook from "@/openapi/default-hook.js";

import type { AppBindings } from "./types.js";

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false, defaultHook });
}

export default function createApp() {
  const app = createRouter();

  app.use(requestId());
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
