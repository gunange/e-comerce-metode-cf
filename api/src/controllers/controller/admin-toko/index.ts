import { PegawaiTokoController } from "./pegawai-toko-controller";
import * as util from "@/controllers/services/util";

export { PegawaiTokoController };

export class MainController {
   static async setUser(c: util.Context ): Promise<void> {
      const user = c.get("user");

      const db = await util.dbClient.seller.findFirst({
         where: {
            user_id: user.id,
         },
      });

      c.set("seller", db);
   }
}
