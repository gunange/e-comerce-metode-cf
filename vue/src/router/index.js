import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import AdminChildren from "./children/admin.js";
import HomeChildren from "./children/home.js";
import LoginChildren from "./children/login.js";

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
         children : LoginChildren,
      },
      {
         path: "/admin",
         name: "admin",
         component: () => import("@/layouts/admin-layout.vue"),
         children: AdminChildren,
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
