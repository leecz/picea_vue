<template>
  <div>
    <div>我的图表</div>
    <div class="flex flex-wrap">
      <div
        :key="item.id"
        v-for="item in dataset"
        class="w-25 ba pa1 ma2 b--light-gray"
      >
        <div :id="`chart-${item.id}`" class="w-100" style="height: 250px"></div>
        <div class="flex justify-around">
          <el-button size="mini" @click="onShowClick(item)">预览</el-button>
          <el-button size="mini" @click="onEditClick(item)">编辑</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChartsService } from "@/common/api.service";
import echarts from "echarts";
import _ from "lodash";
import { SET_CHART } from "@/store/mutations.type";

export default {
  name: "chart-index",
  data() {
    return {
      dataset: []
    };
  },
  methods: {
    onEditClick(chart) {
      this.$store.commit(SET_CHART, { ...chart });
      this.$router.push({ name: "chart_edit" });
    },
    onShowClick(chart) {
      this.$store.commit(SET_CHART, { ...chart });
      this.$router.push({ name: "chart_show" });
    },
    renderChart() {
      this.dataset.forEach(chart => {
        let chartIns = echarts.init(
          document.getElementById(`chart-${chart.id}`),
          chart.theme
        );
        let simpleOption = _.omit(chart.option, ["tooltip", "title"]);
        chartIns.setOption(simpleOption);
      });
    },
    getList() {
      ChartsService.list().then(res => {
        this.dataset = res.data.data;
        this.$nextTick(() => {
          this.renderChart();
        });
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
