import { Hono } from "hono";
import { Auth } from "@/middleware/Auth";
import * as Controller from "@/controllers/controller/pelanggan";
import { ProductController } from "@/controllers/controller/pelanggan/product-controller.ts";


export const pelanggan = new Hono();

pelanggan.use("/*", Auth.bearer);
pelanggan.use(async(c, next) =>{
    await Controller.MainController.setUser(c)
    await next();
})
pelanggan.get("/pesanan-saya/:id", ProductController.pesananSaya);