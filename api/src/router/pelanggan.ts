import { Hono } from "hono";
import { Auth } from "@/middleware/Auth";
import * as Controller from "@/controllers/controller/pelanggan";



export const pelanggan = new Hono();


pelanggan.use("/*", Auth.bearer, async (c, next) => {
    await Controller.MainController.setUser(c);
    await next();
 });
pelanggan.get("/keranjang", Controller.KeranjangController.index);
pelanggan.post("/keranjang", Controller.KeranjangController.add);
pelanggan.delete("/keranjang/:id", Controller.KeranjangController.del);


pelanggan.post("/order", Controller.OrderController.add);

pelanggan.get("/pesanan", Controller.PesananController.index);
pelanggan.patch("/pesanan/terima/:id", Controller.PesananController.terima);

pelanggan.get("/rekomendasi/:pelanggan_id", Controller.RekomendasiController.index);