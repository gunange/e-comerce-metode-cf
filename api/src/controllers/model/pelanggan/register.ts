import { z, ZodType } from "zod";
import { PrismaClient } from "@prisma/client";
import { PelangganRegisterRequest } from "@/controllers/interfaces/request";

const prisma = new PrismaClient();

export class RegisterRequest {
   private static readonly REGISTER: ZodType = z.object({
      no_hp: z.string().min(1).max(20),
   });

   static async VALIDATE(data: PelangganRegisterRequest): Promise<PelangganRegisterRequest> {
      const parsed = this.REGISTER.parse(data);

      return parsed;
   }
}

