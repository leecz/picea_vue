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
  }
};
</script>
