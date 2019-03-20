<template>
  <div class="flex flex-column">
    <div>
      主题效果
    </div>
    <div class="h3 pa1 flex items-center mb3">
      <el-select v-model="current" placeholder="请选择" @change="onChange">
        <el-option
          v-for="item in themes"
          :key="item"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <div class="ml3">
        <el-button type="primary" @click="onClick">设为默认主题</el-button>
      </div>
    </div>
    <div class="flex-auto  flex flex-wrap">
      <div id="chart1" class="pa1" style="width: 50%;height: 300px;"></div>
      <div id="chart2" class="pa1" style="width: 50%;height: 300px;"></div>
      <div id="chart3" class="pa1" style="width: 50%;height: 300px;"></div>
      <div id="chart4" class="pa1" style="width: 50%;height: 300px;"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import echarts from "echarts";
import { SET_THEME } from "@/store/mutations.type";
export default {
  data() {
    return {
      current: "macarons",
      chart1: undefined,
      chart2: undefined,
      chart4: undefined,
      chart3: undefined
    };
  },
  computed: {
    ...mapState({
      themes: state => state.theme.themes
    })
  },
  methods: {
    onChange() {
      this.dispose();
      this.init();
    },
    onClick() {
      this.$store.commit(SET_THEME, this.current);
    },
    init() {
      this.chart1 = echarts.init(
        document.getElementById("chart1"),
        this.current
      );
      this.chart1.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "拿铁", "奶茶", "六个核桃"],
            ["2015", 53.3, 65.8, 73.7],
            ["2016", 73.1, 73.4, 55.1],
            ["2017", 86.4, 65.2, 82.5],
            ["2018", 69.1, 63.9, 72.4]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "line" }, { type: "line" }, { type: "line" }]
      });
      this.chart2 = echarts.init(
        document.getElementById("chart2"),
        this.current
      );
      this.chart2.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "2015", "2016", "2017"],
            ["拿铁", 43.3, 85.8, 93.7],
            ["奶茶", 83.1, 73.4, 55.1],
            ["可可", 86.4, 65.2, 82.5],
            ["六个核桃", 72.4, 53.9, 39.1]
          ]
        },
        xAxis: { type: "category" },
        yAxis: {},
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }]
      });
      this.chart3 = echarts.init(
        document.getElementById("chart3"),
        this.current
      );
      this.chart3.setOption({
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "2015"],
            ["拿铁", 43.3],
            ["奶茶", 83.1],
            ["可可", 86.4],
            ["六个核桃", 72.4]
          ]
        },
        series: [{ type: "pie" }]
      });
      this.chart4 = echarts.init(
        document.getElementById("chart4"),
        this.current
      );
      this.chart4.setOption({
        legend: {},
        tooltip: {},
        dataset: [
          {
            source: [
              [43.3, 85.8, 93.7],
              [83.1, 73.4, 55.1],
              [86.4, 65.2, 82.5],
              [72.4, 53.9, 39.1],
              [46.4, 55.2, 32.5],
              [52.4, 53.9, 49.1]
            ]
          },
          {
            source: [
              [33.3, 65.8, 53.7],
              [43.1, 53.4, 75.1],
              [26.4, 45.2, 62.5],
              [42.4, 63.9, 69.1],
              [66.4, 45.2, 62.5],
              [82.4, 63.9, 59.1]
            ]
          }
        ],
        xAxis: {},
        yAxis: {},
        visualMap: {
          show: false,
          inRange: {
            symbolSize: [10, 120]
          }
        },
        series: [
          { type: "scatter", datasetIndex: 0 },
          { type: "scatter", datasetIndex: 1 }
        ]
      });
    },
    dispose() {
      this.chart1.dispose();
      this.chart2.dispose();
      this.chart3.dispose();
      this.chart4.dispose();
    }
  },
  mounted() {
    this.init();
  }
};
</script>
