import type { ZodSchema } from "zod";

import jsonContent from "./json-content";

function jsonContentRequired<T extends ZodSchema>(schema: T, description: string) {
  return {
    ...jsonContent(schema, description),
    required: true,
  };
}

export default jsonContentRequired;
