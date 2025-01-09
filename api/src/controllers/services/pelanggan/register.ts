
import { PrismaClient } from "@prisma/client";
import { UserService } from "../user/user-service";
import {
   pelangganResponse,
   type PelangganResource,
} from "@/controllers/interfaces/resource";
import type { PelangganRegisterRequest,PelangganRegisterInsertModel } from "@/controllers/interfaces/request";

const prismaClient = new PrismaClient();

export class RegisterService {
   static async register(request: PelangganRegisterRequest): Promise<PelangganResource> {
      const user = await UserService.Register(request as any);
      const db : PelangganRegisterInsertModel = request as any;

      db.user_id = user.id;

      return pelangganResponse(
         await prismaClient.pelanggan.create({
            data: db,
            include: {
               user: true,
            },
         })
      );
   }
}
