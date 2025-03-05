import { z, type ZodType } from "zod";

export interface UserRagisterRequest {
   role_id: number;
   username: string;
   password: string;
   nama: string;
}
export interface UserLoginInterface {
   username: string;
   password: string;
}
export const UserValidateRequestRegistrasi: ZodType = z.object({
   username: z.string().min(1).max(100),
   password: z.string().min(1).max(50),
   nama: z.string().min(1).max(50),
});
export const UserValidateLogin: ZodType = z.object({
   username: z.string().min(1).max(100),
   password: z.string().min(1).max(50),
});