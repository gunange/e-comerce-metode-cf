import { defineStore } from "pinia";
import { storeDefault } from "@/services/atribut";
import { StoreDataFormApi } from "@/services/interface";

export const storeId = "admin-store";

export const userStorage = defineStore(storeId, {
   state: (): {
      atribut: StoreDataFormApi;
      feeder: StoreDataFormApi;
      priode: StoreDataFormApi;
      websocket: WebSocket | null;
   } => ({
      atribut: { ...storeDefault },
      feeder: { ...storeDefault },
      priode: { ...storeDefault },
      websocket: null,
   }),
});
