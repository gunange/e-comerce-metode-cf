import { toastStore } from "@/stores/services/toast-store";

import {  reactive } from "vue";
import { TimeApp } from "@/controller/tools";

import { homeStore } from "@/stores/others/home";
import { delay } from "@/controller/tools";
import { get, post } from "@/controller/others/RequestApiController";

export class Controller {
   modal = reactive({
      show: false,
      label: "Label",
      act: null,
      proses_form: false,
      uid: null,
   });

   sendInfo = reactive({
      load: false,
      run: false,
      sukses: false,
      statusCode: null,
      msg: null,
      data: {},
   });

   get collection() {
      return "public";
   }

   async open(): Promise<void> {
      this.modal.show = true;
      await delay(150);
   }
   async close(): Promise<void> {
      await delay(50);
      await this.reset();
   }

   get toast() {
      return toastStore().toast;
   }

   get uid(): string {
      return this.modal.uid ?? "unknow";
   }

   get time() {
      const timeC = new TimeApp();
      timeC.realTime = false;
      return timeC;
   }

   get storage() {
      return homeStore().form_registrasi;
   }

   setUid(uid) {
      this.modal.uid = uid;
   }

   async reset(): Promise<void> {
      this.modal.act = null;
      this.modal.proses_form = false;
      this.modal.label = "Label";
      this.modal.show = false;
      this.modal.uid = null;

      delay(100);
   }

   async resetInfo(): Promise<void> {
      this.sendInfo.msg = null;
      this.sendInfo.statusCode = null;
      this.sendInfo.run = false;
      this.sendInfo.sukses = false;
      this.sendInfo.load = false;
      this.sendInfo.data = {};
      delay(100);
   }
}

export class CrudCotroller extends Controller {
   get data(): any {
      return this.storage.sesi.data.filter((e) => e.uid == this.uid)[0] ?? {};
   }

   async onSend(body): Promise<void> {
      await this.resetInfo();
      body["penerima_kps"] = body.no_kps ? 1 : 0;
      body["id_sesi"] = this.storage.sesi.data.id;
      this.sendInfo.run = true;
      this.sendInfo.load = true;
      try {
         const { status, data } = await post(
            `${this.collection}/registrasi`,
            body
         );

         this.sendInfo.statusCode = status;
         status == 200
            ? (this.sendInfo.data = data.data)
            : (this.sendInfo.msg = data);
      } catch (_) {
         this.sendInfo.msg = "Terjadi kesalahan pada server";
      }
      this.sendInfo.run = false;
      this.sendInfo.load = false;
   }
}

export class SesiDaftar extends Controller {
   get data() {
      return this.storage.sesi;
   }
   get items() {
      return this.data.data.sort((a, b) => a.label.localeCompare(b.label));
   }

   async init(): Promise<void> {
      if (this.storage.sesi.run) return;
      this.storage.sesi.load = true;

      const { status, data } = await get(`${this.collection}/registrasi`);

      status === 200
         ? (this.storage.sesi.data = data)
         : ((this.storage.sesi.error = true),
           (this.storage.sesi.run = true),
           (this.storage.sesi.msg = data.errors));

      this.storage.sesi.load = false;
   }
}

export class ProdiController extends Controller {
   get data() {
      return this.storage.atribut.prodi;
   }

   get items() {
      return this.data.data.sort((a, b) => a.label.localeCompare(b.label));
   }

   async init(): Promise<void> {
      if (this.data.run) return;
      this.data.run = true;
      this.data.load = true;

      const { status, data } = await get(`${this.collection}/atribut/prodi`);
      status === 200 ? (this.data.data = data.data) : (this.data.run = false);
      this.data.load = false;
   }
}

export class AgamaController extends Controller {
   get data() {
      return this.storage.atribut.agama;
   }

   get items() {
      return this.data.data;
   }

   async init(): Promise<void> {
      if (this.data.run) return;
      this.data.run = true;
      this.data.load = true;

      const { status, data } = await get(`${this.collection}/atribut/agama`);

      status === 200 ? (this.data.data = data.data) : (this.data.run = false);

      this.data.load = false;
   }
}

export class JkController extends Controller {
   get data() {
      return this.storage.atribut.jk;
   }

   get items() {
      return this.data.data.sort((a, b) => a.uid - b.uid);
   }

   async init(): Promise<void> {
      if (this.data.run) return;
      this.data.run = true;
      this.data.load = true;

      const { status, data } = await get(`${this.collection}/atribut/jk`);

      status === 200 ? (this.data.data = data.data) : (this.data.run = false);

      this.data.load = false;
   }
}

export class NegaraController extends Controller {
   get data() {
      return this.storage.atribut.negara;
   }

   get items() {
      return this.data.data.sort((a, b) => a.uid - b.uid);
   }

   async init(): Promise<void> {
      if (this.data.run) return;
      this.data.run = true;
      this.data.load = true;

      const { status, data } = await get(
         `${this.collection}/atribut/kewarganegaraan`
      );

      status === 200 ? (this.data.data = data.data) : (this.data.run = false);

      this.data.load = false;
   }
}

export class WilayahController extends Controller {
   get data() {
      return this.storage.atribut.wilayah;
   }

   get items() {
      return this.data.data.sort((a, b) => a.uid - b.uid);
   }

   async init(): Promise<void> {
      if (this.data.run) return;
      this.data.run = true;
      this.data.load = true;

      const { status, data } = await get(
         `${this.collection}/atribut/wilayah`
      );

      status === 200 ? (this.data.data = data.data) : (this.data.run = false);

      this.data.load = false;
   }
}

export class JenisTinggalController extends Controller {
   get data() {
      return this.storage.atribut.jt;
   }

   get items() {
      return this.data.data.sort((a, b) => a.uid - b.uid);
   }

   async init(): Promise<void> {
      if (this.data.run) return;
      this.data.run = true;
      this.data.load = true;

      const { status, data } = await get(
         `${this.collection}/atribut/jenis-tinggal`
      );

      status === 200 ? (this.data.data = data.data) : (this.data.run = false);

      this.data.load = false;
   }
}

export class AlatTransportasiController extends Controller {
   get data() {
      return this.storage.atribut.alat_transportasi;
   }

   get items() {
      return this.data.data.sort((a, b) => a.uid - b.uid);
   }

   async init(): Promise<void> {
      if (this.data.run) return;
      this.data.run = true;
      this.data.load = true;

      const { status, data } = await get(
         `${this.collection}/atribut/alat-transportasi`
      );

      status === 200 ? (this.data.data = data.data) : (this.data.run = false);

      this.data.load = false;
   }
}

export class KebutuhanKhususController extends Controller {
   get data() {
      return this.storage.atribut.kebutuhan_khusus;
   }

   get items() {
      return this.data.data.sort((a, b) => a.uid - b.uid);
   }

   async init(): Promise<void> {
      if (this.data.run) return;
      this.data.run = true;
      this.data.load = true;

      const { status, data } = await get(
         `${this.collection}/atribut/kebutuhan-khusus`
      );

      status === 200 ? (this.data.data = data.data) : (this.data.run = false);

      this.data.load = false;
   }
}
