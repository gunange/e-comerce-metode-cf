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
];

export default routes;
