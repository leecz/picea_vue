import store from "../store";
import NProgress from "nprogress";

import router from "./index";

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.getters.isAuthenticated) {
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
