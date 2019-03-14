import { SET_OPTION, UPDATE_OPTION } from "../mutations.type";
import _ from "lodash";

const state = {
  option: {
    title: {},
    dataset: {
      source: [
        [null, "语文", "数学", "英语"],
        ["李承志", 23, 44, 88],
        ["娃哈哈", 23, 33, 66],
        ["沉默", 34, 33, 55],
        ["嘻嘻", 65, 11, 55]
      ]
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [{ type: "bar" }, { type: "bar" }, { type: "line" }],
    custom: {}
  }
};

const getters = {
  currentOption(state) {
    return state.option;
  }
};

const actions = {};

const mutations = {
  [SET_OPTION](state, option) {
    state.option = option;
  },
  [UPDATE_OPTION](state, { path, value }) {
    // 为什么不直接 _.set(state.option, path, value),
    // 对于没有初始化的属性，组件是响应其变化的。
    let option = Object.assign({}, state.option);
    _.set(option, path, value);
    state.option = option;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
