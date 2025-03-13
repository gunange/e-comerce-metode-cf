import { Hono } from "hono";

import * as Controller from "@/controllers/controller/admin-toko";
import { Auth } from "@/middleware/Auth";


export const adminTokoRoute = new Hono();

// yang ada dibawah ini butuh authentikasi
adminTokoRoute.use(
    "/*",
    Auth.bearer
 );

adminTokoRoute.use(async(c, next) =>{
    await Controller.MainController.setUser(c)
    await next();
})

adminTokoRoute.get('/staff',Controller.StaffController.index);
adminTokoRoute.post('/staff', Controller.StaffController.insert);
adminTokoRoute.patch('/staff/:id', Controller.StaffController.update);
adminTokoRoute.delete('/staff/:id', Controller.StaffController.del);


adminTokoRoute.get('/product',Controller.ProductController.index);
adminTokoRoute.post('/product', Controller.ProductController.create);
adminTokoRoute.patch('/product/:id', Controller.ProductController.update);
adminTokoRoute.delete('/product/:id', Controller.ProductController.del);