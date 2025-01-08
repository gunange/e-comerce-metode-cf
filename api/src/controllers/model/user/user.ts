import { z, ZodType } from "zod";
import { HTTPException } from "hono/http-exception";
import { PrismaClient } from "@prisma/client";
import type { UserRagisterRequest } from "@/controllers/interfaces/request";

const prisma = new PrismaClient();

export class UserRequest {
   private static readonly REGISTER: ZodType = z.object({
      nama: z.string().min(1).max(50),
      username: z.string().min(1).max(100),
      password: z.string().min(1).max(50),
   });

   static async VALIDATE(
      data: UserRagisterRequest
   ): Promise<UserRagisterRequest> {
      const parsed = this.REGISTER.parse(data);

      const existingUser = await prisma.user.findFirst({
         where: { username: parsed.username },
      });

      if (existingUser) {
         throw new HTTPException(400, {
            message:
               "Username sudah digunakan, mohon gunakan username yang lain",
         });
      }

      return parsed;
   }
}
