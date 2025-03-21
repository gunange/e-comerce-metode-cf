import { Hono } from "hono";

import * as Controller from "@/controllers/controller/staff";
import { Auth } from "@/middleware/Auth";

export const stafRoute = new Hono();

// yang ada dibawah ini butuh authentikasi
stafRoute.use("/*", Auth.bearer, async (c, next) => {
   await Controller.MainController.setUser(c);
   await next();
});

stafRoute.get("/product", Controller.ProductController.index);
stafRoute.post("/product", Controller.ProductController.create);
stafRoute.patch("/product/:id", Controller.ProductController.update);
stafRoute.delete("/product/:id", Controller.ProductController.del);
stafRoute.patch("/product/stock/:id", Controller.ProductController.upStock);

stafRoute.get("/order", Controller.OrderController.index);
stafRoute.patch("/order/terima/:id", Controller.OrderController.terima);
stafRoute.patch("/order/batalkan/:id", Controller.OrderController.dibatalkan);
