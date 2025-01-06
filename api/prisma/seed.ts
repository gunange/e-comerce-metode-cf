import { PrismaClient } from "@prisma/client";
import { roleSeed, userSeed } from "./seeder";
const prisma = new PrismaClient();
async function main() {
   await roleSeed();
   await userSeed();
}
main()
   .then(async () => {
      await prisma.$disconnect();
   })
   .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
   });
