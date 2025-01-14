import type { Context } from "hono";
import { PrismaClient } from "@prisma/client";
import { type UserRagisterRequest } from "@/controllers/interfaces/request";

const prismaClient = new PrismaClient();

export class PegawaiTokoController {
   static async index(c: Context): Promise<any> {
      return c.json(
         {
            data: await prismaClient.pegawaiSeller.findMany(),
         },
         200
      );
   }

   static async insert(c: Context): Promise<any> {
      // const userReq = UserRagisterRequest(await c.req.json() ) ;
      // const db;
      return c.json(
         {
            data: await prismaClient.pegawaiSeller.findMany(),
         },
         200
      );
   }
}
