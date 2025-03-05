import * as util from "@/controllers/services/util";
import { ErrorHeandler } from "@/middleware/ErrorHeandler";
import type { PegawaiSeller } from ".";

interface PegawaiSellerRagister {
   user_id: number;
   seller_id: number;
   no_hp: string;
}

export async function PegawaiSellerRagisterRequest(
   c: util.Context
): Promise<PegawaiSellerRagister> {
   const validate: util.ZodType = util.zod.object({
      no_hp: util.zod.string().min(1).max(20),
   });
   let data = await validate.parse(
      await c.req.json().catch(ErrorHeandler.jsonCatch)
   );
   return data;
}

export async function PegawaiSellerUpdateRequest(c: util.Context): Promise<{
   nama: string;
   no_hp: string;
}> {
   const validate: util.ZodType = util.zod.object({
      nama: util.zod.string().min(1).max(50),
      no_hp: util.zod.string().min(1).max(20),
   });
   
   
   let data = await validate.parse(
      await c.req.parseBody().catch(ErrorHeandler.jsonCatch)
   );
   return data;
}

export function PegawaiSellerRagisterResponse(data: PegawaiSeller): any {
   return {
      id: data.id,
      nama: data.user.nama,
      no_hp: data.no_hp,
      user: data.user,
      toko: data.toko,
   };
}
