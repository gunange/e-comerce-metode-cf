import * as util from "@/controllers/services/util";
import {
   PegawaiSellerRagisterRequest,
   PegawaiSellerUpdateRequest,
} from "@/controllers/services/models/pegawai_seller/register";
import { UsersController } from "../users-controller";
import { staffSellerResponse } from "@/controllers/interfaces/resource/seller";

export class StaffController {
   static async index(c: util.Context): Promise<any> {
      return c.json({
         data: (
            await util.dbClient.pegawaiSeller.findMany({
               where : {
                  seller_id : Number(c.get("seller").id)
               },
               include: {
                  user: true,
               },
            })
         ).map(staffSellerResponse as any),
      });
   }

   static async insert(c: util.Context): Promise<any> {
      const db = await PegawaiSellerRagisterRequest(c);
      const user = await UsersController.Register(c, 3);

      db.user_id = user.id;
      db.seller_id = c.get("seller").id;

      return c.json({
         data: staffSellerResponse(
            (await util.dbClient.pegawaiSeller.create({
               data: db,
               include: {
                  user: true,
               },
            })) as any
         ),
      });
   }

   static async update(c: util.Context): Promise<any> {
      const req = await PegawaiSellerUpdateRequest(c);
      const db = await util.dbClient.pegawaiSeller.findFirstOrThrow({
         where: {
            id: Number(c.req.param("id")),
         },
         include: {
            user: true,
         },
      });

      await util.dbClient.user.update({
         where: {
            id: db.user.id,
         },
         data: {
            nama: req.nama,
         },
      });

      return c.json({
         data: staffSellerResponse(
            (await util.dbClient.pegawaiSeller.update({
               data: {
                  no_hp: req.no_hp,
               },
               where: {
                  id: Number(c.req.param("id")),
               },
               include: {
                  user: true,
               },
            })) as any
         ),
      });
   }
   static async del(c: util.Context): Promise<any> {
      const db = await util.dbClient.pegawaiSeller.findFirstOrThrow({
         where: {
            id: Number(c.req.param("id")),
         },
      });
      return c.json({
         data: await util.dbClient.user.delete({
            where: {
               id: db?.user_id,
            },
         }),
      });
   }
}
