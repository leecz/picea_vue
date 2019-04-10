<template>
  <edit-base>
    <template v-slot:edit-column>
      <el-tabs tab-position="top">
        <el-tab-pane label="图表">
          <title-config></title-config>
          <grid-config></grid-config>
          <tooltip-config></tooltip-config>
        </el-tab-pane>
        <el-tab-pane label="图例">
          <legend-config></legend-config>
        </el-tab-pane>
        <el-tab-pane label="系列">
          <color-config></color-config>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template v-slot:data-column>
      <el-button @click="updateChartData" type="success" size="small"
        >更新图表数据</el-button
      >
    </template>
  </edit-base>
</template>
<script>
import EditBase from "./components/EditBase";
import GridConfig from "./components/GridConfig";
import TitleConfig from "./components/TitleConfig";
import LegendConfig from "./components/LegendConfig";
import TooltipConfig from "./components/TooltipConfig";
import ColorConfig from "./components/ColorConfig";
export default {
  components: {
    EditBase,
    GridConfig,
    TitleConfig,
    LegendConfig,
    TooltipConfig,
    ColorConfig
  },
  methods: {
    updateChartData() {
      this.$store.dispatch("updateGraphData");
    }
  }
};
</script>
