import { z, ZodType } from "zod";

export type AdminTokoRegisterRequest = {
   username: string;
   password: string;
   nama: string;
   no_hp: string;
};
export type AdminTokoRegisterInsertModel = {
   user_id: bigint;
   no_hp: string;
   nama_toko: string;
   alamat_toko: string;
};

export const AdminTokoValidateRequest: ZodType = z.object({
   nama: z.string().min(1).max(50),
   username: z.string().min(1).max(100),
   password: z.string().min(1).max(50),
   no_hp: z.string().min(1).max(20),
   nama_toko: z.string().min(1).max(100),
   alamat_toko: z.string().min(1).max(255),
});

export const AdminTokoValidateRegisterRequest: ZodType = z.object({
   user_id: z.number(),
   no_hp: z.string().min(1).max(20),
   nama_toko: z.string().min(1).max(100),
   alamat_toko: z.string().min(1).max(255),
});
