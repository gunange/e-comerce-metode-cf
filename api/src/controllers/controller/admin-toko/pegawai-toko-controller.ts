import type { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import { PegawaiSellerRagisterRequest } from "@/controllers/services/models/pegawai_seller/register";
import { ErrorHeandler } from "@/middleware/ErrorHeandler";
import { UsersController } from "../users-controller";

const prismaClient = new PrismaClient();

export class PegawaiTokoController {
   static async index(c: Context): Promise<any> {
      return c.json(
         {
            data: await prismaClient.pegawaiSeller.findMany(),
         }
      );
   }

   static async insert(c: Context): Promise<any> {
      // const db = await PegawaiSellerRagisterRequest(
      //    await c.req.json().catch(ErrorHeandler.jsonCatch)
      // );
      // const user = await UsersController.Register(c, 3);
      
      // db.user_id = user.id;

      return c.json(
         {
            data: await prismaClient.pegawaiSeller.findMany(),
         }
      );
   }
}
