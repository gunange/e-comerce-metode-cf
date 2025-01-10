import { PrismaClient, type User } from "@prisma/client";
import type { Context } from "hono";
import { getConnInfo } from "hono/bun";

const prismaClient = new PrismaClient();

export class Token {
   static async generate(user: User, context: Context) {
      const time = new Date().getTime();
      const random = crypto.randomUUID();
      const token =
         time
            .toString()
            .replace(/(.{4})/g, "$1-")
            .slice(0, -1) + random.toString();

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

      return Bun.password.hash(token, {
         algorithm: "bcrypt",
         cost: 5,
      });
   }
}
