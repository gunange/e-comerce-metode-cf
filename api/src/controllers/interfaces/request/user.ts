import { z, type ZodType } from "zod";

export interface UserRagisterRequest {
   role_id: bigint;
   username: string;
   password: string;
   nama: string;
}
export const UserValidateRequestRegistrasi: ZodType = z.object({
   role_id: z.bigint().default(BigInt(0)),
   username: z.string().min(1).max(100),
   password: z.string().min(1).max(50),
   nama: z.string().min(1).max(20),
});