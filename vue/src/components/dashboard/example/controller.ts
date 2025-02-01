
import { TimeApp } from "@/controller/tools";
import { getActivePinia } from "pinia";

import { userStorage, storeId } from "./store";



export class Controller {
   get store (){
      return userStorage();
   }

   private get isInitStore(){
      const pinia = getActivePinia();
      return pinia.state.value.hasOwnProperty(storeId)
   }

   dispose() {
      if (this.isInitStore) {
         if(this.store.websocket) this.store.websocket.close();
         this.store.$reset();
         this.store.$dispose();
      }
   }
   get time() {
      return new TimeApp();
   }
}