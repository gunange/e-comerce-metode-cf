import { Hono } from "hono";
import { PelangganController } from "@/controllers/controller/main/pelanggan-controller";
import { SellerController } from "@/controllers/controller/main/seler-controller";
import { ProductController } from "@/controllers/controller/main/product-controller";

export const mainRoute = new Hono();
mainRoute.post("/register/pelanggan", PelangganController.register);
mainRoute.post("/register/seller", SellerController.register);

mainRoute.get("/product/kategori/:kategori", ProductController.kategori);


