import { RegisterService } from "@/controllers/services/pelanggan";
import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { PelangganValidateRequest } from "@/controllers/interfaces/request";

import { ErrorHeandler } from "@/middleware/ErrorHeandler";

export const mainController = new Hono().basePath("/register");
mainController.post(
   "/pelanggan",
   zValidator("json", PelangganValidateRequest, ErrorHeandler.zodErrorHandler),
   async (e) => {
      return e.json({
         data: await RegisterService.register( e.req.valid("json")),
      }, 201);
   }
);
