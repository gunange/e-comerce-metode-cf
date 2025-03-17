import * as util from "@/controllers/services/util";
import { ErrorHeandler } from "@/middleware/ErrorHeandler";

export interface PelangganRagisterInterface {
   user_id: number;
   no_hp: string;
   alamat: string;
}

export async function PelangganRagisterRequest(
   c: util.Context
): Promise<PelangganRagisterInterface> {
   const validate: util.ZodType = util.zod.object({
      no_hp: util.zod.string().min(1).max(20),
      alamat: util.zod.string().min(1).max(255),
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
      alamat: data.alamat,
      user: data.user,
   };
}
