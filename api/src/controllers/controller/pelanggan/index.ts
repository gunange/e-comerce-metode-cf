
import { ProductController } from "./product-controller";
import * as util from "@/controllers/services/util";

export {  ProductController};

export class MainController {
   static async setUser(c: util.Context ): Promise<void> {
      const user = c.get("user");

      const db = await util.dbClient.pelanggan.findFirst({
         where: {
            user_id: user.id,
         },
      });

      c.set("pelanggan", db);
   }
}
