import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { SellerRegisterService } from "@/controllers/services/other";

import {
   AdminTokoValidateRequest,
   UserValidateLogin,
} from "@/controllers/interfaces/request";

import { ErrorHeandler } from "@/middleware/ErrorHeandler";
import { UserService } from "@/controllers/services/user-service";
import { PelangganController } from "@/controllers/controller/main/pelanggan-controller";

export const mainRoute = new Hono();
mainRoute.post("/register/pelanggan", PelangganController.register);
mainRoute.post(
   "/register/seller",
   zValidator("json", AdminTokoValidateRequest, ErrorHeandler.zodErrorHandler),
   async (e) => {
      return e.json(
         {
            data: await SellerRegisterService.register(e.req.valid("json")),
         },
         200
      );
   }
);
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
