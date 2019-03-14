import Vue from "vue";
import Router from "vue-router";
import Work from "@/views/layouts/Work.vue";
import Home from "@/views/layouts/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "",
          name: "home",
          redirect: { name: "login" }
          // component: () => import("@/views/Home")
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/views/login")
        }
      ]
    },
    {
      path: "/works",
      component: Work,
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: "",
          name: "works",
          component: () => import("@/views/works")
        },
        {
          path: "sheets",
          name: "sheets",
          component: () => import("@/views/sheets")
        },
        {
          path: "sheets/new",
          name: "sheets_new",
          component: () => import("@/views/sheets/New")
        },
        {
          path: "chart/templates",
          name: "chart_templates",
          component: () => import("@/views/chart/templates/index")
        },
        {
          path: "chart/edit",
          name: "chart_edit",
          component: () => import("@/views/chart/Edit")
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "@/views/About.vue")
    }
  ]
});
