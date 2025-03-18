import * as util from "@/controllers/services/util";

export class HeandleRequest {
   static async parse(c: util.Context): Promise<any> {
      let body;

      try {
         body = await c.req.json();
         if (!body || Object.keys(body).length === 0) {
            throw new Error("Empty JSON");
         }
      } catch (_) {
         try {
            body = await c.req.parseBody();
            if (!body || Object.keys(body).length === 0) {
               throw new Error("Empty Body");
            }
         } catch (err) {
            util.ErrorHeandler.jsonCatch();
         }
      }

      return this.convertTypes(body);
   }

   static convertTypes(data: Record<string, any>): Record<string, any> {
      return Object.fromEntries(
         Object.entries(data).map(([key, value]) => {
            if (
               typeof value === "string" &&
               !isNaN(Number(value)) &&
               value.trim() !== ""
            ) {
               return [key, Number(value)];
            }
            return [key, value];
         })
      );
   }
}
