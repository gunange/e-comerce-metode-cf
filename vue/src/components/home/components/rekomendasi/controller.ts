import { pathApi } from "@/components/dashboard/pelanggan/config";
import { delay } from "@/controller/tools";

import { homeStorage } from "@/components/home/store";
import { Controller as UserController } from "@/components/dashboard/pelanggan/controller";

import { TimeApp } from "@/controller/tools";
import {
   del,
   get,
   patch,
   post,
} from "@/controller/others/RequestApiController";
import { reactive } from "vue";
import { HeandleSubmitApi } from "@/controller/others/HeandleSubmitApi";

const __c = new UserController();

export class Controller {
   get collection() {
      return `${pathApi}/rekomendasi`;
   }
   get time() {
      return new TimeApp();
   }
   get storage() {
      return homeStorage().rekomendasi;
   }

   get user() {
      return __c.user;
   }
}

export class MainData extends Controller {
   get data() {
      return this.storage;
   }
   get items() {
      return this.data.data.length
         ? this.data.data.map((el) => {
              return {
                 ...el,
                 updated_at: this.time.formatDate(el.updated_at),
                 created_at: this.time.formatDate(el.created_at),
              };
           })
         : [];
   }

   async init(): Promise<void> {
      if (this.data.load && this.user) return;
      this.data.load = true;

      const { data, status } = await get(`${this.collection}/${this.user.id}`);
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
