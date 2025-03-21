import { ProductController } from "./product-controller";
import { OrderController } from "./order-controller";
import * as util from "@/controllers/services/util";

export { ProductController, OrderController };

export class MainController {
   static async setUser(c: util.Context): Promise<void> {
      const user = c.get("user");

      const db = await util.dbClient.pegawaiSeller.findFirst({
         where: {
            user_id: user.id,
         },
         include :{
            toko : true,
            user : true,
         }
      });

      c.set("staff", db);
   }
}
