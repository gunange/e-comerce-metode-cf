import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function roleSeed() {
    await prisma.role.upsert({
        where: { id: 99 },
        update: {},
        create: {
           id: 99,
           label: "Super Admin",
           role: "5up3r-4dm1N",
        },
     });
     await prisma.role.upsert({
        where: { id: 2 },
        update: {},
        create: {
           id: 2,
           label: "Admin Toko",
           role: "4dm1n-t0kO",
        },
     });
     await prisma.role.upsert({
        where: { id: 3 },
        update: {},
        create: {
           id: 3,
           label: "Pegawai Toko",
           role: "p3gaw4i-t0kO",
        },
     });
     await prisma.role.upsert({
        where: { id: 4 },
        update: {},
        create: {
           id: 4,
           label: "Pelanggan",
           role: "p3lAnGg4n",
        },
     });
  
     console.log("Create Role Seeder");
}