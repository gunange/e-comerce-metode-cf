import type { User } from "@prisma/client";

import * as util from "@/controllers/services/util";

import { UserRagisterRequest } from "../services/user/register";

export class UsersController {
   static async Register(data: util.Context, role_id: number): Promise<User> {
      const user = await UserRagisterRequest(data);

      user.password = await Bun.password.hash(`${user.password}`, {
         algorithm: "bcrypt",
         cost: 10,
      });

      user.role_id = role_id;
      return await util.dbClient.user.create({
         data: user,
      });
   }
}
