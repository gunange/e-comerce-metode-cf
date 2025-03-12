import { pathApi } from "@/components/dashboard/seller/config";
import { delay } from "@/controller/tools";
import { reactive } from "vue";
import { userStorage } from "../../store";
import { HeandleSubmitApi } from "@/controller/others/HeandleSubmitApi";
import { TimeApp } from "@/controller/tools";
import {
   del,
   get,
   patch,
   post,
} from "@/controller/others/RequestApiController";

export class Controller {
   get collection() {
      return `${pathApi}/product`;
   }
   get time() {
      return new TimeApp();
   }
   get storage() {
      return userStorage().product;
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
   async add(body: any): Promise<void> {
      const { data, status } = await post(this.collection, body, {
         alert: {
            summary: "Sukses",
            detail: "Menambahkan data",
         },
      });

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
      const { data, status } = await del(`${this.collection}/${this.uid}`, {
         alert: {
            summary: "Sukses",
            detail: "Menghapus data",
         },
      });
      this.del_item(this.uid, status);
      this.modal.proses_form = false;
   }

   async resetPassword(body: any): Promise<void> {
      const { data, status } = await patch(
         `${this.collection}/reset-password/${this.uid}`,
         body,
         {
            alert: {
               summary: "Sukses",
               detail: `Memperbahrui Passwrod ${this.data.nama}`,
            },
         }
      );

      if (status === 201 || status === 200) this.close();
      this.modal.proses_form = false;
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
      if (this.data.load) return;
      this.data.load = true;

      const { data, status } = await get(`${this.collection}`);
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
