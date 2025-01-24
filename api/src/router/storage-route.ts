import { Hono } from "hono";

import { StorageController } from "@/controllers/controller/main/storage-controller";

export const storageRoute = new Hono();

storageRoute.post(StorageController.create);
storageRoute.post(':uid',StorageController.up);
storageRoute.delete(':uid',StorageController.del);
