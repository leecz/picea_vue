<template>
  <div class="flex chart-edit">
    <div class="flex-auto flex flex-column">
      <div class="chart-wrap ba b--light-gray mr2 pa2 overflow-x-auto">
        图表编辑
        <chart-head></chart-head>
        <div id="chart" class="w-100" style="min-height: 480px;"></div>
      </div>
      <div class="ba b--light-gray mr2 mt2 pa2">
        数据
        <data-set></data-set>
      </div>
    </div>
    <div class="edit-bar ba b--light-gray pa1">
      <el-tabs tab-position="top">
        <el-tab-pane label="图表">
          <title-config></title-config>
          <grid-config></grid-config>
          <tooltip-config></tooltip-config>
        </el-tab-pane>
        <el-tab-pane label="图例">
          <legend-config></legend-config>
        </el-tab-pane>
        <el-tab-pane label="X轴" v-if="currentConfig.orthogonal_coordinates">
          <xaxis-config></xaxis-config>
        </el-tab-pane>
        <el-tab-pane label="Y轴" v-if="currentConfig.orthogonal_coordinates">
          <yaxis-config></yaxis-config>
        </el-tab-pane>
        <el-tab-pane label="系列">
          <color-config></color-config>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Echarts from "echarts";
import GridConfig from "./components/GridConfig";
import TitleConfig from "./components/TitleConfig";
import LegendConfig from "./components/LegendConfig";
import XaxisConfig from "./components/XaxisConfig";
import YaxisConfig from "./components/YaxisConfig";
import { mapState, mapGetters } from "vuex";
import TooltipConfig from "./components/TooltipConfig";
import DataSet from "./components/DataSet";
import ChartHead from "./components/ChartHead";
import { SET_CHART_THEME } from "@/store/mutations.type";
import ColorConfig from "./components/ColorConfig";
export default {
  name: "chart-edit",
  components: {
    GridConfig,
    TitleConfig,
    LegendConfig,
    XaxisConfig,
    YaxisConfig,
    TooltipConfig,
    DataSet,
    ChartHead,
    ColorConfig
  },
  data() {
    return {
      chart: undefined
    };
  },
  computed: {
    ...mapGetters(["currentConfig", "isEdit"]),
    ...mapState({
      option: state => state.chart.option,
      dataset: state => state.chart.option.dataset,
      theme: state => state.chart.theme,
      type: state => state.chart.type,
      globalTheme: state => state.theme.current
    })
  },
  watch: {
    option: {
      deep: true,
      handler: function() {
        this.setOption();
      }
    }
  },
  methods: {
    init() {
      let theme = this.isEdit ? this.theme : this.globalTheme;
      this.chart = Echarts.init(document.getElementById("chart"), theme);
    },
    setOption() {
      this.chart.setOption(this.option, true);
    }
  },
  created() {
    if (!this.theme) {
      this.$store.commit(SET_CHART_THEME, this.globalTheme);
    }
  },
  mounted() {
    this.init();
    this.setOption();
  }
};
</script>

<style lang="scss" scoped>
.chart-edit {
  min-height: calc(100vh - 100px);
}
.chart-wrap {
  min-height: 500px;
}
.edit-bar {
  width: 22rem;
}
</style>
