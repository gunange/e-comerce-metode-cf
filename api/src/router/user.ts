import { UsersController } from "@/controllers/controller/users-controller";
import { Auth } from "@/middleware/Auth";
import { Hono } from "hono";

export const userRoute = new Hono();

userRoute.post("/login", UsersController.Login);

// yang ada dibawah ini butuh authentikasi
userRoute.use(
    "/*",
    Auth.bearer
 );

 userRoute.get("/", UsersController.UserProfil);