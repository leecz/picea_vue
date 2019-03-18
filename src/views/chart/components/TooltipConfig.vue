<template>
  <div>
    <div class="f4 mt3 mb2">提示框</div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="是否显示">
        <el-switch v-model="tooltip.show" @change="showChange"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { UPDATE_OPTION } from "@/store/mutations.type";
export default {
  name: "tooltip-config",
  data() {
    return {
      tooltip: {
        show: false
      }
    };
  },
  methods: {
    showChange(val) {
      this.commitChange("tooltip.show", val);
    },
    commitChange(path, value) {
      this.$store.commit(UPDATE_OPTION, { path, value });
    }
  },
  created() {
    this.tooltip = Object.assign(
      this.tooltip,
      this.$store.state.chart.option.tooltip
    );
  }
};
</script>
