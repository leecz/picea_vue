<template>
  <div class="flex chart-edit">
    <div class="flex-auto flex flex-column">
      <div class="chart-wrap ba b--light-gray mr2 pa2 overflow-x-auto">
        图表
        <div
          id="chart"
          :style="{ height: `${form.height}px`, width: `${form.width}px` }"
        ></div>
      </div>
      <div class="mt3">
        导出图片

        <el-form inline>
          <el-form-item label="像素比">
            <el-select v-model="form.pixelRatio" placeholder="请选择">
              <el-option
                v-for="item in pixelRatios"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="宽度">
            <el-input
              v-model="form.width"
              type="number"
              @change="resetChartSize"
            ></el-input>
          </el-form-item>
          <el-form-item label="高度">
            <el-input
              v-model="form.height"
              type="number"
              @change="resetChartSize"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="exportPNG">导出PNG图片</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from "echarts";
import "echarts-liquidfill";
import { mapState, mapGetters } from "vuex";

export default {
  name: "chart-edit",

  data() {
    return {
      chart: undefined,
      pixelRatios: [1, 2, 3],
      form: {
        pixelRatio: 1,
        height: 480,
        width: 800
      },
      imgSrc: undefined
    };
  },
  computed: {
    ...mapGetters(["currentConfig", "isEdit"]),
    ...mapState({
      option: state => state.chart.option,
      theme: state => state.chart.theme,
      type: state => state.chart.type,
      name: state => state.chart.name
    })
  },
  watch: {
    option: {
      deep: true,
      handler: function() {
        this.setOption();
      }
    }
  },
  methods: {
    init() {
      this.chart = Echarts.init(document.getElementById("chart"), this.theme);
    },
    setOption() {
      this.chart.setOption(this.option, true);
    },
    resetChartSize() {
      console.log("hahah");
      this.chart.resize();
    },
    exportPNG() {
      this.imgSrc = this.chart.getDataURL({
        type: "png",
        pixelRatio: this.form.pixelRatio
      });
      this.downloadPNG();
    },
    downloadPNG() {
      let dLink = document.createElement("a");
      dLink.download = this.name;
      dLink.href = this.imgSrc;
      document.body.appendChild(dLink);
      dLink.click();
      document.body.removeChild(dLink);
    }
  },
  mounted() {
    this.form.pixelRatio = window.devicePixelRatio;
    this.init();
    this.setOption();
  }
};
</script>

<style lang="scss" scoped>
.chart-edit {
  min-height: calc(100vh - 100px);
}
.chart-wrap {
  min-height: 500px;
}
.edit-bar {
  width: 22rem;
}
</style>
