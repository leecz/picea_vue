import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import auth from "./auth.module";
import chart from "./modules/chart";
import template from "./modules/template";

export default new Vuex.Store({
  modules: {
    auth,
    chart,
    template
  }
});
