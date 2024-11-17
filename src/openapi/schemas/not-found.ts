import * as HttpStatusPhrases from "@/http-status-phrases";

import createMessageObjectSchema from "./create-message-object";

const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);

export default notFoundSchema;
