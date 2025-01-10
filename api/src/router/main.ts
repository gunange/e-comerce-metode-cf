import { RegisterService } from "@/controllers/services/pelanggan";
import { Hono } from "hono";

export const mainController = new Hono().basePath("/register");
mainController.post("/pelanggan", async (e) => {
   const body = await e.req.json();
   return e.json({
      // data: await RegisterService.register( e.req.valid("form")),
      data: await RegisterService.register(body),
   }, 201);
});
