import * as util from "@/controllers/services/util";
import { ErrorHeandler } from "@/middleware/ErrorHeandler";

export interface SellerRagisterInterface {
   user_id: number;
   no_hp: string;
   nama_toko: string;
   alamat_toko: string;
}

export async function SellerRagisterRequest(
   c: util.Context
): Promise<SellerRagisterInterface> {
   const validate: util.ZodType = util.zod.object({
      no_hp: util.zod.string().min(1).max(20),
      nama_toko: util.zod.string().min(1).max(100),
      alamat_toko: util.zod.string().min(1).max(255),
   });
   let data = await validate.parse(
      await c.req.json().catch(ErrorHeandler.jsonCatch)
   );
   return data;
}

export function SellerRagisterResponse(data: any): any {
   return {
      nama : data.user.nama,
      no_hp : data.no_hp,
      nama_toko : data.nama_toko,
      alamat_toko : data.alamat_toko,
      user : data.user
   };
}
