import { RegisterRequest , RegisterModel} from "@/controllers/model/pelanggan"
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export class RegisterService {
    
    static async register(request : RegisterModel) : Promise<any>{
        request  = await RegisterRequest.VALIDATE(request);

        request.password = await Bun.password.hash(`${request.password}`, {
            algorithm: "bcrypt",
            cost: 10,
        });

        prismaClient.user.create({
            data : {
                role_id : 4,
                username : request.username,
                nama : request.nama,
                password : request.password,
            }
        });
        
    }
}