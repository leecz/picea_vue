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
      <el-form-item label="标签">
        <el-switch
          v-model="form.label.show"
          @change="labelShowChange"
        ></el-switch>
      </el-form-item>
      <el-form-item label="标签位置">
        <el-select
          v-model="form.label.position"
          placeholder="请选择标签位置"
          @change="labelPositionChange"
        >
          <el-option
            v-for="item in labelPositions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <input style="display:none;" />
    </el-form>
  </div>
</template>
<script>
import { UPDATE_OPTION } from "@/store/mutations.type";
const labelPositions = [
  "top",
  "left",
  "right",
  "bottom",
  "inside",
  "insideLeft",
  "insideRight",
  "insideTop",
  "insideBottom",
  "insideTopLeft",
  "insideBottomLeft",
  "insideTopRight",
  "insideBottomRight"
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
      labelPositions,
      form: {
        name: "",
        label: {
          show: false,
          position: "inside"
        },
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
    labelShowChange() {
      this.commitChange(
        `series[${this.seriesIndex}].label.show`,
        this.form.label.show
      );
    },
    labelPositionChange() {
      this.commitChange(
        `series[${this.seriesIndex}].label.position`,
        this.form.label.position
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
