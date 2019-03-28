<template>
  <div>
    图表模板
    <div class="flex flex-wrap ">
      <div
        v-for="(item, i) in templates"
        :key="i"
        class="tc ba b--light-gray pv1 ph3 ma3 temp-item"
        @click="onClick(item)"
      >
        <div :id="`chart-${i}`" class="w-100" style="height: 250px"></div>
        <div>
          {{ item.type_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_CHART } from "@/store/mutations.type";
import echarts from "echarts";
import { mapState } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      templates: []
    };
  },
  computed: {
    ...mapState({
      globalTheme: state => state.theme.current
    })
  },
  methods: {
    onClick(item) {
      item.theme = null;
      this.$store.commit(SET_CHART, item);
      this.$router.push({ name: "chart_edit" });
    },
    renderCharts() {
      this.templates.forEach((chart, i) => {
        let chartIns = echarts.init(
          document.getElementById(`chart-${i}`),
          this.globalTheme
        );
        let simpleOption = _.omit(chart.option, ["tooltip", "title", "legend"]);
        chartIns.setOption(simpleOption);
      });
    }
  },
  mounted() {
    this.templates = this.$store.state.template.charts;
    this.$nextTick(() => {
      this.renderCharts();
    });
  }
};
</script>

<style lang="scss">
.temp-icon {
  font-size: 12rem;
}
</style>
<style lang="scss" scoped>
.temp-item {
  cursor: pointer;
  width: 18rem;
}
</style>
