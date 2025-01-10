import { PrismaClient } from "@prisma/client";
import { UserService } from "../user/user-service";
import {
   pelangganResponse,
   type PelangganResource,
} from "@/controllers/interfaces/resource";
import {
   PelangganValidateRegisterRequest,
   UserValidateRequestRegistrasi,
} from "@/controllers/interfaces/request";

const prismaClient = new PrismaClient();

export class RegisterService {
   static async register(request: any): Promise<any> {
      const user = await UserService.Register(
         UserValidateRequestRegistrasi.parse(request)
      );
      const db = await PelangganValidateRegisterRequest.parse({
         ...request,
         user_id: user.id,
      });

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
