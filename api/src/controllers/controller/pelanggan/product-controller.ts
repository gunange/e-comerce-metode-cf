
import * as util from "@/controllers/services/util";

export class ProductController {
   static async kategori(c: util.Context): Promise<any> {

      return c.json({
         data: await util.dbClient.product.findMany({
            where: {
               kategori: c.req.param("kategori"),
            },
         }),
      });
   }
   
   static async pesananSaya(c: util.Context): Promise<any> {
      return c.json({
         data: await util.dbClient.product.findMany(),
      });
   }
}
