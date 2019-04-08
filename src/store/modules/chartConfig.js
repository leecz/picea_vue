import configs from "@/common/echart-config";

export default {
  state: {
    configs
  },
  getters: {
    currentConfig: (state, getters) => state.configs[getters.currentType],
    currentDataset: (_, getters) => `${getters.currentConfig.data_type}-data`
  }
};
