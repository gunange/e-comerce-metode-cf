import { PrismaClient, type User } from "@prisma/client";
import * as util from "@/controllers/services/util";
import { getConnInfo } from "hono/bun";

const prismaClient = new PrismaClient();

export class Token {
   static async generate(user: User, context: util.Context) {
      const time = new Date().getTime();
      const random = crypto.randomUUID();
      const token =
         time.toString().slice(0, -1) + random.toString().replace(/\-/g, "");

      let ip;

      try {
         ip = getConnInfo(context).remote.address || "0.0.0.0";
      } catch (_) {
         ip = "0.0.0.0";
      }
      const userAgent = context.req.header("user-agent");

      await prismaClient.personalAksesToken.create({
         data: {
            user_id: user.id,
            name: user.username,
            ip_address: ip,
            user_agent: userAgent,
            token: token,
         },
      });

      return token;
   }

   static async verify(token: string, context: util.Context): Promise<boolean> {
      try {
         const tokenAkses = await prismaClient.personalAksesToken.findFirst({
            where: { token: token },
            include: {
               user: true,
            },
         });

         if (!tokenAkses || tokenAkses.token !== token.replace(/\+\|\+/g, "/"))
            return false;

         context.set("user", tokenAkses.user);
         context.set("token", token)

         return true;
      } catch {
         return false;
      }
   }
}
