import { TimeApp } from "@/controller/tools";
import { getActivePinia } from "pinia";

import { homeStorage, storeId } from "./store";

export class Controller {
   get store() {
      return homeStorage();
   }

   private get isInitStore() {
      const pinia = getActivePinia();
      return pinia.state.value.hasOwnProperty(storeId);
   }

   dispose() {
      if (this.isInitStore) {
         this.store.$reset();
         this.store.$dispose();
      }
   }
   get time() {
      return new TimeApp();
   }
}
