import * as util from "@/controllers/services/util";
import { Keranjang as HRequest } from "@/controllers/interfaces/request/keranjang.ts";
import { Keranjang as Resource } from "@/controllers/interfaces/resource/keranjang.ts";

export class KeranjangController {
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
            (await util.dbClient.keranjang.create({
               data: body,
               include: {
                  product: true,
               },
            })) as any
         ),
      });

   }

   static async del(c: util.Context) : Promise<any>{
      
   }
}
