import { ProductCreateRequest, ProductUpRequest } from "@/controllers/interfaces/request/product";
import * as util from "@/controllers/services/util";

export class ProductController{
    static async index(c: util.Context): Promise<any> {
        return c.json({
            data: await util.dbClient.product.findMany(),
         });
    }
    static async create(c: util.Context): Promise<any> {
        const db = await ProductCreateRequest(c);
        return c.json({
            data: await util.dbClient.product.create({
               data: db,
            }),
         });
    }
    static async update(c: util.Context): Promise<any> {
        const db = await ProductUpRequest(c);
        return c.json({
            data: await util.dbClient.product.update({
               data: db,
               where: {
                  id: Number(c.req.param("id")),
               },
            }),
         });
      }
    static async del(c: util.Context): Promise<any> {
        return c.json({
            data: await util.dbClient.product.delete({
               where: {
                id : Number(c.req.param("id")),
               },
            }),
         });
    }
}