import { Hono } from "hono";
import { mainController } from "./router/main";
import { errorHeandler } from "./middleware/ErrorHeandler";


const app = new Hono().basePath("/api");

app.route("/main", mainController);

app.notFound((c) => {
   return c.json(
      {
         message: "Not Found",
         errors: "Resource Not Found",
      },
      404
   );
});

app.onError(errorHeandler);
export default app;