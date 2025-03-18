import * as util from "@/controllers/services/util";

export class HeandleRequest {
   static async parse(c: util.Context): Promise<any> {
      let body = null;
      try {
         const contentType = c.req.header("content-type") || "";

         if (contentType.includes("application/json")) {
            body = await c.req.json();
         } else if (contentType.includes("application/x-www-form-urlencoded")) {
            body = await c.req.parseBody();
         } else {
            throw new Error("Unsupported Content-Type");
         }
      } catch (err) {
         return util.ErrorHeandler.jsonCatch(err);
      }

      if (
         !body ||
         (typeof body === "object" && Object.keys(body).length === 0)
      ) {
         return util.ErrorHeandler.jsonCatch(new Error("Body request kosong"));
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
