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
               include: {
                  product: true,
                  status_order : true,
               },
            })) as any
         ),
      });
   }

}
