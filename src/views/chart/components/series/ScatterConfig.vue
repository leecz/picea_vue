<template>
  <div class="mt3">
    <el-form size="mini" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name" @change="nameChange"></el-input>
      </el-form-item>
      <el-form-item label="颜色">
        <el-color-picker
          v-model="form.itemStyle.color"
          @change="itemStyleColorChange"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="标记符号">
        <el-select
          v-model="form.symbol"
          placeholder="请选择符号"
          @change="symbolChange"
        >
          <el-option
            v-for="item in symbols"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标记大小">
        <el-input-number
          v-model="form.symbolSize"
          @change="symbolSizeChange"
          :min="1"
          :max="50"
          label="描述文字"
        ></el-input-number>
      </el-form-item>

      <input style="display:none;" />
    </el-form>
  </div>
</template>
<script>
import { UPDATE_OPTION } from "@/store/mutations.type";
const symbols = [
  "emptyCircle",
  "circle",
  "rect",
  "roundRect",
  "triangle",
  "diamond",
  "pin",
  "arrow",
  "none"
];
export default {
  props: {
    seriesIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      symbols,
      form: {
        name: "",
        symbol: "emptyCircle",
        symbolSize: 10,
        itemStyle: {
          color: "#000"
        }
      }
    };
  },
  methods: {
    nameChange() {
      this.commitChange(`series[${this.seriesIndex}].name`, this.form.name);
    },
    itemStyleColorChange() {
      this.commitChange(
        `series[${this.seriesIndex}].itemStyle.color`,
        this.form.itemStyle.color
      );
    },
    symbolChange() {
      this.commitChange(`series[${this.seriesIndex}].symbol`, this.form.symbol);
    },
    symbolSizeChange() {
      this.commitChange(
        `series[${this.seriesIndex}].symbolSize`,
        this.form.symbolSize
      );
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
