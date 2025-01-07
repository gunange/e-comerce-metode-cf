import { z, ZodType } from "zod";
import { HTTPException  } from "hono/http-exception"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class RegisterRequest {
   private static readonly REGISTER: ZodType = z.object({
      username: z.string().min(1).max(100),
      password: z.string().min(1).max(50),
      nama: z.string().min(1).max(50),
      no_hp: z.string().min(1).max(20),
   });

   static async VALIDATE(data: RegisterModel): Promise<RegisterModel> {
      const parsed = this.REGISTER.parse(data);

      const existingUser = await prisma.user.findFirst({
         where: { username: parsed.username },
      });

      if (existingUser) {
         throw new HTTPException(400, {
            message : "Username sudah digunakan, mohon gunakan username yang lain"
         });
      }

      return parsed ;
   }
}

export type RegisterModel = {
   username: string;
   password: string;
   nama: string;
   no_hp: string;
};
