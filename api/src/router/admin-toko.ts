import { Hono } from "hono";

import * as Controller from "@/controllers/controller/admin-toko";


export const adminTokoRoute = new Hono();


adminTokoRoute.use(async(c, next) =>{
    await Controller.MainController.setUser(c)
    await next();
})

adminTokoRoute.get('/pelanggan',Controller.PegawaiTokoController.index);
adminTokoRoute.post('/pelanggan', Controller.PegawaiTokoController.insert);
adminTokoRoute.patch('/pelanggan/:id', Controller.PegawaiTokoController.update);
adminTokoRoute.delete('/pelanggan/:id', Controller.PegawaiTokoController.del);


adminTokoRoute.get('/product',Controller.ProductController.index);
adminTokoRoute.post('/product', Controller.ProductController.create);
adminTokoRoute.patch('/product/:id', Controller.ProductController.update);
adminTokoRoute.delete('/product/:id', Controller.ProductController.del);