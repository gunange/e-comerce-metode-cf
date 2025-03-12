import { routerStore } from "@/stores/services/router-store"
import { AuthController } from "@/controller/controllers/AuthController";


const path = "seller";
const route = routerStore();

const menu = [
   {
      label: "Home",
      icon: "pi pi-home",
      route: `/${path}/main`,
   },
   {
      label: "Staff",
      icon: "pi pi-palette",
      route: `/${path}/staff`,
   },
   {
      label: "Product",
      icon: "pi pi-palette",
      route: `/${path}/product`,
   },
   {
      label: "Priode",
      icon: "pi pi-palette",
      route: `/${path}/priode`,
   },
   
   
];

const profilMenu = [
   {
      label: "Logout",
      icon: "pi pi-power-off text-red-500",
      command: () => {         
         const auth = new AuthController();
         auth.signOut(()=>{
            route.router.replace('/login');
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

export const pathApi = "admin-toko";