import type { ErrorHandler } from "hono";
import type { StatusCode } from "hono/utils/http-status";

import env from "@/env.js";
import { INTERNAL_SERVER_ERROR, OK } from "@/http-status-codes.js";

const onError: ErrorHandler = (err, c) => {
  const customStatus = "status" in err ? err.status : c.newResponse(null).status;

  const statusCode = customStatus !== OK ? customStatus as StatusCode : INTERNAL_SERVER_ERROR;

  return c.json({
    message: err.message,
    stack: env.NODE_ENV === "production" ? undefined : err.stack,
  }, statusCode);
};

export default onError;
