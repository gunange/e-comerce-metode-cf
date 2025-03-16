import { Hono } from "hono";
import { Auth } from "@/middleware/Auth";
import * as Controller from "@/controllers/controller/pelanggan";
import { KeranjangController } from "@/controllers/controller/pelanggan/keanjang-controller";


export const pelanggan = new Hono();

pelanggan.use("/*", Auth.bearer);
pelanggan.use(async(c, next) =>{
    await Controller.MainController.setUser(c)
    await next();
})
pelanggan.get("/keranjang", KeranjangController.index);
pelanggan.post("/keranjang", KeranjangController.add);