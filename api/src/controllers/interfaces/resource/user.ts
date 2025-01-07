import {  User } from "@prisma/client";
import { RoleResource } from "./role";

export type UserResource = {
   username: string;
   nama: string;
};

export function userRegisterResponse(user: User): UserResource {
    return {
        username: user.username,
        nama: user.nama,
    }
}
