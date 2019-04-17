import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import auth from "./auth.module";
import chart from "./modules/chart";
import template from "./modules/template";
import theme from "./modules/theme";
import chartConfig from "./modules/chartConfig";

export default new Vuex.Store({
  modules: {
    auth,
    chart,
    template,
    theme,
    chartConfig
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      reducer: state => ({
        auth: state.auth,
        chart: state.chart,
        theme: state.theme
      })
    })
  ]
});
