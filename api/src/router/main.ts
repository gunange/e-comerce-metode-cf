import { RegisterService } from "@/controllers/services/pelanggan";
import { Hono } from "hono";

export const mainController = new Hono().basePath("/main/register");
import { zValidator } from "@hono/zod-validator";
import {
   PelangganValidateRequest,
} from "@/controllers/interfaces/request";

import { ErrorHeandler } from "@/middleware/ErrorHeandler";

mainController.post(
   "/pelanggan",
   zValidator("form", PelangganValidateRequest, ErrorHeandler.zodErrorHandler),
   async (e) => {
      return e.json({
         data: RegisterService.register(e.req.valid("form")),
         status: 201,
      });
   }
);
