import { UsersController } from "../users-controller";
import * as service from "@/controllers/services/seller/register";
import * as util from "@/controllers/services/util";

export class SellerController {
   static async register(c: util.Context): Promise<any> {
      const db = await service.SellerRagisterRequest(c);
      const user = await UsersController.Register(c, 4);

      db.user_id = user.id;

      return c.json(
         {
            data: service.SellerRagisterResponse(
               await util.dbClient.seller.create({
                  data: db,
                  include: {
                     user: true,
                  },
               })
            ),
         },
         201
      );
   }
}
