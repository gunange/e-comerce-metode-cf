import { toastStore } from "@/stores/services/toast-store";

export class HeandleSubmitApi {
   get toast() {
      return toastStore().toast;
   }
   error(status, response:any): boolean {
      if (status === 201 || status === 200) {
         return false;
      }
      let detailMessge;
      let summaryMessge;

      if (response.message && !response.errors) {
         detailMessge = response.message;
         summaryMessge = response.message;
      } else if (response.errors && typeof response.errors == "string") {
         summaryMessge = response.message ?? "Error";
         detailMessge = response.errors;
      } else if (response.errors && typeof response.errors == "object") {
         summaryMessge = response.message ?? "Error";
         if (Array.isArray(response.errors)) {
            detailMessge = response.errors
               .map((error) => error.message)
               .join(",\n");
         } else {
            const allError = Object.values(response.errors).reduce((acc) => {
               return acc;
            });
            var error = "";
            if (Array.isArray(allError)) error = allError.join(",\n");
            detailMessge = error;
         }
      }

      this.toast.add({
         severity: "error",
         summary: summaryMessge,
         detail: detailMessge,
         life: 5000,
      });
      return true;
   }
   sukses(detail?: String, summary?: String) {
      this.toast.add({
         severity: "success",
         summary: summary ?? "Sukses",
         detail: detail ?? "Sukses !",
         life: 3000,
      });
   }
}
