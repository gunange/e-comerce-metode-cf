import { RegisterService as PelanggaRegisterService } from "@/controllers/services/pelanggan";
import { RegisterService as AdminTokoRegisterService } from "@/controllers/services/admin-toko";
import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import {
   PelangganValidateRequest,
   AdminTokoValidateRequest,
} from "@/controllers/interfaces/request";

import { ErrorHeandler } from "@/middleware/ErrorHeandler";

export const mainController = new Hono();
mainController.post(
   "/register/pelanggan",
   zValidator("json", PelangganValidateRequest, ErrorHeandler.zodErrorHandler),
   async (e) => {
      return e.json(
         {
            data: await PelanggaRegisterService.register(e.req.valid("json")),
         },
         201
      );
   }
);
mainController.post(
   "/register/seller",
   zValidator(
      "json",
      AdminTokoValidateRequest,
      ErrorHeandler.zodErrorHandler
   ),
   async (e) => {
      return e.json(
         {
            data: await AdminTokoRegisterService.register(e.req.valid("json")),
         },
         201
      );
   }
);
