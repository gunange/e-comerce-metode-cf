import { UsersController } from "@/controllers/controller/users-controller";
import { Hono } from "hono";

export const userRoute = new Hono();

userRoute.post("/login", UsersController.Login);