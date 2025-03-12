import * as util from "@/controllers/services/util";
import { convertTypes } from "@/middleware/tools";

interface ProductCreate {
   seller_id: number;
   label: string;
   deskripsi: string;
   stock: number;
   harga: number;
   foto: string;
   kategori: string;
}

interface ProductUpdate {
   label: string;
   deskripsi: string;
   stock: number;
   harga: number;
   foto: string;
   kategori: string;
}

export async function ProductCreateRequest(
   c: util.Context
): Promise<ProductCreate> {
   const validate: util.ZodType = util.zod.object({
      label: util.zod.string().min(1).max(255),
      deskripsi: util.zod.string().min(1).max(255),
      kategori: util.zod.string().min(1).max(100),
      stock: util.zod.number().min(1),
      harga: util.zod.number().min(1),
      foto: util.zod.string().min(1).max(255),
   });

   let data = await validate.parse(
      await c.req.json().catch(util.ErrorHeandler.jsonCatch)
   );
   data.seller_id = Number(c.get("seller").id);
   return data;
}
export async function ProductUpRequest(
   c: util.Context
): Promise<ProductUpdate> {
   let jsonBody =
      c.req.header("content-type") === "application/json"
         ? await c.req.json().catch(util.ErrorHeandler.jsonCatch)
         : await c.req.parseBody().catch(util.ErrorHeandler.jsonCatch);

   const validate: util.ZodType = util.zod.object({
      label: util.zod.string().min(1).max(255),
      deskripsi: util.zod.string().min(1).max(255),
      kategori: util.zod.string().min(1).max(100),
      stock: util.zod.number().min(1),
      harga: util.zod.number().min(1),
      foto: util.zod.string().min(1).max(255).optional(),
   });

   let data = await validate.parse(convertTypes(jsonBody));
   return data;
}
