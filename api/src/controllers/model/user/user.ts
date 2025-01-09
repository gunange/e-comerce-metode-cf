import { HTTPException } from "hono/http-exception";
import { PrismaClient } from "@prisma/client";
import type { UserRagisterRequest } from "@/controllers/interfaces/request";

const prisma = new PrismaClient();

export class UserRequest {
   static async VALIDATE(
      data: UserRagisterRequest
   ): Promise<UserRagisterRequest> {
      const existingUser = await prisma.user.findFirst({
         where: { username: data.username },
      });

      if (existingUser) {
         throw new HTTPException(400, {
            message:
               "Username sudah digunakan, mohon gunakan username yang lain",
         });
      }

      return data;
   }
}
