import * as util from "@/controllers/services/util";
import * as Controller from "@/controllers/interfaces/request/storage";
import { extname } from "path";

export class StorageController {
   static async create(c: util.Context): Promise<any> {
      const file = ((await c.req.parseBody()) as File | any)["file"] as File;
      await Controller.IMAGE_SCHEMA.parse(file);

      const req = await Controller.RequestSchema.parse(await c.req.parseBody());

      // Akses informasi file
      const fileType = file.type;
      const fileSize = file.size;
      const uid = Bun.randomUUIDv7();
      const fileName = `${req.label}${extname(file.name)}`;

      const fileBuffer = await file.arrayBuffer();

      const dirPath = "public/storage";
      const cleanedPath =
         req.path.endsWith("/") && req.path.lastIndexOf("/") > 0
            ? req.path.slice(0, req.path.lastIndexOf("/"))
            : req.path;
      const filePath = `${dirPath}/${cleanedPath}/${fileName}`;
      await Bun.write(filePath, new Uint8Array(fileBuffer), {
         createPath: true,
      });

      await util.dbClient.storage.create({
         data: {
             uid: uid,
             path: filePath,
          }
      })

      return c.json({
         data: {
            uid: uid,
            file_tipe: fileType,
            file_size: fileSize,
         },
      });
   }
}
