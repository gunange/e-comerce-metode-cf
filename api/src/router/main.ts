import { Hono } from "hono";
import { PelangganController } from "@/controllers/controller/main/pelanggan-controller";
import { SellerController } from "@/controllers/controller/main/seler-controller";

export const mainRoute = new Hono();
mainRoute.post("/register/pelanggan", PelangganController.register);
mainRoute.post("/register/seller", SellerController.register);
