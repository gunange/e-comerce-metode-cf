import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import SellerChildren from "./children/seller.js";
import HomeChildren from "./children/home.js";

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         name: "home",
         component: () => import("@/layouts/home-layout.vue"),
         children : HomeChildren,
      },
      {
         path: "/login",
         name: "login",
         component: () => import("@/views/others/login.vue"),
      },
      {
         path: "/daftar",
         name: "daftar",
         component: () => import("@/views/others/daftar-pelanggan.vue"),
      },
      {
         path: "/daftar-seller",
         name: "daftar-seller",
         component: () => import("@/views/others/daftar-seller.vue"),
      },
      {
         path: "/seller",
         name: "seller",
         component: () => import("@/layouts/seller-layout.vue"),
         children: SellerChildren,
      },

      // not-found
      {
         path: "/:pathMatch(.*)*",
         name: "Not Found Home",
         component: () => import("@/widgets/others/404Layout.vue"),
     },
   ],
});

router.beforeEach((to, from, next) => {
   NProgress.start();
   next();
});

router.afterEach(() => {
   NProgress.done();
});
export default router;
