import { StoreDataFormApi, StoreDataOnlyFormApi } from "./interface";

export const AtributService = {
   get listDays() {
      return [
         { label: "Senin", value: 1 },
         { label: "Selasa", value: 2 },
         { label: "Rabu", value: 3 },
         { label: "Kamis", value: 4 },
         { label: "Jumat", value: 5 },
         { label: "Sabtu", value: 6 },
      ];
   },
   get listOpsiKategori() {
      return ["Elektronik", "Kosmetik", "Fashion"];
   },
};

export const storeDefault: StoreDataFormApi = {
   load: false,
   run: false,
   data: [],
};

export const storeOnlyDefault: StoreDataOnlyFormApi = {
   load: false,
   run: false,
   data: {},
};
