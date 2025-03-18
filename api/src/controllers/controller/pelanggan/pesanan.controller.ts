import * as util from "@/controllers/services/util";
import { Order as HRequest } from "@/controllers/interfaces/request/order";
import { Order as Resource } from "@/controllers/interfaces/resource/order";
import { StatusOrderModel } from "@/controllers/model/status-order-model";

export class PesananController {
   static async index(c: util.Context): Promise<any> {
      return c.json({
         data: Resource.collection(
            (await util.dbClient.orders.findMany({
               where: {
                  pelanggan_id: Number(c.get("pelanggan").id),
               },
               include: Resource.includePelanggan,
            })) as any
         ),
      });
   }

   static async terima(c: util.Context): Promise<any> {
      const body = await HRequest.terimaPesananOnPelanggan(c);

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

      await StatusOrderModel.setSelesai({
         order_id: db.id,
         pelanggan_id: db.pelanggan_id,
      });

      return c.json({
         data: Resource.resource(
            (await util.dbClient.orders.findFirst({
               where: {
                  id: db.id,
               },
               include: Resource.includePelanggan,
            })) as any
         ),
      });
   }
}
