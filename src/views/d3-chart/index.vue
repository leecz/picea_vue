<template>
  <div>
    <div class="f3">d3 图表</div>
    <div class="f6 mt3">图表编辑功能正在完善中...</div>
    <div class="flex flex-wrap chart-items">
      <div>
        <bubble-chart :width="250" :height="250"></bubble-chart>
      </div>
      <!-- <div>
        <bubble-ring-chart :width="250" :height="250"></bubble-ring-chart>
      </div> -->
      <div>
        <pack-flat-chart
          :width="250"
          :height="250"
          :option="option"
        ></pack-flat-chart>
      </div>
      <div>
        <force-directed-chart :width="250" :height="250"></force-directed-chart>
      </div>
      <div>
        <collapsible-force-chart
          :width="200"
          :height="200"
        ></collapsible-force-chart>
      </div>
      <div>
        <word-cloud :width="250" :height="250"></word-cloud>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BubbleChart,
  PackFlatChart,
  WordCloud,
  ForceDirectedChart,
  CollapsibleForceChart
  // BubbleRingChart
} from "@/components/d3-chart";
export default {
  components: {
    BubbleChart,
    PackFlatChart,
    WordCloud,
    ForceDirectedChart,
    CollapsibleForceChart
    // BubbleRingChart
  },
  data() {
    return {
      option: {
        thumb: true
      }
    };
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
