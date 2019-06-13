<template>
  <div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="标签阈值">
        <el-input type="number" v-model.number="option.labelValue"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      option: {
        minRadius: 1,
        maxRadius: 20,
        labelValue: 10,
        forceProps: {
          collide: {
            enabled: true,
            strength: 0.7,
            iterations: 1,
            radius: 1
          }
        }
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
