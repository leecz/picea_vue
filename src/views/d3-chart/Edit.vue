<template>
  <div class="flex">
    <div class="flex-auto flex flex-column">
      <div class="chart-wrap ba b--light-gray mr2 pa2 overflow-x-auto">
        <chart-head :title="title" @save="handleSave"></chart-head>
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
      <component
        ref="editbar"
        :options="option"
        :is="editCompo"
        @change="onOptionChange"
      />
    </div>
  </div>
</template>

<script>
import JsonData from "./components/JsonData";
import D3Data from "@/components/d3-chart/data";
import ChartHead from "./components/ChartHead";

import BubbleChartEdit from "./components/edit/BubbleChartEdit";
import PackFlatChartEdit from "./components/edit/PackFlatChartEdit";
import WordCloudEdit from "./components/edit/WordCloudEdit";
import ForceDirectedChartEdit from "./components/edit/ForceDirectedChartEdit";
import CollapsibleForceChartEdit from "./components/edit/CollapsibleForceChartEdit";
import { DchartsService } from "@/common/api.service";
export default {
  name: "d3-edit",
  components: {
    JsonData,
    BubbleChartEdit,
    PackFlatChartEdit,
    WordCloudEdit,
    ForceDirectedChartEdit,
    CollapsibleForceChartEdit,
    ChartHead
  },
  data() {
    return {
      D3Data,
      chartName: "",
      dataset: undefined,
      option: undefined,
      title: "",
      id: null
    };
  },
  computed: {
    editCompo() {
      return this.chartName + "Edit";
    },
    isEdit() {
      return !!this.id;
    }
  },
  methods: {
    createCharts(params) {
      DchartsService.create(params).then(res => {
        this.$message("保存成功");
        this.id = res.data.data.id;
      });
    },
    updateCharts(params) {
      DchartsService.update(this.id, params).then(() => {
        this.$message("修改成功");
      });
    },
    handleSave(val) {
      let dom = this.$refs.chart.$el;
      let thumbDom = dom.cloneNode(true);
      let str = new XMLSerializer().serializeToString(thumbDom);
      let encodeData = "data:image/svg+xml;base64," + window.btoa(str);
      let params = {
        dchart: {
          data: { dataset: this.dataset },
          name: val.name,
          option: this.option,
          type: this.chartName,
          thumb: encodeData
        }
      };
      if (this.isEdit) {
        this.updateCharts(params);
      } else {
        this.createCharts(params);
      }
    },
    onDataChange(val) {
      this.dataset = val;
    },
    onOptionChange(val) {
      this.option = val;
    },
    fetchDchart(id) {
      DchartsService.show(id).then(res => {
        let data = res.data.data;
        this.id = data.id;
        this.dataset = data.data.dataset;
        this.option = data.option;
        this.chartName = data.type;
        this.title = data.name;
      });
    }
  },
  created() {
    let { id, name } = this.$route.params;
    this.chartName = name;
    if (id) {
      this.fetchDchart(id);
    }
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
