import type { Users } from "../user"

export interface Seller {
    id: number,
    user_id: number,
    no_hp: string,
    nama_toko: string,
    alamat_toko: string,
    user : Users,
    created_at: string,
    update_at: string,
 }
