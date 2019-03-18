<template>
  <div>
    <div class="f4 mt3 mb2">Y轴</div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="是否显示">
        <el-switch v-model="yAxis.show" @change="showChange"></el-switch>
      </el-form-item>
      <el-form-item label="轴位置">
        <el-radio-group v-model="yAxis.position" @change="positionChange">
          <el-radio label="left">左边</el-radio>
          <el-radio label="right">右边</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称">
        <el-input
          type="text"
          v-model="yAxis.name"
          @change="nameChange"
        ></el-input>
      </el-form-item>
      <el-form-item label="名称位置">
        <el-radio-group
          v-model="yAxis.nameLocation"
          @change="nameLocationChange"
          class="yAxis-icon-size"
        >
          <el-radio-button label="end">
            <svg-icon name="icon-align-top"></svg-icon>
          </el-radio-button>
          <el-radio-button label="center">
            <svg-icon name="icon-align-middle"></svg-icon>
          </el-radio-button>
          <el-radio-button label="start">
            <svg-icon name="icon-align-bottom"></svg-icon>
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称样式">
        <font path="yAxis.nameTextStyle"></font>
      </el-form-item>

      <el-form-item label="显示轴线">
        <el-switch
          v-model="yAxis.axisLine.show"
          @change="axisLineShowChange"
        ></el-switch>
      </el-form-item>
      <el-form-item label="轴线颜色">
        <el-color-picker
          v-model="yAxis.axisLine.lineStyle.color"
          @change="axisLineColorChange"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="显示刻度">
        <el-switch
          v-model="yAxis.axisTick.show"
          @change="axisTickShowChange"
        ></el-switch>
      </el-form-item>
      <el-form-item label="显示标签">
        <el-switch
          v-model="yAxis.axisLabel.show"
          @change="axisLabelShowChange"
        ></el-switch>
      </el-form-item>
      <el-form-item label="旋转标签">
        <vue-slider
          v-model="yAxis.axisLabel.rotate"
          :min="-90"
          :max="90"
          @change="axisLabelRotateChange"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="分割线">
        <el-switch
          v-model="yAxis.splitLine.show"
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
  name: "yAxis-config",
  components: {
    Font
  },
  data() {
    return {
      yAxis: {
        show: true,
        position: "left",
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
      this.commitChange("yAxis.show", val);
    },
    nameChange(val) {
      this.commitChange("yAxis.name", val);
    },
    positionChange(val) {
      this.commitChange("yAxis.position", val);
    },
    nameLocationChange(val) {
      this.commitChange("yAxis.nameLocation", val);
    },
    axisLineShowChange(val) {
      this.commitChange("yAxis.axisLine.show", val);
    },
    axisLineColorChange(val) {
      this.commitChange("yAxis.axisLine.lineStyle.color", val);
    },
    axisTickShowChange(val) {
      this.commitChange("yAxis.axisTick.show", val);
    },
    axisLabelShowChange(val) {
      this.commitChange("yAxis.axisLabel.show", val);
    },
    axisLabelRotateChange(val) {
      this.commitChange("yAxis.axisLabel.rotate", val);
    },
    splitLineShowChange(val) {
      this.commitChange("yAxis.splitLine.show", val);
    },
    commitChange(path, value) {
      this.$store.commit(UPDATE_OPTION, { path, value });
    }
  },
  created() {
    this.yAxis = Object.assign(
      this.yAxis,
      this.$store.state.chart.option.yAxis
    );
  }
};
</script>

<style lang="scss">
.yAxis-icon-size .el-radio-button--mini .el-radio-button__inner {
  font-size: 1rem;
  padding: 5px 13px;
}
</style>
