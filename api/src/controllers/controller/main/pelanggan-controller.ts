import { UsersController } from "../users-controller";
import * as service from "@/controllers/services/pelanggan/register";
import * as util from "@/controllers/services/util";

export class PelangganController {
   static async register(c: util.Context): Promise<any> {
      const db = await service.PelangganRagisterRequest(c);
      const user = await UsersController.Register(c, 4);

      db.user_id = user.id;

      return c.json(
         {
            data: service.PelangganRagisterResponse(
               await util.dbClient.pelanggan.create({
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
