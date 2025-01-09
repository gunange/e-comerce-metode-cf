import { ZodError } from "zod";

export class ErrorHeandler {
   static zodErrorHandler(err: any) {
      if (!err.success) {
         throw new ZodError(err.error.errors);
      }
   }
}
