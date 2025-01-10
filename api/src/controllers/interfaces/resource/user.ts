import type {  User } from "@prisma/client";

export type UserResource = {
   username: string;
   nama: string;
};
export type UserLoginResource = {
   
   token: string;
};

export function userRegisterResponse(user: User): UserResource {
    return {
        username: user.username,
        nama: user.nama,
    }
}

export function userLoginResponse(user: User): UserResource {
    return {
        username: user.username,
        nama: user.nama,
    }
}
