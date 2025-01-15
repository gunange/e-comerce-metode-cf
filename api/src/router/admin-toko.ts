import { Hono } from "hono";

import * as Controller from "@/controllers/controller/admin-toko";


const pelanggan = new Hono();

pelanggan.get(Controller.PegawaiTokoController.index);

export const adminTokoRoute = new Hono();

adminTokoRoute.route("/pelanggan", pelanggan);
