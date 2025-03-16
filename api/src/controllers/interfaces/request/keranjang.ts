import * as util from "@/controllers/services/util";

export class Keranjang {
   static async create(c: util.Context): Promise<any> {
      const validate: util.ZodType = util.zod.object({
         product_id: util.zod.number().min(1),
         quantity: util.zod.number().min(1).max(11),
         price: util.zod.number().min(1),
         total_price: util.zod.number().min(1),
      });

      let data = await validate.parse(await util.HeandleRequest.parse(c));
       data.pelanggan_id = Number(c.get("pelanggan").id);
       data.product_id = Number(data.product_id);

      return data;
   }
}
