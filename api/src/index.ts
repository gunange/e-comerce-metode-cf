import { Hono } from "hono";
import { mainRoute } from "./router/main";
import { errorHeandler } from "./middleware/ErrorHeandler";
import { adminTokoRoute } from "./router/admin-toko";
import { userRoute } from "./router/user";
import { Auth } from "@/middleware/Auth";
import { storageRoute } from "./router/storage-route";

const app = new Hono().basePath("/api");

app.route("/main", mainRoute);
app.route("/user", userRoute);
app.route("/storage", storageRoute);

// yang ada dibawah ini butuh authentikasi
app.use(
   "/*",
   Auth.bearer
);

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
