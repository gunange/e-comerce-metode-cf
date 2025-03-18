import {
   ProductCreateRequest,
   ProductUpRequest,
} from "@/controllers/interfaces/request/product";
import { Order as HRequest } from "@/controllers/interfaces/request/order";
import { Order as Resource } from "@/controllers/interfaces/resource/order";
import * as util from "@/controllers/services/util";
import { StorageController } from "../main/storage-controller";
import { StatusOrderModel } from "@/controllers/model/status-order-model";

export class OrderController {
   static async index(c: util.Context): Promise<any> {
      return c.json({
         data: Resource.collection(
            (await util.dbClient.orders.findMany({
               where: {
                  product: {
                     seller_id: Number(c.get("seller").id),
                  },
               },
               include: Resource.includeSeller,
            })) as any
         ),
      });
   }

   static async proses(c: util.Context): Promise<any> {
      const body = await HRequest.terimaPesananOnSeller(c);
      const db = await util.dbClient.orders.update({
         data: body,
         where: {
            id: Number(c.req.param("id")),
         },
         include: {
            status_order: true,
            product: true,
         },
      });

      await StatusOrderModel.setStatusCode(db.status_order);

      await StatusOrderModel.setDiantar({
         order_id: db.id,
         pelanggan_id: db.pelanggan_id,
      });

      return c.json({
         data: Resource.resource(
            (await util.dbClient.orders.findFirst({
               where: {
                  id: db.id,
               },
               include: Resource.includeSeller,
            })) as any
         ),
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
