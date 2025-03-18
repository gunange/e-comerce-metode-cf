const moduleName = "seller";

const routes = [
   {
      path: "",
      name: `${moduleName}-home`,
      component: () => import("@/views/dashboard/seller/main-view.vue"),
   },
   {
      path: "main",
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
   {
      path: "pesanan-proses",
      name: `${moduleName}-pesanan-proses`,
      component: () => import("@/views/dashboard/seller/pesanan-proses.vue"),
   },

   // not-found
   {
      path: "/seller/:pathMatch(.*)*",
      name: "Not-Found-Seller",
      component: () => import("@/widgets/others/404Layout.vue"),
   },
   
];

export default routes;
