import { TimeApp } from "@/controller/tools";
import { getActivePinia } from "pinia";

import { homeStorage, storeId } from "./store";

import { AuthController } from "@/controller/controllers/AuthController";

const auth = new AuthController();

export class Controller {
   get store() {
      return homeStorage();
   }

   get user() {
      let user;
      if (auth.user) {
         if (auth.user?.user.role_id === 4) {
            user = auth.user;
         }
      }
      return user;
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
