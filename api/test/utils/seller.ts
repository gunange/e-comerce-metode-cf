import prismaClient from "@/app/database";

export class SellerRegisterTest {
   static async create() {
      const password = "test";
      const user = await prismaClient.user.create({
         data: {
            role_id: 2,
            username: "test-seller",
            nama: "test",
            password: await Bun.password.hash(password, {
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
      console.log("Seller created successfully");
      return { ...user, password: password };
   }
   static async delete() {
      await prismaClient.user.deleteMany({
         where: {
            username: {
               contains: "test",
            },
            AND: {
               role_id: 2,
            },
         },
      });

      console.log("Seller delete successfully");
   }
}
