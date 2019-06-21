<template>
  <div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="颜色">
        <d3-colors v-model="option.colors"></d3-colors>
      </el-form-item>
      <el-form-item label="自定义">
        <custom-colors v-model="option.colors"></custom-colors>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _ from "lodash";
import D3Colors from "../D3Colors";
import * as d3 from "d3";
import CustomColors from "../CustomColors";
export default {
  components: {
    D3Colors,
    CustomColors
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      option: {
        colors: d3.schemeCategory10
      }
    };
  },
  watch: {
    options: {
      handler() {
        this.option = _.merge(this.option, this.options);
      }
    },
    option: {
      deep: true,
      handler() {
        this.$emit("change", this.option);
      }
    }
  }
};
</script>
