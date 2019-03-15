<template>
  <div>
    <div class="f4 mt3 mb2">图例</div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="是否显示">
        <el-switch v-model="legend.show" @change="showChange"></el-switch>
      </el-form-item>
      <el-form-item label="排列方式">
        <el-radio-group v-model="legend.orient" @change="orientChange">
          <el-radio label="horizontal">水平</el-radio>
          <el-radio label="vertical">垂直</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="水平位置">
        <percent-slider
          :percent="legend.left"
          @change="leftChange"
        ></percent-slider>
      </el-form-item>
      <el-form-item label="垂直位置">
        <percent-slider
          :percent="legend.top"
          @change="topChange"
        ></percent-slider>
      </el-form-item>
      <el-form-item label="字体">
        <font path="legend.textStyle"></font>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { UPDATE_OPTION } from "@/store/mutations.type";
import Font from "./Font.vue";
export default {
  name: "legend-config",
  components: {
    Font
  },
  data() {
    return {
      legend: {
        show: true,
        orient: "horizontal",
        left: "50%",
        top: "2%"
      }
    };
  },
  methods: {
    showChange(val) {
      this.$store.commit(UPDATE_OPTION, {
        path: "legend.show",
        value: val
      });
    },
    orientChange(val) {
      this.$store.commit(UPDATE_OPTION, {
        path: "legend.orient",
        value: val
      });
    },
    leftChange(val) {
      this.$store.commit(UPDATE_OPTION, {
        path: "legend.left",
        value: val
      });
    },
    topChange(val) {
      this.$store.commit(UPDATE_OPTION, {
        path: "legend.top",
        value: val
      });
    }
  },
  created() {
    this.legend = Object.assign(
      this.legend,
      this.$store.state.chart.option.legend
    );
  }
};
</script>
