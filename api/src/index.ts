import { Hono } from "hono";
import { userController } from "./router/main";

import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

const app = new Hono();

app.get("/", (c) => {
   return c.text("Hello Hono!");
});

app.route("/", userController);

app.onError(async (err, c) => {
   const test = err instanceof ZodError;
   console.error("Error instanse:", test);

   if (err instanceof HTTPException) {
      c.status(err.status);
   }
   if (err instanceof ZodError) {
      c.status(400);
   } else {
      c.status(500);
   }
   return c.json({
      errors: err.message || "Internal Server Error",
   });
});

export default app;
