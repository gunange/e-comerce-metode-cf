import { Order as HRequest } from "@/controllers/interfaces/request/order";
import { Order as Resource } from "@/controllers/interfaces/resource/order";
import * as util from "@/controllers/services/util";
import { StatusOrderModel } from "@/controllers/model/status-order-model";

export class OrderController {
   static async index(c: util.Context): Promise<any> {
      return c.json({
         data: Resource.collection(
            (await util.dbClient.orders.findMany({
               where: {
                  product: {
                     seller_id: Number(c.get("staff").seller_id),
                  },
               },
               include: Resource.includeSeller,
            })) as any
         ),
      });
   }

   static async terima(c: util.Context): Promise<any> {
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
   static async dibatalkan(c: util.Context): Promise<any> {
      const body = await HRequest.batalkanPesananOnSeller(c);
      const db = await util.dbClient.orders.update({
         data: {
            estimasi: null,
         },
         where: {
            id: Number(c.req.param("id")),
         },
         include: {
            status_order: true,
            product: true,
         },
      });

      await util.dbClient.product.update({
         where: {
            id: db.product_id,
         },
         data: {
            stock: {
               increment: db.quantity,
            },
         },
      });

      await StatusOrderModel.setStatusCode(db.status_order);

      await StatusOrderModel.setDibatalkan({
         order_id: db.id,
         pelanggan_id: db.pelanggan_id,
         keterangan: body.keterangan,
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
}
