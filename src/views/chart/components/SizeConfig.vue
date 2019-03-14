<template>
  <div>
    <div class="f4 mb2">尺寸</div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="宽度">
        <vue-slider
          v-model="options.width"
          :min="200"
          :max="1200"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="高度">
        <vue-slider
          v-model="options.height"
          :min="200"
          :max="1000"
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
        width: 800,
        height: 480
      }
    };
  },
  watch: {
    options: {
      deep: true,
      handler: function() {}
    }
  }
};
</script>
