import { pathApi } from "@/components/dashboard/pelanggan/config";
import { delay } from "@/controller/tools";

import { homeStorage } from "@/components/home/store";
import { Controller as UserController } from "@/components/dashboard/pelanggan/controller";

import { TimeApp } from "@/controller/tools";
import { del, get, patch, post } from "@/controller/others/RequestApiController";
import { reactive } from "vue";
import { HeandleSubmitApi } from "@/controller/others/HeandleSubmitApi";

const __c = new UserController();

export class Controller {
   get collection() {
      return `${pathApi}/order`;
   }
   get time() {
      return new TimeApp();
   }
   get storage() {
      return homeStorage().order;
   }
   get storages() {
      return homeStorage().orders;
   }

   get user() {
      return __c.user;
   }
}

export class Cruds extends Controller {
   modal = reactive({
      show: false,
      label: "Label",
      act: null,
      proses_form: false,
      uid: null,
   });

   async open(): Promise<void> {
      await delay(50);
      this.modal.show = true;
   }
   async close(): Promise<void> {
      await delay(50);
      await this.reset();
   }

   async reset(): Promise<void> {
      this.modal.act = null;
      this.modal.proses_form = false;
      this.modal.label = "Label";
      this.modal.show = false;
      this.modal.uid = null;

      delay(100);
   }
   setUid(uid) {
      this.modal.uid = uid;
   }

   get heandle() {
      return new HeandleSubmitApi();
   }

   get data() {
      return this.storage.data.find((el) => el.id === this.modal.uid);
   }
   
   get uid() {
      return this.modal.uid;
   }

   /*
    * Fungsi daari crud yanng sebenarnnya adda dibawah ini
    */

   async add_item(data: any, status: Number) {
      if (status === 201 || status === 200) {
         this.storages.data.push(data);
         await this.reset();
      }
   }
   async del_item(id: Number, status: Number) {
      if (status === 201 || status === 200) {
         const index = this.storages.data.findIndex((item) => item.id === id);

         if (index !== -1) {
            this.storages.data.splice(index, 1);
         }
         await this.reset();
      }
   }
   async up_item(data: any, id: Number, status: Number) {
      if (status === 201 || status === 200) {
         const index = this.storages.data.findIndex(
            (dataItem) => dataItem.id === id
         );
         if (index !== -1) {
            this.storages.data.splice(index, 1, data);
         }
         await this.reset();
      }
   }
   async add(body: any): Promise<void> {
      const { data, status } = await post(this.collection, body, {alert: {
         summary: "Sukses",
         detail: "Berhasil melakukan pemesanan",
      },});

      this.add_item(data, status);
      this.modal.proses_form = false;
   }

   async up(body: any): Promise<void> {
      const { data, status } = await patch(
         `${this.collection}/${this.uid}`,
         body,
         {
            alert: {
               summary: "Sukses",
               detail: "Memperbahrui data",
            },
         }
      );

      this.up_item(data, this.uid, status);
      this.modal.proses_form = false;
   }

   async del() {
      const { data, status } = await del(
         `${this.collection}/${this.uid}`,
         {
            alert: {
               summary: "Sukses",
               detail: "Menghapus data",
            },
         }
      );
      this.del_item(this.uid, status);
      this.modal.proses_form = false;
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

      const { data, status } = await get(
         `main/product/detail/${this.data.id}`
      );
      this.data.data = data;
      this.data.run = status === 200;
      this.data.load = false;
   }
   async initFormKeranjang(): Promise<void> {
      const keranjang = __c.store.keranjang;
      if (!keranjang.run) return;
      this.data.load = true;

      this.data.data = keranjang.data.find((el) => el.id == this.data.id);

      this.data.run = this.data.data ? true : false;
      this.data.load = false;
   }

   async reset() {
      this.data.load = false;
      this.data.run = false;
      this.data.id = null;
      this.data.data = {};

      await delay(100);

      await this.init();
   }
}
