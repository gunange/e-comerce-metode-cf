import type { Seller } from "@prisma/client";
import type { UserResource } from "./user";


export type AdminTokoResource = {
    nama: string;
    no_hp: string;
    nama_toko: string;
    alamat_toko: string;
    role?: string;
    user : UserResource;
 };
 

 export function adminTokoResponse(db: Seller & { user: UserResource }): AdminTokoResource {
    return {
        nama : db.user.nama,
        no_hp : db.no_hp,
        nama_toko : db.nama_toko,
        alamat_toko : db.alamat_toko,
        role : db.user.role?.role,
        user : db.user,
    }
}