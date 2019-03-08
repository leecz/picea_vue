import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "tachyons/css/tachyons.min.css";

import ElementUI from "element-ui";
import "./assets/element-variables.scss";
Vue.use(ElementUI);

import "./assets/scss/index.scss";

import "./assets/iconfont/iconfont.js";
import SvgIcon from "@/components/svg-icon";
Vue.component("SvgIcon", SvgIcon);

Vue.config.productionTip = false;

import ApiService from "./common/api.service";
ApiService.init();

import "./router/interceptor";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
