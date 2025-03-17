import { defineStore } from "pinia";

export const storeId = "home-store";

export const homeStorage = defineStore(storeId, {
   state: (): {
      kategori: {
         load: boolean;
         run: boolean;
         label: string;
         data: any[];
      };
      detail_product: { load: boolean; run: boolean; id: number; data: any };
      order: { load: boolean; run: boolean; id: number; data: any };
   } => ({
      kategori: { load: false, run: false, label: "", data: [] },
      detail_product: { load: false, run: false, id: null, data: {} },
      order: { load: false, run: false, id: null, data: {} },
   }),
});
