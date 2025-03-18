
import { KeranjangController } from "./keanjang-controller";
import { OrderController } from "./order-controller";
import { PesananController } from "./pesanan.controller";
import * as util from "@/controllers/services/util";

export {  KeranjangController, OrderController, PesananController};

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
