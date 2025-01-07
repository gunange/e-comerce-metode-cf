import { RegisterService } from "@/controllers/services/pelanggan";
import { Hono } from "hono";

export const userController = new Hono();
userController.post("/api/user/login", async (e) =>
   e.json({
      data: RegisterService.register(await e.req.json()),
   })
);
