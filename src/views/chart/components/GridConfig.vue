<template>
  <div>
    <div class="f4 mt4 mb2">边距</div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="左边距">
        <vue-slider
          v-model="options.grid.left"
          :min="0"
          :max="100"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="右边距">
        <vue-slider
          v-model="options.grid.right"
          :min="0"
          :max="100"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="上边距">
        <vue-slider
          v-model="options.grid.top"
          :min="0"
          :max="100"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="下边距">
        <vue-slider
          v-model="options.grid.bottom"
          :min="0"
          :max="100"
          use-keyboard
        ></vue-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "size-config",
  data() {
    return {
      options: {
        grid: {
          left: 80,
          top: 60,
          right: 80,
          bottom: 60
        }
      }
    };
  },
  watch: {
    options: {
      deep: true,
      handler: function() {
        this.$emit("afterChange", this.options);
      }
    }
  }
};
</script>
