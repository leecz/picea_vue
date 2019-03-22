import {
  SET_OPTION,
  UPDATE_OPTION,
  SET_CHART_ID,
  SET_CHART_NAME,
  SET_BASIC
} from "../mutations.type";
import _ from "lodash";
import { ChartService } from "@/common/api.service";
import { CREATE_CHART } from "@/store/actions.type";

const state = {
  id: null,
  name: "",
  type: "line",
  typeName: "折线图",
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
  },
  dataset(state) {
    return state.option.dataset;
  },
  isEdit(state) {
    return !!state.id;
  }
};

const actions = {
  async [CREATE_CHART]({ state, commit, rootState }) {
    let res = await ChartService.create({
      chart: {
        name: state.name,
        type: state.type,
        type_name: state.typeName,
        theme: rootState.theme.current,
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
  [SET_BASIC](state, chart) {
    state.type = chart.type;
    state.typeName = chart.name;
  },
  [SET_CHART_ID](state, { id }) {
    state.id = id;
  },
  [SET_CHART_NAME](state, name) {
    state.name = name;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
