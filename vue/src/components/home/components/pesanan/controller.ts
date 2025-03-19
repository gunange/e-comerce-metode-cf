import { pathApi } from "@/components/dashboard/pelanggan/config";
import { delay } from "@/controller/tools";


import { Controller as UserController } from "@/components/dashboard/pelanggan/controller";

import { TimeApp } from "@/controller/tools";
import { del, get, patch, post } from "@/controller/others/RequestApiController";
import { reactive } from "vue";
import { HeandleSubmitApi } from "@/controller/others/HeandleSubmitApi";

const __c = new UserController();

export class Controller {
   get collection() {
      return `${pathApi}/pesanan`;
   }
   get time() {
      return new TimeApp();
   }
   get storage() {
      return __c.store.pesanan;
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
         this.storage.data.push(data);
         await this.reset();
      }
   }
   async del_item(id: Number, status: Number) {
      if (status === 201 || status === 200) {
         const index = this.storage.data.findIndex((item) => item.id === id);

         if (index !== -1) {
            this.storage.data.splice(index, 1);
         }
         await this.reset();
      }
   }
   async up_item(data: any, id: Number, status: Number) {
      if (status === 201 || status === 200) {
         const index = this.storage.data.findIndex(
            (dataItem) => dataItem.id === id
         );
         if (index !== -1) {
            this.storage.data.splice(index, 1, data);
         }
         await this.reset();
      }
   }

   async terima(body: any): Promise<void> {
      const { data, status } = await patch(
         `${this.collection}/terima/${this.uid}`,
         body,
         {
            alert: {
               summary: "Sukses",
               detail: "Berhasil Klaim dan Penilaian",
            },
         }
      );

      this.up_item(data, this.uid, status);
      this.modal.proses_form = false;
   }

}

export class MainData extends Controller {
   get data() {
      return this.storage;
   }
   get items() {
      const data = this.data.data;
      return {
         ...data,
         updated_at: this.time.formatDate(data["updated_at"]),
         created_at: this.time.formatDate(data["created_at"]),
      };
   }
   get itemsProses() {
      const data = this.data.data.length
         ? this.data.data.map((el) => {
              return {
                 ...el,
                 updated_at: this.time.formatDate(el.updated_at),
                 created_at: this.time.formatDate(el.created_at),
              };
           })
         : [];

      return data.filter((el) =>
         el.status_order.some(
            (e) =>
               !e.status_code && e.status === "PROSES"
         )
      );
   }

   get itemsDikirim() {
      const data = this.data.data.length
         ? this.data.data.map((el) => {
              return {
                 ...el,
                 updated_at: this.time.formatDate(el.updated_at),
                 created_at: this.time.formatDate(el.created_at),
              };
           })
         : [];

      return data.filter((el) =>
         el.status_order.some(
            (e) =>
               !e.status_code && e.status === "PENGANTARAN"
         )
      );
   }
   get itemsDibatalkan() {
      const data = this.data.data.length
         ? this.data.data.map((el) => {
              return {
                 ...el,
                 updated_at: this.time.formatDate(el.updated_at),
                 created_at: this.time.formatDate(el.created_at),
              };
           })
         : [];

      return data.filter((el) =>
         el.status_order.some(
            (e) =>
               !e.status_code && e.status === "DIBATALKAN"
         )
      );
   }
   get itemsSelesai() {
      const data = this.data.data.length
         ? this.data.data.map((el) => {
              return {
                 ...el,
                 updated_at: this.time.formatDate(el.updated_at),
                 created_at: this.time.formatDate(el.created_at),
              };
           })
         : [];

      return data.filter((el) =>
         el.status_order.some(
            (e) =>
               !e.status_code && e.status === "SELESAI"
         )
      );
   }

   async init(): Promise<void> {
      if (this.data.load) return;
      this.data.load = true;

      const { data, status } = await get(
         `${this.collection}`
      );
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
