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
      <!-- <el-button
        v-if="isEdit"
        type="success"
        @click="onShow"
        size="small"
        round
      >
        导出
      </el-button> -->
    </div>
  </div>
</template>
<script>
import { CREATE_CHART, UPDATE_CHART } from "@/store/actions.type";
import { SET_CHART_NAME } from "@/store/mutations.type";
import { mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      name: this.title
    };
  },
  watch: {
    title: {
      handler() {
        this.name = this.title;
      }
    }
  },
  computed: {
    // ...mapGetters(["isEdit"])
  },
  methods: {
    onNameChange() {
      this.$store.commit(SET_CHART_NAME, this.name);
    },
    onSubmit() {
      this.$emit("save", { name: this.name });
    },
    onShow() {
      this.$router.push({ name: "chart_show" });
    }
  },
  mounted() {
    // this.name = this.$store.state.chart.name;
  }
};
</script>

<style>
.chart-head .el-form-item--small.el-form-item {
  margin-bottom: 0;
}
</style>
