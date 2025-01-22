import * as util from "@/controllers/services/util";
import * as Controller from "@/controllers/interfaces/request/storage";
import { basename, extname } from "path";

export class StorageController {
   static async upload(c: util.Context): Promise<any> {
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

      return c.json({
         data: {
            uid: uid,
            message: "File uploaded successfully",
            file_name: fileName,
            file_tipe: fileType,
            file_size: fileSize,
         },
      });
   }
}
