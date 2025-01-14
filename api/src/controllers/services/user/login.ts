import { z, type ZodType } from "zod";

export interface UserLoginInterface {
   username: string;
   password: string;
}
export const UserLoginValidate: ZodType = z.object({
   username: z.string().min(1).max(100),
   password: z.string().min(1).max(50),
});

export interface UserLoginResponse {
   nama: string;
   role?: string ;
   role_label?: string 
   token: string;
}

export function UserLoginResponse(data: UserLoginResponse): UserLoginResponse {
   return data;
}
