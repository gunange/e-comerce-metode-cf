const moduleName = "staff";

const routes = [
   {
      path: "",
      name: `${moduleName}-home`,
      component: () => import("@/views/dashboard/staff/main-view.vue"),
   },
   {
      path: "main",
      name: `${moduleName}-main`,
      component: () => import("@/views/dashboard/staff/main-view.vue"),
   },

   {
      path: "product",
      name: `${moduleName}-product`,
      component: () => import("@/views/dashboard/staff/product.vue"),
   },
   {
      path: "pesanan-diminta",
      name: `${moduleName}-pesanan-diminta`,
      component: () => import("@/views/dashboard/staff/pesanan-diminta.vue"),
   },
   {
      path: "pesanan-proses",
      name: `${moduleName}-pesanan-proses`,
      component: () => import("@/views/dashboard/staff/pesanan-proses.vue"),
   },
   {
      path: "pesanan-selesai",
      name: `${moduleName}-pesanan-selesai`,
      component: () => import("@/views/dashboard/staff/pesanan-selesai.vue"),
   },
   {
      path: "stock-product",
      name: `${moduleName}-stock-product`,
      component: () => import("@/views/dashboard/staff/stock-product.vue"),
   },

   // not-found
   {
      path: "/staff/:pathMatch(.*)*",
      name: "Not-Found-Staff",
      component: () => import("@/widgets/others/404Layout.vue"),
   },
];

export default routes;
