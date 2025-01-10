import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { BlankEnv, HTTPResponseError } from "hono/types";
import { ZodError } from "zod";

export class ErrorHeandler {
   static zodErrorHandler(err: any) {
      if (!err.success) {
         throw new ZodError(err.error.errors);
      }
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
   } else {
      c.status(500);
   }
   return c.json({
      errors: err.message || "Internal Server Error",
   });
}
