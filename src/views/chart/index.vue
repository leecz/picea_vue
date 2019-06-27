<template>
  <div>
    <div>我的图表</div>
    <div class="gray f6 bl bw2 mv3 pl2">
      Echarts 图表
    </div>
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
    <div class="gray f6 bl bw2 mv3 pl2">
      d3 图表
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(item, i) in dcharts"
        :key="i"
        class="ba pa1 ma2 b--light-gray"
      >
        <img :src="item.thumb" width="250" height="250" alt="" />
        <div class="flex justify-around items-center">
          <div>
            {{ item.name }}
          </div>
          <div>
            <el-button size="mini" @click="handleDchartEdit(item)"
              >编辑</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChartsService, DchartsService } from "@/common/api.service";
import echarts from "echarts";
import _ from "lodash";
import { SET_CHART } from "@/store/mutations.type";

export default {
  name: "chart-index",
  data() {
    return {
      dataset: [],
      dcharts: []
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
    handleDchartEdit(item) {
      this.$router.push({
        name: "d3_chart_edit",
        params: {
          id: item.id,
          name: item.type
        }
      });
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
    },
    getDchartsList() {
      DchartsService.list().then(res => {
        this.dcharts = res.data.data;
      });
    }
  },
  mounted() {
    this.getList();
    this.getDchartsList();
  }
};
</script>
