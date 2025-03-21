import * as util from "@/controllers/services/util";

export class StaffRequest {
   static async resetPassword(c: util.Context): Promise<any> {
      const validate: util.ZodType = util.zod.object({
         password: util.zod.union([
            util.zod.string().max(100),
            util.zod.number(),
         ]),
      });

      let data = await validate.parse(await util.HeandleRequest.parse(c));

      return data;
   }
}
