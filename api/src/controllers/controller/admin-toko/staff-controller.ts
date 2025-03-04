import * as util from "@/controllers/services/util";
import { PegawaiSellerRagisterRequest } from "@/controllers/services/models/pegawai_seller/register";
import { UsersController } from "../users-controller";

export class StaffController {
   static async index(c: util.Context): Promise<any> {
      return c.json({
         data: await util.dbClient.pegawaiSeller.findMany(),
      });
   }

   static async insert(c: util.Context): Promise<any> {
      const db = await PegawaiSellerRagisterRequest(c);
      const user = await UsersController.Register(c, 3);

      db.user_id = user.id;
      db.seller_id = c.get("seller").id;

      return c.json({
         data: await util.dbClient.pegawaiSeller.create({
            data: db,
         }),
      });
   }

   static async update(c: util.Context): Promise<any> {
      const db = await PegawaiSellerRagisterRequest(c);

      return c.json({
         data: await util.dbClient.pegawaiSeller.update({
            data: {
               no_hp: db.no_hp,
            },
            where: {
               id: Number(c.req.param("id")),
            },
         }),
      });
   }
   static async del(c: util.Context): Promise<any> {
      const db = await util.dbClient.pegawaiSeller.findFirstOrThrow({
         where:{
            id : Number(c.req.param("id")),
         }
      })
      return c.json({
         data: await util.dbClient.user.delete({
            where: {
               id: db?.user_id,
            },
         }),
      });
   }
}
