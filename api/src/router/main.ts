import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import {
   UserValidateLogin,
} from "@/controllers/interfaces/request";

import { ErrorHeandler } from "@/middleware/ErrorHeandler";
import { UserService } from "@/controllers/services/user-service";
import { PelangganController } from "@/controllers/controller/main/pelanggan-controller";
import { SellerController } from "@/controllers/controller/main/seler-controller";

export const mainRoute = new Hono();
mainRoute.post("/register/pelanggan", PelangganController.register);
mainRoute.post("/register/seller", SellerController.register);

mainRoute.post(
   "login",
   zValidator("json", UserValidateLogin, ErrorHeandler.zodErrorHandler),
   async (e) => {
      return e.json(
         {
            data: await UserService.Login(e.req.valid("json"), e),
         },
         201
      );
   }
);
