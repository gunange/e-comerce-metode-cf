import * as util from "@/controllers/services/util";
import { Order as HRequest } from "@/controllers/interfaces/request/order";
import { Order as Resource } from "@/controllers/interfaces/resource/order";
import { StatusOrderModel } from "@/controllers/model/status-order-model";

export class OrderController {
   static async index(c: util.Context): Promise<any> {
      const user = c.get("pelanggan");

      return c.json({
         data: Resource.collection(
            (await util.dbClient.keranjang.findMany({
               where: {
                  pelanggan_id: user.id,
               },
               include: {
                  product: true,
               },
            })) as any
         ),
      });
   }

   static async add(c: util.Context): Promise<any> {
      const body = await HRequest.create(c);
      const db = Resource.resource(
         (await util.dbClient.orders.create({
            data: body,
            include: {
               product: true,
               status_order: true,
            },
         })) as any
      );

      await StatusOrderModel.setStatusCode(db.status_order);

      await StatusOrderModel.setProses({
         order_id: db.id,
         pelanggan_id: db.pelanggan_id,
      });

      return c.json({
         data: db,
      });
   }
}
