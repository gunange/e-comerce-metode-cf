import { Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { BlankEnv, BlankSchema, HTTPResponseError } from "hono/types";
import { ZodError } from "zod";

export async function ErrorHeandler(
   err: Error | HTTPResponseError,
   c: Context<BlankEnv>
): Promise<any> {
   if (err instanceof HTTPException) {
      c.status(err.status);
   } else if (err instanceof ZodError) {
      c.status(400);
   }
   c.status(500);
   return c.json({
      errors: err.message,
   });
}
