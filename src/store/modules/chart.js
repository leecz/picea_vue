import {
  SET_OPTION,
  UPDATE_OPTION,
  SET_CHART_NAME,
  SET_CHART,
  SET_CHART_ID,
  SET_CHART_THEME
} from "../mutations.type";
import _ from "lodash";
import { ChartService } from "@/common/api.service";
import { CREATE_CHART, UPDATE_CHART } from "@/store/actions.type";

const state = {
  id: null,
  name: "",
  type: "line",
  type_name: "折线图",
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
  },
  theme: undefined
};

const getters = {
  currentOption(state) {
    return state.option;
  },
  dataset(state) {
    return state.option.dataset;
  },
  isEdit(state) {
    return !!state.id;
  }
};

const actions = {
  async [UPDATE_CHART]({ state }) {
    let res = await ChartService.update(state.id, {
      chart: {
        id: state.id,
        name: state.name,
        type: state.type,
        type_name: state.type_name,
        theme: state.theme,
        option: state.option
      }
    });
    return res;
  },
  async [CREATE_CHART]({ state, commit }) {
    let res = await ChartService.create({
      chart: {
        name: state.name,
        type: state.type,
        type_name: state.type_name,
        theme: state.theme,
        option: state.option
      }
    });
    commit(SET_CHART_ID, res.data.data);
    return res;
  }
};

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
  },
  [SET_CHART_NAME](state, name) {
    state.name = name;
  },
  [SET_CHART_THEME](state, theme) {
    state.theme = theme;
  },
  [SET_CHART](state, { id, name, type, type_name, option }) {
    state.name = name;
    state.id = id;
    state.type = type;
    state.type_name = type_name;
    state.option = option;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
