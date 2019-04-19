<template>
  <div class="mt3">
    <el-form size="mini" label-width="80px">
      <el-form-item label="类型">
        <el-select
          v-model="form.type"
          placeholder="请选择类型"
          @change="typeChange"
        >
          <el-option
            v-for="item in types"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <input style="display:none;" />
    </el-form>
    <line-config
      v-if="form.type === 'line'"
      :seriesIndex="seriesIndex"
      :key="seriesIndex"
    ></line-config>
    <bar-config
      v-if="form.type === 'bar'"
      :seriesIndex="seriesIndex"
      :key="seriesIndex"
    ></bar-config>
  </div>
</template>
<script>
import { UPDATE_OPTION } from "@/store/mutations.type";
import LineConfig from "./LineConfig";
import BarConfig from "./BarConfig";
const types = [
  {
    label: "线图",
    value: "line"
  },
  {
    label: "柱状图",
    value: "bar"
  }
];
export default {
  components: {
    LineConfig,
    BarConfig
  },
  props: {
    seriesIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      types,
      form: {
        type: ""
      }
    };
  },
  methods: {
    typeChange() {
      this.commitChange(`series[${this.seriesIndex}].type`, this.form.type);
    },
    commitChange(path, value) {
      this.$store.commit(UPDATE_OPTION, { path, value });
    }
  },
  created() {
    this.form = Object.assign(
      this.form,
      this.$store.state.chart.option.series[this.seriesIndex]
    );
  }
};
</script>
