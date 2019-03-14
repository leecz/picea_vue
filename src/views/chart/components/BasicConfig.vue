<template>
  <div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="图表宽度">
        <el-input type="text" v-model="options.width"></el-input>
      </el-form-item>
      <el-form-item label="图表高度">
        <el-input type="text" v-model="options.height"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "basic-config",
  data() {
    return {
      options: {
        width: 500,
        height: 400
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
