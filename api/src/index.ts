import { Hono } from "hono";
import { cors } from "hono/cors";
import { mainRoute } from "./router/main";
import { errorHeandler } from "./middleware/ErrorHeandler";
import { adminTokoRoute } from "./router/admin-toko";
import { stafRoute } from "./router/staff";
import { pelanggan } from "./router/pelanggan";
import { userRoute } from "./router/user";

import { storageRoute } from "./router/storage-route";

const app = new Hono().basePath("/api");

app.use(cors());

app.route("/main", mainRoute);
app.route("/user", userRoute);
app.route("/storage", storageRoute);
app.route("/admin-toko", adminTokoRoute);
app.route("/staff", stafRoute);
app.route("/pelanggan", pelanggan);

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
