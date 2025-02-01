import { routerStore } from "@/stores/services/router-store"
import { AuthController } from "@/controller/controllers/AuthController";


const path = "admin";
const route = routerStore();

const menu = [
   {
      label: "Home",
      icon: "pi pi-home",
      route: `/${path}/main`,
   },
   {
      label: "Feeder",
      icon: "pi pi-palette",
      route: `/${path}/feeder`,
   },
   {
      label: "Atribut",
      icon: "pi pi-palette",
      route: `/${path}/atribut`,
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

const message = [
   {
      label: "Message 1",
      icon: "pi pi-paperclip",
      command: () => {
         console.log("OK");
      },
   },
   {
      label: "Message 2",
      icon: "pi pi-paperclip",
      command: () => {
         console.log("OK");
      },
   },
];

const notif = [
   {
      label: "Notif 1",
      icon: "pi pi-paperclip",
      command: () => {
         console.log("OK");
      },
   },
];

export const sidebar = {
   menu: menu,
};

export const navbar = {
   profilMenu: profilMenu,
   message: message,
   notif: notif,
};

export const pathApi = "admin";