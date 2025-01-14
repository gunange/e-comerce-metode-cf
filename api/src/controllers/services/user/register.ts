import * as util from "@/controllers/services/util";
import { ErrorHeandler } from "@/middleware/ErrorHeandler";

export interface UserRagisterRequest {
   role_id?: number;
   nama: string;
   username: string;
   password: string;
}

const validate: util.ZodType = util.zod.object({
   username: util.zod.string().min(1).max(100),
   password: util.zod.string().min(1).max(50),
   nama: util.zod.string().min(1).max(20),
});

export async function UserRagisterRequest(
   c: util.Context
): Promise<UserRagisterRequest> {
   const data = validate.parse(await c.req.json().catch(ErrorHeandler.jsonCatch));
   const existingUser = await util.dbClient.user.findFirst({
      where: { username: data.username },
   });

   if (existingUser) {
      throw new util.HTTPException(401, {
         message: "Username sudah digunakan, mohon gunakan username yang lain",
      });
   }

   return data;
}
