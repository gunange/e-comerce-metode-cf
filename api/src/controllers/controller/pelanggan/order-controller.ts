import * as util from "@/controllers/services/util";
import { Order as HRequest } from "@/controllers/interfaces/request/order";
import { Order as Resource } from "@/controllers/interfaces/resource/order";

export class OrderController {
   static async index(c: util.Context): Promise<any> {
      const user = c.get("pelanggan");

      return c.json({
         data: Resource.collection(
            (await util.dbClient.keranjang.findMany({
               where: {
                  pelanggan_id: user.id,
               },
               include : {
                  product : true,
               }
            })) as any
         ),
      });
   }

   static async add(c: util.Context): Promise<any> {
      const body = await HRequest.create(c);

      return c.json({
         data: Resource.resource(
            (await util.dbClient.orders.create({
               data: body,
               include: {
                  product : true,
               },
            })) as any
         ),
      });

   }

   static async del(c: util.Context) : Promise<any>{
      return c.json({
         data: Resource.resource(
            (await util.dbClient.keranjang.delete({
               where :{
                  id : Number(c.req.param("id")),
               },
               include: {
                  product: true,
               },
            })) as any
         ),
      });
   }
}
