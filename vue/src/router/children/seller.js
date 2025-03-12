const moduleName = "seller";

const routes = [
   {
      path: "",
      name: `${moduleName}-home`,
      component: () => import("@/views/dashboard/seller/main-view.vue"),
   },
   {
      path: "seller-main",
      name: `${moduleName}-main`,
      component: () => import("@/views/dashboard/seller/main-view.vue"),
   },
   {
      path: "staff",
      name: `${moduleName}-staff`,
      component: () => import("@/views/dashboard/seller/staff.vue"),
   },
   {
      path: "product",
      name: `${moduleName}-product`,
      component: () => import("@/views/dashboard/seller/product.vue"),
   },
   
];

export default routes;
