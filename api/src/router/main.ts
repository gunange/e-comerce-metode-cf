import { RegisterService } from "@/controllers/services/pelanggan";
import { Hono } from "hono";

export const userController = new Hono();
userController.post("/api/user/register/pelanggan", async (e) =>
   e.json({
      data: RegisterService.register(await e.req.json()),
      status: 201,
   })
);
