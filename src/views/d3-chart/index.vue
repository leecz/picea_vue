<template>
  <div>
    <div class="f3">d3 图表</div>
    <div class="f6 mt3">图表编辑功能正在完善中...</div>
    <div class="flex flex-wrap chart-items">
      <div
        v-for="(chart, name, i) in D3Chart"
        :key="i"
        @click.stop="onClick(name)"
      >
        <component
          :is="chart"
          :width="250"
          :height="250"
          :option="option"
          :dataset="D3Data[name]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import D3Chart from "@/components/d3-chart";
import D3Data from "@/components/d3-chart/data";
export default {
  data() {
    return {
      D3Chart,
      D3Data,
      option: {
        thumb: true
      }
    };
  },
  methods: {
    onClick(chart) {
      this.$router.push({ name: "d3_chart_edit", params: { name: chart } });
    }
  }
};
</script>

<style lang="scss">
.chart-items {
  div {
    padding: 20px;
  }
}
</style>
