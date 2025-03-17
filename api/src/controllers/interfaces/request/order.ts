import * as util from "@/controllers/services/util";

import {ProductModel} from "@/controllers/model/product-model"

export class Order {
   static async create(c: util.Context): Promise<any> {
      const validate: util.ZodType = util.zod.object({
         product_id: util.zod.number().min(1),
         quantity: util.zod.number().min(1).max(50),
         price: util.zod.number().min(1),
         total_price: util.zod.number().min(1),
         jasa_kirim: util.zod.string().max(150),
      });

      let data = await validate.parse(await util.HeandleRequest.parse(c));
       data.pelanggan_id = Number(c.get("pelanggan").id);
       data.product_id = Number(data.product_id);

       await ProductModel.chechAndDecrement(data.product_id, data.quantity)

      return data;
   }
}

