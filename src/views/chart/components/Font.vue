<template>
  <div class="flex">
    <el-select v-model="textStyle.fontSize" placeholder="字体大小">
      <el-option
        v-for="item in sizes"
        :key="item"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
    <div
      class="ml1 font-box"
      :style="{ fontWeight: textStyle.fontWeight }"
      @click="onBoldClick"
    >
      B
    </div>
    <div
      class="ml1 font-box"
      :style="{ fontStyle: textStyle.fontStyle }"
      @click="onStyleClick"
    >
      I
    </div>
    <div class="ml1">
      <el-color-picker v-model="textStyle.color"></el-color-picker>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { UPDATE_OPTION } from "@/store/mutations.type";

export default {
  name: "font",
  props: {
    path: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sizes: [...Array(15).keys()].map(x => x * 2 + 10),
      textStyle: {
        color: "#333",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: 12
      }
    };
  },
  watch: {
    textStyle: {
      deep: true,
      handler: function() {
        this.commitChange();
      }
    }
  },
  methods: {
    onBoldClick() {
      this.textStyle.fontWeight =
        this.textStyle.fontWeight === "normal" ? "bold" : "normal";
    },
    onStyleClick() {
      this.textStyle.fontStyle =
        this.textStyle.fontStyle === "normal" ? "italic" : "normal";
    },
    commitChange() {
      this.$store.commit(UPDATE_OPTION, {
        path: this.path,
        value: this.textStyle
      });
    }
  },
  created() {
    let option = this.$store.state.chart.option;
    this.textStyle = Object.assign(this.textStyle, _.get(option, this.path));
  }
};
</script>

<style lang="scss" scoped>
.font-box {
  text-align: center;
  width: 28px;
  height: 28px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  cursor: pointer;
}
</style>
