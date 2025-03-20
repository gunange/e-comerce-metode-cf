import type { Pelanggan } from "@prisma/client";
import type { UserResource } from "./user";


export type PelangganResource = {
    id: number;
    nama: string;
    no_hp: string;
    alamat: string;
    user : UserResource;
 };
 

 export function pelangganResponse(db: Pelanggan & { user: UserResource }): PelangganResource {
    return {
        id : db.id,
        nama : db.user.nama,
        alamat : db.alamat,
        no_hp : db.no_hp,
        user : db.user ?? {}
    }
}