import { tokenName } from "@/config/appInfo.js";
import { toastStore } from "@/stores/services/toast-store";

import { delay } from "@/controller/tools";
import { reactive } from "vue";

import { routerStore } from "@/stores/services/router-store";
import { post } from "@/controller/others/RequestApiController";

import { Controller as PelanggandStorageController } from "@/components/dashboard/pelanggan/controller";

export class Controller {
   collection_name = "users";
   router = routerStore().router;

   post = reactive({
      sukses: false,
      load: false,
      data: null,
      errors: null,
      message: null,
   });

   get toast() {
      return toastStore().toast;
   }

   async onSubmit(body: any): Promise<void> {
      if (this.post.load) return;

      this.reset();
      this.post.load = true;

      try {
         const { data, status, errors, message } = await post(
            "user/login",
            body
         );

         this.post.sukses = status === 201;
         this.post.data = data;

         if (this.post.sukses) {
            const router = this.router;
            const data = this.post.data ?? null;
            var routeTo = null;

            routeTo = this.routeRedirect(data);

            if (routeTo) {
               localStorage.setItem(tokenName, data.token);
               router.push(routeTo);
               return;
            } else {
               this.post.sukses = false;
               this.post.data.errors = ["Tidak menemukan route"];
            }
         } else {
            this.post.message = message;
            this.post.errors =
               Array.isArray(errors) && errors.length > 0
                  ? errors.join(",\n")
                  : errors;
         }
         await delay(250);
      } catch (_) {}
      this.post.load = false;
   }

   routeRedirect(data: any): any {
      var routeTo = null;
      if (data && data.role === "4dm1n1sTr4t0r") {
         routeTo = "/admin";
      } else if (data && data.role === "p4n1T1a") {
         routeTo = "/panitia";
      } else if (data && data.role === "p3lAnGg4n") {
         routeTo = "/";
      }
      return routeTo;
   }

   reset(): void {
      this.post.load = false;
      this.post.sukses = false;
      this.post.data = null;
   }
}
