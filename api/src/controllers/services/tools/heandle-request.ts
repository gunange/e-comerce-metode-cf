import * as util from "@/controllers/services/util";

export class HeandleRequest {
   static async parse(c: util.Context): Promise<any> {
      let body;
      try {
         body = await c.req.json().catch(util.ErrorHeandler.jsonCatch);
      } catch (_) {
         body = await c.req.parseBody().catch(util.ErrorHeandler.jsonCatch);
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
