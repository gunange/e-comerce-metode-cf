import { z, ZodType } from "zod";

export type PelangganRegisterRequest = {
   username: string;
   password: string;
   nama: string;
   no_hp: string;
};
export type PelangganRegisterInsertModel = {
   user_id: bigint;
   no_hp: string;
};

export const PelangganValidateRequest: ZodType = z.object({
   nama: z.string().min(1).max(50),
   username: z.string().min(1).max(100),
   password: z.string().min(1).max(50),
   no_hp: z.string().min(1).max(20),
});
