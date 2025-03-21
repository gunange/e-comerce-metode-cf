import prismaClient from "@/app/database";

export class AdminTokoRegisterTest {
   static async create() {
      const user = await prismaClient.user.create({
         data: {
            role_id: 4,
            username: "test",
            nama: "test",
            password: await Bun.password.hash("test", {
               algorithm: "bcrypt",
               cost: 10,
            }),
         },
      });

      await prismaClient.seller.create({
         data: {
            user_id: user.id,
            no_hp: "082212341234",
            alamat_toko: "test",
            nama_toko: "test",
         },
      });
   }
   static async delete() {
      await prismaClient.user.deleteMany({
         where: {
            username: {
               contains: "test",
            },
         },
      });
   }
}
