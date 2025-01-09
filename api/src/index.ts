import { Hono } from "hono";
import { mainController } from "./router/main";

import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

const app = new Hono().basePath("/api");

app.route("/", mainController);

app.notFound((c) => {
   return c.json(
      {
         message: "Not Found",
         errors: "Resource Not Found",
      },
      404
   );
});

app.onError(async (err, c) => {
   if (err instanceof HTTPException) {
      c.status(err.status);
   } else if (err instanceof ZodError) {
      c.status(400);
      return c.json({
         errors: err.issues,
      });
   } else {
      c.status(500);
   }
   return c.json({
      errors: err.message || "Internal Server Error",
   });
});

export default app;