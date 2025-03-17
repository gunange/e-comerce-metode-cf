const moduleName = "home";

const routes = [
   {
      path: "",
      name: `${moduleName}-submain`,
      component: () => import("@/views/home/home-view.vue"),
   },
   {
      path: "sub-main",
      name: `${moduleName}-sub-main`,
      component: () => import("@/views/home/home-view.vue"),
   },
   {
      path: "detail-product/:id",
      name: `${moduleName}-detail-product`,
      component: () => import("@/views/home/detail-product.vue"),
   },
   {
      path: "keranjang",
      name: `${moduleName}-keranjang`,
      component: () => import("@/views/home/keranjang.vue"),
   },
   {
      path: "order/:id",
      name: `${moduleName}-order`,
      component: () => import("@/views/home/order.vue"),
   },
   {
      path: "pesanan-saya",
      name: `${moduleName}-pesanan-saya`,
      component: () => import("@/views/home/pesanan-saya.vue"),
   },
   {
      path: "order-in-keranjang/:id",
      name: `${moduleName}-order-in-keranjang`,
      component: () => import("@/views/home/order-in-keranjang.vue"),
   },

    // not-found
    {
      path: "/home/:pathMatch(.*)*",
      name: "Not Found Landing Page",
      component: () => import("@/widgets/others/404Layout.vue"),
   },
];

export default routes;
