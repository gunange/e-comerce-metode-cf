import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { BlankEnv, HTTPResponseError } from "hono/types";
import { ZodError } from "zod";
import { Env } from "@/app/env";

import * as util from "@/controllers/services/util";

const debug = Env.debug;
const debug_stack = Env.debug_stack;

export class ErrorHeandler {
   static zodErrorHandler(err: any) {
      if (!err.success) {
         throw new ZodError(err.error.errors);
      }
   }
   static jsonCatch() {
      throw new util.HTTPException(404, {
         message: "Body tidak ditemukan",
      });
   }
}

export async function errorHeandler(
   err: Error | HTTPResponseError,
   c: Context<BlankEnv, any, {}>
) {
   if (err instanceof HTTPException) {
      c.status(err.status);
   } else if (err instanceof ZodError) {
      c.status(400);
      return c.json({
         errors: err.issues,
      });
   } else if (err instanceof PrismaClientKnownRequestError) {
      c.status(404);
      return c.json({
         errors: debug
            ? err.meta ?? "Data tidak ditemukan"
            : "Data tidak ditemukan",
         stack: debug_stack ? err.stack : null,
      });
   } else {
      c.status(500);
   }
   return c.json({
      errors: err.message || "Internal Server Error",
      stack: debug_stack ? err.stack : null,
   });
}
