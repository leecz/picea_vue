import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "tachyons/css/tachyons.min.css";

import ElementUI from "element-ui";
import "./assets/element-variables.scss";
Vue.use(ElementUI);

import "./assets/scss/index.scss";

// import "./assets/iconfont/iconfont.js";
import SvgIcon from "@/components/svg-icon";
Vue.component("SvgIcon", SvgIcon);

Vue.config.productionTip = false;

import ApiService from "./common/api.service";
ApiService.init();

import "./router/interceptor";

import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";
Vue.component("VueSlider", VueSlider);
import PercentSlider from "./components/PercentSlider";
Vue.component("PercentSlider", PercentSlider);

import "./common/theme.config";

import D3Chart from "@/components/d3-chart";
Object.keys(D3Chart).forEach(key => {
  Vue.component(key, D3Chart[key]);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
