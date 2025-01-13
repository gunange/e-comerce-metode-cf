import { Token } from "@/app/token";
import type {
   UserLoginInterface,
   UserRagisterRequest,
} from "@/controllers/interfaces/request";

import { PrismaClient, type User } from "@prisma/client";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

const prismaClient = new PrismaClient();

export class UserService {
   private static async VALIDATE(
      data: UserRagisterRequest
   ): Promise<UserRagisterRequest> {
      const existingUser = await prismaClient.user.findFirst({
         where: { username: data.username },
      });

      if (existingUser) {
         throw new HTTPException(401, {
            message:
               "Username sudah digunakan, mohon gunakan username yang lain",
         });
      }

      return data;
   }

   static async Register(data: UserRagisterRequest): Promise<User> {
      const user: UserRagisterRequest = await this.VALIDATE(data);

      user.password = await Bun.password.hash(`${data.password}`, {
         algorithm: "bcrypt",
         cost: 10,
      });

      data.role_id = 4;
      return await prismaClient.user.create({
         data: user,
      });
   }

   static async Login(request: UserLoginInterface, context: Context) {
      const existingUser = await prismaClient.user.findFirst({
         where: { username: request.username },
         include: {
            role: true,
         },
      });

      if (
         !existingUser ||
         !(await Bun.password.verify(
            request.password,
            existingUser.password,
            "bcrypt"
         ))
      ) {
         throw new HTTPException(401, {
            message: "Username or Password Wrong!!",
         });
      }

      return {
         nama: existingUser.nama,
         role: existingUser.role?.role,
         role_label: existingUser.role?.label,
         token: await Token.generate(existingUser, context),
      };
   }
}
