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
        <el-tab-pane label="X轴">
          <xaxis-config></xaxis-config>
        </el-tab-pane>
        <el-tab-pane label="Y轴">
          <yaxis-config></yaxis-config>
        </el-tab-pane>
        <el-tab-pane label="系列">
          <el-select
            v-model="seriesIndex"
            placeholder="请选择数据列"
            size="small"
            style="width: 100%;"
          >
            <el-option
              v-for="(item, i) in series"
              :key="i"
              :label="`系列 - ${i + 1}`"
              :value="i"
            >
            </el-option>
          </el-select>
          <mixed-config
            :seriesIndex="seriesIndex"
            :key="seriesIndex"
          ></mixed-config>
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
import XaxisConfig from "./components/XaxisConfig";
import YaxisConfig from "./components/YaxisConfig";
import TooltipConfig from "./components/TooltipConfig";
import ColorConfig from "./components/ColorConfig";
import editMixin from "./mixins/editMixin";
import MixedConfig from "./components/series/MixedConfig";
export default {
  components: {
    EditBase,
    GridConfig,
    TitleConfig,
    LegendConfig,
    XaxisConfig,
    YaxisConfig,
    TooltipConfig,
    ColorConfig,
    MixedConfig
  },
  mixins: [editMixin]
};
</script>
