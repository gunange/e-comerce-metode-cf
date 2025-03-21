import { defineStore } from "pinia";
import { storeDefault } from "@/services/atribut";
import { StoreDataFormApi } from "@/services/interface";

export const storeId = "admin-store";

export const userStorage = defineStore(storeId, {
   state: (): {
      seller: StoreDataFormApi;
      product: StoreDataFormApi;
      pesanan: StoreDataFormApi;
   } => ({
      seller: { ...storeDefault },
      product: { ...storeDefault },
      pesanan: { ...storeDefault },
   }),
});
