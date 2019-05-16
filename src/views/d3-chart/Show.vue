<template>
  <div>
    <div class="chart-wrap ba b--light-gray mr2 pa2 overflow-x-auto">
      <component
        ref="chart"
        :is="chartName"
        :width="600"
        :height="400"
        :dataset="dataset"
      ></component>
    </div>
    <div class="mt3 mr2">
      <json-data
        ref="dataEditor"
        :dataset="dataset"
        @change="onDataChange"
      ></json-data>
    </div>
  </div>
</template>

<script>
import JsonData from "./components/JsonData";
import D3Data from "@/components/d3-chart/data";
export default {
  components: {
    JsonData
  },
  data() {
    return {
      D3Data,
      chartName: "",
      dataset: undefined
    };
  },
  methods: {
    onDataChange(val) {
      this.dataset = val;
    }
  },
  created() {
    this.chartName = this.$route.params.name;
  },
  mounted() {
    this.dataset = D3Data[this.chartName];
    this.$refs.dataEditor.initData(this.dataset);
  }
};
</script>

<style lang="scss" scoped>
.chart-wrap {
  min-height: 500px;
}
</style>
