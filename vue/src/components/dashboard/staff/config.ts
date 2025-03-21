import { routerStore } from "@/stores/services/router-store";
import { AuthController } from "@/controller/controllers/AuthController";

const path = "staff";
const route = routerStore();

const menu = [
   {
      label: "Home",
      icon: "pi pi-home",
      route: `/${path}/main`,
   },
   {
      label: "Product",
      icon: "pi pi-palette",
      route: `/${path}/product`,
   },
   {
      label: "Stock Product",
      icon: "pi pi-palette",
      route: `/${path}/stock-product`,
   },

   {
      label: "Permintaan Pesanan",
      icon: "pi pi-palette",
      route: `/${path}/pesanan-diminta`,
   },
   {
      label: "Pesanan Diproses",
      icon: "pi pi-palette",
      route: `/${path}/pesanan-proses`,
   },

   {
      label: "Pesanan Selesai",
      icon: "pi pi-palette",
      route: `/${path}/pesanan-selesai`,
   },
];

const profilMenu = [
   {
      label: "Logout",
      icon: "pi pi-power-off text-red-500",
      command: () => {
         const auth = new AuthController();
         auth.signOut(() => {
            route.router.replace("/login");
         });
      },
   },
];

export const sidebar = {
   menu: menu,
};

export const navbar = {
   profilMenu: profilMenu,
};

export const pathApi = "staff";
