import * as util from "@/controllers/services/util";
import { bearerAuth } from "hono/bearer-auth";

export class Auth {
   static async bearer(c: util.Context, next: util.Next) {
      const auth = await bearerAuth({
         verifyToken: async (token, c) => {
            return await util.Token.verify(token, c);
         },
         invalidTokenMessage: () => {
            throw new util.HTTPException(401, { message: "Unauthorized" });
         },
         noAuthenticationHeaderMessage: () => {
            throw new util.HTTPException(401, {
               message: "You Must Provide Authorization",
            });
         },
         invalidAuthenticationHeaderMessage: () => {
            throw new util.HTTPException(401, {
               message: "Invalid Authorization",
            });
         },
      });
      return await auth(c, next);
   }
}
