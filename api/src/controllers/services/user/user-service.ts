import type { UserRagisterRequest } from "@/controllers/interfaces/request";
import { UserRequest } from "@/controllers/model/user/user";

import { PrismaClient, type User } from "@prisma/client";


const prismaClient = new PrismaClient();

export class UserService{
    static async Register (data : UserRagisterRequest) : Promise<User>{
        const user : UserRagisterRequest  = await UserRequest.VALIDATE(data);
        
        user.password = await Bun.password.hash(`${data.password}`, {
            algorithm: "bcrypt",
            cost: 10,
        });
        
        user.role_id = BigInt(4) ;
        console.log("log : ", user)
        return await prismaClient.user.create({
            data : user
        });
    }
}