const routes = [
   {
      path: "",
      name: "sub-main-home",
      component: () => import("@/views/home/home-view.vue"),
   },
   {
      path: "sub-main-home",
      name: "home-sub-main-home",
      component: () => import("@/views/home/home-view.vue"),
   },
];

export default routes;
