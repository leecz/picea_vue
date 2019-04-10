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
        <slot name="data-column"></slot>
        <data-set></data-set>
      </div>
    </div>
    <div class="edit-bar ba b--light-gray pa1">
      <slot name="edit-column"></slot>
    </div>
  </div>
</template>

<script>
import Echarts from "echarts";
import { mapState, mapGetters } from "vuex";
import DataSet from "./DataSet";
import ChartHead from "./ChartHead";
import { SET_CHART_THEME } from "@/store/mutations.type";
export default {
  name: "chart-edit",
  components: {
    DataSet,
    ChartHead
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
