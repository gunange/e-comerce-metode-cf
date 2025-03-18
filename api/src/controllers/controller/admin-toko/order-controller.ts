import {
   ProductCreateRequest,
   ProductUpRequest,
} from "@/controllers/interfaces/request/product";
import { Order as HRequest } from "@/controllers/interfaces/request/order";
import { Order as Resource } from "@/controllers/interfaces/resource/order";
import * as util from "@/controllers/services/util";
import { StorageController } from "../main/storage-controller";

export class OrderController {
   static async index(c: util.Context): Promise<any> {
      return c.json({
         data: Resource.collection(
            (await util.dbClient.orders.findMany({
               where :{
                  product :{
                     seller_id : Number(c.get("seller").id),
                  }
               },
               include :{
                  pelanggan : true,
               }
            })) as any
         ),
      });
   }
   
   static async update(c: util.Context): Promise<any> {
      const db = await ProductUpRequest(c);
      return c.json({
         data: await util.dbClient.product.update({
            data: db,
            where: {
               id: Number(c.req.param("id")),
            },
         }),
      });
   }
   static async del(c: util.Context): Promise<any> {
      const db = await util.dbClient.product.delete({
         where: {
            id: Number(c.req.param("id")),
         },
      });

      await StorageController.del(c, db.foto);

      StorageController.del(c);
      return c.json({
         data: db,
      });
   }
}
