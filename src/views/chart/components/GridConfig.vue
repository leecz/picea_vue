<template>
  <div>
    <div class="f4 mt4 mb2">边距</div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="左边距">
        <vue-slider
          v-model="grid.left"
          :min="0"
          :max="100"
          @change="leftChange"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="右边距">
        <vue-slider
          v-model="grid.right"
          :min="0"
          :max="100"
          @change="rightChange"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="上边距">
        <vue-slider
          v-model="grid.top"
          :min="0"
          :max="100"
          @change="topChange"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="下边距">
        <vue-slider
          v-model="grid.bottom"
          :min="0"
          :max="100"
          @change="bottomChange"
          use-keyboard
        ></vue-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { UPDATE_OPTION } from "@/store/mutations.type";
export default {
  name: "grid-config",
  data() {
    return {
      grid: {
        left: 80,
        top: 60,
        right: 80,
        bottom: 60
      }
    };
  },
  methods: {
    leftChange(val) {
      this.$store.commit(UPDATE_OPTION, {
        path: "grid.left",
        value: val
      });
    },
    rightChange(val) {
      this.$store.commit(UPDATE_OPTION, {
        path: "grid.right",
        value: val
      });
    },
    topChange(val) {
      this.$store.commit(UPDATE_OPTION, {
        path: "grid.top",
        value: val
      });
    },
    bottomChange(val) {
      this.$store.commit(UPDATE_OPTION, {
        path: "grid.bottom",
        value: val
      });
    }
  },
  created() {
    this.grid = Object.assign(this.grid, this.$store.state.chart.option.grid);
  }
};
</script>
