import { Hono } from "hono";
import { mainRoute } from "./router/main";
import { errorHeandler } from "./middleware/ErrorHeandler";
import { adminTokoRoute } from "./router/admin-toko";


const app = new Hono().basePath("/api");

app.route("/main", mainRoute);
app.route("/admin-toko", adminTokoRoute);

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