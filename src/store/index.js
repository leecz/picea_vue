import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import auth from "./auth.module";
import chart from "./modules/chart";
import template from "./modules/template";
import theme from "./modules/theme";

export default new Vuex.Store({
  modules: {
    auth,
    chart,
    template,
    theme
  }
});
