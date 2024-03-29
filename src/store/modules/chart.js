import {
  SET_OPTION,
  UPDATE_OPTION,
  SET_CHART_NAME,
  SET_CHART,
  SET_CHART_ID,
  SET_CHART_THEME,
  RESET_CHART_SERIES
} from "../mutations.type";
import _ from "lodash";
import { ChartService } from "@/common/api.service";
import {
  CREATE_CHART,
  UPDATE_CHART,
  SET_CHART_SERIES
} from "@/store/actions.type";
import { Message } from "element-ui";

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
        ["麦当劳", 23, 44, 88],
        ["肯德基", 23, 33, 66],
        ["汉堡王", 34, 33, 55],
        ["德克士", 65, 11, 55]
      ]
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
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
  currentType(state) {
    return state.type;
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
  },
  [SET_CHART_SERIES]({ commit, getters }) {
    commit(RESET_CHART_SERIES, getters.currentConfig);
  },
  updateRadarData({ state, commit }) {
    let data = state.option.dataset.source;
    if (!Array.isArray(data)) {
      Message.error("数据匹配失败！");
      return;
    }
    let max_val = _.max(data.map(el => el.value));
    let legend_data = _.uniq(_.map(data, "s"));
    let dims = _.uniq(_.map(data, "dim"));
    let indicator = dims.map(dim => ({
      name: dim,
      max: max_val
    }));
    let series_data = legend_data.map(s => {
      let value = dims.map(dim => {
        let item = _.find(data, { dim, s }) || {};
        return item.value || 0;
      });
      return {
        name: s,
        value
      };
    });
    commit(UPDATE_OPTION, {
      path: "legend.data",
      value: legend_data
    });
    commit(UPDATE_OPTION, {
      path: "radar.indicator",
      value: indicator
    });
    commit(UPDATE_OPTION, {
      path: "series.data",
      value: series_data
    });
  },
  updateSankeyData({ state, commit }, series_index = 0) {
    let data = state.option.dataset.source;
    if (!data.nodes || !data.links) {
      Message.error("数据匹配失败！");
      return;
    }
    commit(UPDATE_OPTION, {
      path: `series[${series_index}].data`,
      value: data.nodes
    });
    commit(UPDATE_OPTION, {
      path: `series[${series_index}].links`,
      value: data.links
    });
  },
  updateLiquidFillData({ state, commit }) {
    commit(UPDATE_OPTION, {
      path: "series.data",
      value: state.option.dataset.source
    });
  },
  updateGraphData({ state, commit }) {
    let { nodes, links, categories } = state.option.dataset.source;
    if (!nodes || !links || !categories) {
      Message.error("数据匹配失败！");
      return;
    }
    let ratio = 1.5;
    let filter_num = 10;
    commit(UPDATE_OPTION, {
      path: `series.data`,
      value: nodes.map(item => {
        return {
          ...item,
          itemStyle: {},
          symbolSize: item.value / ratio,
          label: {
            normal: {
              show: item.value > filter_num
            }
          }
        };
      })
    });
    commit(UPDATE_OPTION, {
      path: `series.links`,
      value: links
    });
    commit(UPDATE_OPTION, {
      path: `series.categories`,
      value: categories
    });
    commit(UPDATE_OPTION, {
      path: `legend.data`,
      value: categories.map(item => item.name)
    });
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
    state.option = JSON.parse(JSON.stringify(option));
  },
  [SET_CHART_NAME](state, name) {
    state.name = name;
  },
  [SET_CHART_THEME](state, theme) {
    state.theme = theme;
  },
  [SET_CHART_ID](state, id) {
    state.id = id;
  },
  [SET_CHART](state, { id, name, type, type_name, option, theme }) {
    state.name = name;
    state.id = id;
    state.type = type;
    state.type_name = type_name;
    state.option = option;
    state.theme = theme;
  },
  [RESET_CHART_SERIES](state, config) {
    if (config.fixed_column) {
      return;
    }
    // 默认数据的第一行为维度
    let dem = state.option.dataset.source[0];
    let demLen = dem.length - 1;
    let oldSeries = state.option.series;
    let serLen = oldSeries.length;
    if (demLen === serLen) {
      return;
    } else if (demLen < serLen) {
      _.times(serLen - demLen, state.option.series.pop());
    } else {
      _.times(demLen - serLen, state.option.series.push(oldSeries[0]));
    }
    state.option = Object.assign({}, state.option);
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
