import type { Context } from "hono";

export class PegawaiTokoController {
   static async index(c: Context): Promise<any> {

      
      return c.json(
         {
            data: {
               message: "OK",
            },
         },
         200
      );
   }
}
