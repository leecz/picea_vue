<template>
  <div>
    <div class="f4 mt3 mb2">X轴</div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="是否显示">
        <el-switch v-model="xAxis.show" @change="showChange"></el-switch>
      </el-form-item>
      <el-form-item label="轴位置">
        <el-radio-group v-model="xAxis.position" @change="positionChange">
          <el-radio label="bottom">底部</el-radio>
          <el-radio label="top">顶部</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称">
        <el-input
          type="text"
          v-model="xAxis.name"
          @change="nameChange"
        ></el-input>
      </el-form-item>
      <el-form-item label="名称位置">
        <el-radio-group
          v-model="xAxis.nameLocation"
          @change="nameLocationChange"
          class="xaxis-icon-size"
        >
          <el-radio-button label="start">
            <svg-icon name="icon-align-left"></svg-icon>
          </el-radio-button>
          <el-radio-button label="center">
            <svg-icon name="icon-align-center"></svg-icon>
          </el-radio-button>
          <el-radio-button label="end">
            <svg-icon name="icon-align-right"></svg-icon>
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称样式">
        <font path="xAxis.nameTextStyle"></font>
      </el-form-item>

      <el-form-item label="显示轴线">
        <el-switch
          v-model="xAxis.axisLine.show"
          @change="axisLineShowChange"
        ></el-switch>
      </el-form-item>
      <el-form-item label="轴线颜色">
        <el-color-picker
          v-model="xAxis.axisLine.lineStyle.color"
          @change="axisLineColorChange"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="显示刻度">
        <el-switch
          v-model="xAxis.axisTick.show"
          @change="axisTickShowChange"
        ></el-switch>
      </el-form-item>
      <el-form-item label="显示标签">
        <el-switch
          v-model="xAxis.axisLabel.show"
          @change="axisLabelShowChange"
        ></el-switch>
      </el-form-item>
      <el-form-item label="旋转标签">
        <vue-slider
          v-model="xAxis.axisLabel.rotate"
          :min="-90"
          :max="90"
          @change="axisLabelRotateChange"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="分割线">
        <el-switch
          v-model="xAxis.splitLine.show"
          @change="splitLineShowChange"
        ></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { UPDATE_OPTION } from "@/store/mutations.type";
import Font from "./Font.vue";
export default {
  name: "xAxis-config",
  components: {
    Font
  },
  data() {
    return {
      xAxis: {
        show: true,
        position: "bottom",
        name: "",
        nameLocation: "end",
        axisLine: {
          show: true,
          lineStyle: {
            color: "#333"
          }
        },
        axisTick: {
          show: true
        },
        axisLabel: {
          show: true,
          rotate: 0
        },
        splitLine: {
          show: false
        }
      }
    };
  },
  methods: {
    showChange(val) {
      this.commitChange("xAxis.show", val);
    },
    nameChange(val) {
      this.commitChange("xAxis.name", val);
    },
    positionChange(val) {
      this.commitChange("xAxis.position", val);
    },
    nameLocationChange(val) {
      this.commitChange("xAxis.nameLocation", val);
    },
    axisLineShowChange(val) {
      this.commitChange("xAxis.axisLine.show", val);
    },
    axisLineColorChange(val) {
      this.commitChange("xAxis.axisLine.lineStyle.color", val);
    },
    axisTickShowChange(val) {
      this.commitChange("xAxis.axisTick.show", val);
    },
    axisLabelShowChange(val) {
      this.commitChange("xAxis.axisLabel.show", val);
    },
    axisLabelRotateChange(val) {
      this.commitChange("xAxis.axisLabel.rotate", val);
    },
    splitLineShowChange(val) {
      this.commitChange("xAxis.splitLine.show", val);
    },
    commitChange(path, value) {
      this.$store.commit(UPDATE_OPTION, { path, value });
    }
  },
  created() {
    this.xAxis = Object.assign(
      this.xAxis,
      this.$store.state.chart.option.xAxis
    );
  }
};
</script>

<style lang="scss">
.xaxis-icon-size .el-radio-button--mini .el-radio-button__inner {
  font-size: 1rem;
  padding: 5px 13px;
}
</style>
