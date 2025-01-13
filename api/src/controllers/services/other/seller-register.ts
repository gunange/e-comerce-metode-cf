import { PrismaClient } from "@prisma/client";
import { UserService } from "../user-service";
import {
   adminTokoResponse,
   type AdminTokoResource,
} from "@/controllers/interfaces/resource";
import {
   AdminTokoValidateRegisterRequest,
   UserValidateRequestRegistrasi,
} from "@/controllers/interfaces/request";

const prismaClient = new PrismaClient();

export class SellerRegisterService {
   static async register(request: any): Promise<AdminTokoResource> {
      const user = await UserService.Register(
         UserValidateRequestRegistrasi.parse(request)
      );
      const db = await AdminTokoValidateRegisterRequest.parse({
         ...request,
         user_id: user.id,
      });

      return adminTokoResponse(
         await prismaClient.seller.create({
            data: db,
            include: {
               user: true,
            },
         })
      );
   }
}
