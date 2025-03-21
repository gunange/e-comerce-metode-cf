import { Hono } from "hono";

import * as Controller from "@/controllers/controller/admin-toko";
import { Auth } from "@/middleware/Auth";

export const adminTokoRoute = new Hono();

// yang ada dibawah ini butuh authentikasi
adminTokoRoute.use("/*", Auth.bearer, async (c, next) => {
   await Controller.MainController.setUser(c);
   await next();
});

adminTokoRoute.get("/staff", Controller.StaffController.index);
adminTokoRoute.post("/staff", Controller.StaffController.insert);
adminTokoRoute.patch("/staff/:id", Controller.StaffController.update);
adminTokoRoute.delete("/staff/:id", Controller.StaffController.del);
adminTokoRoute.patch("/staff/reset-password/:id", Controller.StaffController.resetPassword);

adminTokoRoute.get("/product", Controller.ProductController.index);
adminTokoRoute.post("/product", Controller.ProductController.create);
adminTokoRoute.patch("/product/:id", Controller.ProductController.update);
adminTokoRoute.delete("/product/:id", Controller.ProductController.del);
adminTokoRoute.patch("/product/stock/:id", Controller.ProductController.upStock);

adminTokoRoute.get("/order", Controller.OrderController.index);
adminTokoRoute.patch("/order/terima/:id", Controller.OrderController.terima);
adminTokoRoute.patch("/order/batalkan/:id", Controller.OrderController.dibatalkan);
