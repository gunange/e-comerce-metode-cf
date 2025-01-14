import type { User } from "@prisma/client";

import * as util from "@/controllers/services/util";

import { UserRagisterRequest } from "../services/user/register";
import { UserLoginResponse, UserLoginValidate } from "../services/user/login";
import { ErrorHeandler } from "@/middleware/ErrorHeandler";

export class UsersController {
   static async Register(c: util.Context, role_id: number): Promise<User> {
      const user = await UserRagisterRequest(c);

      user.password = await Bun.password.hash(`${user.password}`, {
         algorithm: "bcrypt",
         cost: 10,
      });

      user.role_id = role_id;
      return await util.dbClient.user.create({
         data: user,
      });
   }

   static async Login(c: util.Context): Promise<any> {
      const request = await UserLoginValidate.parse(
         await c.req.json().catch(ErrorHeandler.jsonCatch)
      );

      const existingUser = await util.dbClient.user.findFirst({
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
         throw new util.HTTPException(401, {
            message: "Username or Password Wrong!!",
         });
      }

      return c.json({
         data: UserLoginResponse({
            nama: existingUser.nama,
            role: existingUser.role?.role ?? "",
            role_label: existingUser.role?.label,
            token: await util.Token.generate(existingUser, c),
         }),
      }, 201);
   }
}
