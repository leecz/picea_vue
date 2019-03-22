<template>
  <div class="flex">
    <el-form inline>
      <el-form-item label="图表名称">
        <el-input
          v-model="name"
          @change="onNameChange"
          placeholder=""
        ></el-input>
      </el-form-item>
      <el-button @click="onSubmit" type="primary">保存</el-button>
    </el-form>
  </div>
</template>
<script>
import { CREATE_CHART } from "@/store/actions.type";
import { SET_CHART_NAME } from "@/store/mutations.type";
export default {
  data() {
    return {
      name: "test"
    };
  },
  methods: {
    onNameChange() {
      this.$store.commit(SET_CHART_NAME, this.name);
    },
    onSubmit() {
      this.$store
        .dispatch(CREATE_CHART)
        .then(() => {
          this.$message("创建成功");
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
