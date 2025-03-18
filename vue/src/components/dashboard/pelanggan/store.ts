import { defineStore } from "pinia";

import { StoreDataFormApi } from "@/services/interface";
import { storeDefault } from "@/services/atribut";

export const storeId = "pelanggan-store";

export const userStorage = defineStore(storeId, {
   state: (): {
      keranjang: StoreDataFormApi;
      pesanan: StoreDataFormApi;
   } => ({
      keranjang: { ...storeDefault },
      pesanan: { ...storeDefault },
   }),
});
