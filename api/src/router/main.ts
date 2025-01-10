import { RegisterService as PelanggaRegisterService } from "@/controllers/services/pelanggan";
import { RegisterService as AdminTokoRegisterService } from "@/controllers/services/admin-toko";
import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import {
   PelangganValidateRequest,
   AdminTokoValidateRequest,
   UserValidateLogin,
} from "@/controllers/interfaces/request";

import { ErrorHeandler } from "@/middleware/ErrorHeandler";
import { UserService } from "@/controllers/services/user/user-service";

import { getConnInfo } from 'hono/bun'



export const mainController = new Hono();
mainController.post(
   "/register/pelanggan",
   zValidator("json", PelangganValidateRequest, ErrorHeandler.zodErrorHandler),
   async (e) => {
      return e.json(
         {
            data: await PelanggaRegisterService.register(e.req.valid("json")),
         },
         200
      );
   }
);
mainController.post(
   "/register/seller",
   zValidator("json", AdminTokoValidateRequest, ErrorHeandler.zodErrorHandler),
   async (e) => {
      return e.json(
         {
            data: await AdminTokoRegisterService.register(e.req.valid("json")),
         },
         200
      );
   }
);
mainController.post(
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
