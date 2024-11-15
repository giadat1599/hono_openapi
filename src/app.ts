import index from "@/routes/index.route.js";

import configureOpenAPI from "./lib/configure-open-api.js";
import createApp from "./lib/create-app.js";

const app = createApp();
const routes = [
  index,
];
configureOpenAPI(app);

routes.forEach((route) => {
  app.route("/", route);
});

export default app;
