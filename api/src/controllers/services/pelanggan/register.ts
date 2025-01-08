import { RegisterRequest } from "@/controllers/model/pelanggan";
import { PrismaClient } from "@prisma/client";
import { UserService } from "../user/user-service";
import {
   pelangganResponse,
   type PelangganResource,
} from "@/controllers/interfaces/resource";

const prismaClient = new PrismaClient();

export class RegisterService {
   static async register(request: any): Promise<PelangganResource> {
      const user = await UserService.Register(request);

      const db = await RegisterRequest.VALIDATE(request);

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
