<template>
  <div class="flex">
    <div class="flex-auto flex flex-column">
      <div class="chart-wrap ba b--light-gray mr2 pa2 overflow-x-auto">
        <chart-head></chart-head>
        <component
          ref="chart"
          :is="chartName"
          :width="600"
          :height="600"
          :dataset="dataset"
          :option="option"
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
    <div class="edit-bar ba b--light-gray pa1">
      <div class="f4 mv2">编辑</div>
      <component :is="editCompo" @change="onOptionChange" />
    </div>
  </div>
</template>

<script>
import JsonData from "./components/JsonData";
import D3Data from "@/components/d3-chart/data";
import ChartHead from "./components/ChartHead";

import BubbleChartEdit from "./components/edit/BubbleChartEdit";
export default {
  components: {
    JsonData,
    BubbleChartEdit,
    ChartHead
  },
  data() {
    return {
      D3Data,
      chartName: "",
      dataset: undefined,
      option: undefined
    };
  },
  computed: {
    editCompo() {
      return this.chartName + "Edit";
    }
  },
  methods: {
    onDataChange(val) {
      this.dataset = val;
    },
    onOptionChange(val) {
      this.option = val;
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
  text-align: center;
}
.edit-bar {
  width: 352px;
}
</style>
