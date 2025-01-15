import type { Users } from "../user"

export interface Pelanggan {
    id: number,
    user_id: number,
    no_hp: string,
    user : Users
    created_at: string,
    update_at: string,
 }