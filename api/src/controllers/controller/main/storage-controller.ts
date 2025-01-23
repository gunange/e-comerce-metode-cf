import * as util from "@/controllers/services/util";
import * as Controller from "@/controllers/interfaces/request/storage";
import { basename, extname } from "path";
import { exists, existsSync, unlinkSync } from "fs";

const dirPath = "public/storage";

export class StorageController {
   static async create(c: util.Context): Promise<any> {
      const file = ((await c.req.parseBody()) as File | any)["file"] as File;
      await Controller.IMAGE_SCHEMA.parse(file);

      const req = await Controller.RequestInsertSchema.parse(
         await c.req.parseBody()
      );

      // Akses informasi file
      const fileType = file.type;
      const fileSize = file.size;
      const uid = Bun.randomUUIDv7();
      const fileName = `${req.label}${extname(file.name)}`;

      const fileBuffer = await file.arrayBuffer();

      const cleanedPath =
         req.path.endsWith("/") && req.path.lastIndexOf("/") > 0
            ? req.path.slice(0, req.path.lastIndexOf("/"))
            : req.path;

      await Bun.write(
         `${dirPath}/${cleanedPath}/${fileName}`,
         new Uint8Array(fileBuffer),
         {
            createPath: true,
         }
      );

      await util.dbClient.storage.create({
         data: {
            uid: uid,
            path: `${dirPath}/${cleanedPath}`,
            name: fileName,
            mime_type: fileType,
         },
      });

      return c.json({
         data: {
            uid: uid,
            file_tipe: fileType,
            file_size: fileSize,
         },
      });
   }

   static async up(c: util.Context): Promise<any> {
      const file = ((await c.req.parseBody()) as File | any)["file"] as File;
      await Controller.IMAGE_SCHEMA.parse(file);

      const uid = c.req.param("uid");

      const db = await util.dbClient.storage.findFirstOrThrow({
         where: {
            uid: uid,
         },
      });

      // Akses informasi file
      const fileType = file.type;
      const fileSize = file.size;

      const newExtname = extname(file.name); // Ekstensi baru dari file
      const oldBasename = basename(db.name, extname(db.name)); // Nama file tanpa ekstensi lama
      const fileName = `${oldBasename}${newExtname}`; // Perbarui nama file dengan ekstensi baru

      const oldFile = `${db.path}/${db.name}`;

      if (db.mime_type !== fileType) await (await Bun.file(oldFile) as any ).delete()

      const filePath = `${db.path}/${fileName}`;
      await Bun.write(filePath, new Uint8Array(await file.arrayBuffer()), {
         createPath: true,
      });

      await util.dbClient.storage.update({
         where: {
            uid: uid,
         },
         data: {
            name: fileName,
            mime_type: fileType,
         },
      });

      return c.json({
         data: {
            uid: uid,
            path: filePath,
            name: fileName,
            mime_type: fileType,
            size: fileSize,
         },
      });
   }
}
