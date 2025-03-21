import { defineStore } from "pinia";
import { storeDefault } from "@/services/atribut";
import { StoreDataFormApi } from "@/services/interface";

export const storeId = "admin-store";

export const userStorage = defineStore(storeId, {
   state: (): {
      
      product: StoreDataFormApi;
      pesanan: StoreDataFormApi;
   } => ({
      
      product: { ...storeDefault },
      pesanan: { ...storeDefault },
   }),
});
