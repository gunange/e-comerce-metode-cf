
import { delay } from "@/controller/tools";
import { toastStore } from "@/stores/services/toast-store";

import { watch, reactive } from "vue";
import { TimeApp } from "@/controller/tools";

export class Controller {
   modal = reactive({
      show: false,
      label: "Label",
      act: null,
      proses_form: false,
      uid: null,
   });

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
}