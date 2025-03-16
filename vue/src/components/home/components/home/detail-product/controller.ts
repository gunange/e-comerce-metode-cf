import { pathApi } from "@/components/dashboard/seller/config";
import { delay } from "@/controller/tools";


import {homeStorage} from "@/components/home/store"

import { TimeApp } from "@/controller/tools";
import {
   
   get,
   
} from "@/controller/others/RequestApiController";

export class Controller {
   get collection() {
      return `main/product`;
   }
   get time() {
      return new TimeApp();
   }
   get storage() {
    return homeStorage().detail_product;
 }
}



export class MainData extends Controller {
    get data() {
        return this.storage;
     }
   get item() {
      const data = this.data.data;
      return {
         ...data,
         updated_at: this.time.formatDate(data["updated_at"]),
         created_at: this.time.formatDate(data["created_at"]),
      };
   }

   async init(): Promise<void> {
      if (this.data.load) return;
      this.data.load = true;

      const { data, status } = await get(`${this.collection}/detail/${this.data.id}`);
      this.data.data = data;
      this.data.run = status === 200;
      this.data.load = false;
   }

   async reset() {
      this.data.load = false;
      this.data.run = false;
      this.data.data = [];

      await delay(100);

      await this.init();
   }
}
