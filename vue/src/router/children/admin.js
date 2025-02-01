const routes = [
   {
      path: "",
      name: "admin-home",
      component: () => import("@/views/dashboard/admin/main-view.vue"),
   },
   {
      path: "admin-main",
      name: "admin-main",
      component: () => import("@/views/dashboard/admin/main-view.vue"),
   },
   
];

export default routes;
