import type { Seller } from "@prisma/client";
import type { UserResource } from "./user";

export type StaffSellerResource = {
   nama: string;
   no_hp: string;
   username: string;
   role?: string;
   user: UserResource;
};

export function staffSellerResponse(
   db: Seller & { user: UserResource }
): StaffSellerResource {
   return {
      nama: db.user.nama,
      no_hp: db.no_hp,
      username: db.user.username,
      role: db.user.role?.role,
      user: db.user,
   };
}