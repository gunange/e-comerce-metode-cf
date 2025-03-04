const routes = [
   {
      path: "",
      name: "seller-home",
      component: () => import("@/views/dashboard/seller/main-view.vue"),
   },
   {
      path: "seller-main",
      name: "seller-main",
      component: () => import("@/views/dashboard/seller/main-view.vue"),
   },
   
];

export default routes;
