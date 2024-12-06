import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/Home.vue";
import searchedResults from "../views/SearchedResults.vue";
import dashboard from "../views/Dashboard";
import error404 from "../views/Error404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },

  {
    path: "/dashboard",
    name: "dashboard",
    component: dashboard,
  },

  {
    path: "/searchedResults",
    name: "searchedResults",
    component: searchedResults,
  },

  {
    path: "/error404",
    name: "error404",
    component: error404,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
