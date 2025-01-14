import prismaClient from "@/app/database";

export class PelangganRegisterTest {
   static async create() {
      const password = "test";
      const user = await prismaClient.user.create({
         data: {
            role_id: 4,
            username: "test",
            nama: "test",
            password: await Bun.password.hash(password, {
               algorithm: "bcrypt",
               cost: 10,
            }),
         },
      });

       await prismaClient.pelanggan.create({
         data: {
            user_id: user.id,
            no_hp: "082212341234",
         },
      });

      return {...user, password : password};
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
