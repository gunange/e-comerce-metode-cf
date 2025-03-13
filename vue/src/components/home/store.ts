import { defineStore } from "pinia";
import { StoreDataFormApi, StoreDataOnlyFormApi } from "@/services/interface";
import { storeDefault } from "@/services/atribut";

export const storeId = "pelanggan-store";

export interface StoreKategoriFormApi {
   load: boolean;
   run: boolean;
   label: string;
   data: any[];
}
export const storeDefaultKategori: StoreKategoriFormApi = {
   load: false,
   run: false,
   label: '',
   data: [],
};

export const homeStorage = defineStore(storeId, {
   state: (): {
      kategori: StoreKategoriFormApi;
   } => ({
      kategori: { ...storeDefaultKategori },
   }),
});
