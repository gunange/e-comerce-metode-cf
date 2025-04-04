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
      path: "pesanan-diminta",
      name: `${moduleName}-pesanan-diminta`,
      component: () => import("@/views/dashboard/seller/pesanan-diminta.vue"),
   },
   {
      path: "pesanan-proses",
      name: `${moduleName}-pesanan-proses`,
      component: () => import("@/views/dashboard/seller/pesanan-proses.vue"),
   },
   {
      path: "pesanan-selesai",
      name: `${moduleName}-pesanan-selesai`,
      component: () => import("@/views/dashboard/seller/pesanan-selesai.vue"),
   },
   {
      path: "stock-product",
      name: `${moduleName}-stock-product`,
      component: () => import("@/views/dashboard/seller/stock-product.vue"),
   },

   // not-found
   {
      path: "/seller/:pathMatch(.*)*",
      name: "Not-Found-Seller",
      component: () => import("@/widgets/others/404Layout.vue"),
   },
   
];

export default routes;
