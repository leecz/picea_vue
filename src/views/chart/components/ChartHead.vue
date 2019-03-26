<template>
  <div class="flex justify-between bb items-center b--light-gray chart-head h3">
    <el-form inline size="small">
      <el-form-item label="图表名称">
        <el-input
          v-model="name"
          @change="onNameChange"
          placeholder="输入图表名称"
        ></el-input>
      </el-form-item>
    </el-form>

    <div class="mr3">
      <el-button type="primary" @click="onSubmit" size="small" round>
        保存
      </el-button>
    </div>
  </div>
</template>
<script>
import { CREATE_CHART, UPDATE_CHART } from "@/store/actions.type";
import { SET_CHART_NAME } from "@/store/mutations.type";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "test"
    };
  },
  computed: {
    ...mapGetters(["isEdit"])
  },
  methods: {
    onNameChange() {
      this.$store.commit(SET_CHART_NAME, this.name);
    },
    onSubmit() {
      let mutation = this.isEdit ? UPDATE_CHART : CREATE_CHART;
      this.$store
        .dispatch(mutation)
        .then(() => {
          this.$message("保存成功");
        })
        .catch(e => {
          this.$message(e);
        });
    }
  },
  mounted() {
    this.name = this.$store.state.chart.name;
  }
};
</script>

<style>
.chart-head .el-form-item--small.el-form-item {
  margin-bottom: 0;
}
</style>
