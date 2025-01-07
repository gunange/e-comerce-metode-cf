import { UserRagisterRequest } from "@/controllers/interfaces/request";
import { UserRequest } from "@/controllers/model/user/user";

import { PrismaClient, User } from "@prisma/client";

const prismaClient = new PrismaClient();

export class UserService{
    static async Register (data : UserRagisterRequest) : Promise<User>{
        let user  = await UserRequest.VALIDATE(data);

        user.password = await Bun.password.hash(`${data.password}`, {
            algorithm: "bcrypt",
            cost: 10,
        });

        user.role_id = BigInt(4) ;
        return await prismaClient.user.create({
            data : user
        });
    }
}