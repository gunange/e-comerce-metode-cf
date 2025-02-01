const routes = [
   {
      path: "",
      name: "sub-main-home",
      component: () => import("@/views/home/home-view.vue"),
   },
   {
      path: "pmb-registrasi",
      name: "pmb-registrasi",
      component: () => import("@/widgets/others/404Layout.vue"),
   },
];

export default routes;
