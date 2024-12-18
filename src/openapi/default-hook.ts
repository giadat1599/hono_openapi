import type { Hook } from "@hono/zod-openapi";

import * as HttpStatusCodes from "@/http-status-codes";

const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json({
      success: false,
      error: result.error,
    }, HttpStatusCodes.UNPROCESSABLE_ENTITY);
  }
};

export default defaultHook;
