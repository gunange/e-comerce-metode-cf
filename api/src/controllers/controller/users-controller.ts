import type { User } from "@prisma/client";

import * as util from "@/controllers/services/util";

import { UserRagisterRequest } from "../services/models/user/register";
import {
   UserLoginResponse,
   UserLoginValidate,
} from "../services/models/user/login";
import { ErrorHeandler } from "@/middleware/ErrorHeandler";
import { adminTokoResponse, pelangganResponse } from "../interfaces/resource";
import { StaffResource } from "../interfaces/resource/staff";

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

      return c.json(
         {
            data: UserLoginResponse({
               nama: existingUser.nama,
               role: existingUser.role?.role ?? "",
               role_label: existingUser.role?.label,
               token: await util.Token.generate(existingUser, c),
            }),
         },
         201
      );
   }

   static async UserProfil(c: util.Context) {
      const user = c.get("user");

      let db = user;
      if (user.role_id == 4) {
         db = await util.dbClient.pelanggan.findFirst({
            where: {
               user_id: user.id,
            },
            include: {
               user: true,
            },
         });
         db = await pelangganResponse(db);
      } else if (user.role_id == 2) {
         db = await util.dbClient.seller.findFirst({
            where: {
               user_id: user.id,
            },
            include: {
               user: {
                  include: {
                     role: true,
                  },
               },
            },
         });
         db = await adminTokoResponse(db);
      } else if (user.role_id == 3) {
         db = StaffResource.resource(
            (await util.dbClient.pegawaiSeller.findFirst({
               where: {
                  user_id: user.id,
               },
               include: StaffResource.includeStaff,
            })) as any
         );
      }

      return c.json(
         {
            data: db,
         },
         200
      );
   }
   static async UserLogout(c: util.Context) {
      const user = c.get("user");
      const token = c.get("token");

      await util.dbClient.personalAksesToken.deleteMany({
         where: {
            token: token,
         },
      });

      return c.json(
         {
            data: user,
         },
         200
      );
   }
}
