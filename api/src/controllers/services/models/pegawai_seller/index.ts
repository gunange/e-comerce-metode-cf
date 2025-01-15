import type { Users } from "../user";

export interface PegawaiSeller {
    id: number;
    user_id: number;
    seller_id: number;
    no_hp: string;
    user : Users
    created_at: string;
    update_at: string;
 }