import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";
import { requestId } from "hono/request-id";

import notFound from "./middlewares/not-found.js";
import onError from "./middlewares/on-error.js";
import { pinoLogger } from "./middlewares/pino-logger.js";

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

const app = new OpenAPIHono<AppBindings>();

app.use(requestId());
app.use(pinoLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/error", (c) => {
  c.var.logger.debug("Ddevvvvv");
  throw new Error("Oh shiit");
});

app.notFound(notFound);
app.onError(onError);

export default app;
