import { defineStore } from "pinia";


export const authStore = defineStore("authStore", {
   state: () => ({
      isAuth: false,
      user: {},
      token:null,
      proses: {
         sukses: false,
         load: false,
      },
   }),
   actions: {},
});
