import type { User } from "@prisma/client";
import * as util from "@/controllers/services/util";
import { ErrorHeandler } from "@/middleware/ErrorHeandler";

export interface PelangganRagisterInterface {
   user_id: number;
   no_hp: string;
}

export interface PelangganRagisterResponseInterface {
   nama: string;
   role: string;
   role_label: string;
   token: string;
}

export type PelangganResourceInterface = {
   no_hp: string;
   user: User;
};

export async function PelangganRagisterRequest(
   c: util.Context
): Promise<PelangganRagisterInterface> {
   const validate: util.ZodType = util.zod.object({
      no_hp: util.zod.string().min(1).max(20),
   });
   let data = await validate.parse(
      await c.req.json().catch(ErrorHeandler.jsonCatch)
   );
   return data;
}

export function PelangganRagisterResponse(data: any): any {
   return {
      nama: data.user.nama,
      no_hp: data.no_hp,
      user: data.user,
   };
}
