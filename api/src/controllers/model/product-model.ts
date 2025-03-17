import * as util from "@/controllers/services/util";


export class ProductModel {
   static async chechAndDecrement(
      product_id: number,
      quantity: number
   ): Promise<void> {
      const db = await util.dbClient.product.findFirstOrThrow({
         where: {
            id: product_id,
         },
      });

      if (Number(db.stock) < quantity) {
         throw new util.HTTPException(403, {
            message: `Stock Product tidak sesuai, kini stock product tersisa ${db.stock}`,
         });
      }

      await util.dbClient.product.update({
         where: {
            id: db.id,
         },
         data: {
            stock: {
                decrement : quantity,
            },
         },
      });
   }
}
