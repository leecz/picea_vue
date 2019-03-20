import echarts from "echarts";
import store from "@/store";
import { SET_THEMES } from "@/store/mutations.type";

// 引入 ./echart-theme 目录下的主题文件，注册到 echarts 中，将主题名字存到 vuex 中。
const files = require.context("./echart-theme/", false, /\.json$/);

const themes = [];
files.keys().forEach(filename => {
  let name = filename.replace(/(.*\/)*([^.]+).*/gi, "$2");
  echarts.registerTheme(name, files(filename));
});

store.commit(SET_THEMES, themes);
