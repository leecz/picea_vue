<template>
  <div>
    <el-select v-model="select" @change="onChange" placeholder="请选择">
      <el-option
        v-for="(item, i) in colors"
        :key="i"
        :label="item.key"
        :value="item.val"
      >
      </el-option>
    </el-select>
    <div class="flex flex-wrap">
      <div v-for="(color, i) in customColors" :key="i" class="mr1">
        <el-color-picker
          v-model="customColors[i]"
          @change="onColorChange"
        ></el-color-picker>
      </div>
      <div @click="addColor">
        <el-button type="primary" icon="el-icon-plus" circle></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  inheritAttrs: false,
  props: ["value"],
  data() {
    return {
      select: d3.schemeCategory10,
      customColors: [],
      colors: [
        { key: "schemeCategory10", val: d3.schemeCategory10 },
        { key: "schemeAccent", val: d3.schemeAccent },
        { key: "schemeDark2", val: d3.schemeDark2 },
        { key: "schemePaired", val: d3.schemePaired },
        { key: "schemePastel1", val: d3.schemePastel1 },
        { key: "schemePastel2", val: d3.schemePastel2 },
        { key: "schemeSet1", val: d3.schemeSet1 },
        { key: "schemeSet2", val: d3.schemeSet2 },
        { key: "schemeSet3", val: d3.schemeSet }
      ]
    };
  },
  watch: {
    select() {
      this.customColors = [...this.select];
    }
  },
  methods: {
    onChange() {
      this.$emit("input", [...this.select]);
    },
    addColor() {
      this.customColors.push("#ffffff");
    },
    onColorChange() {
      this.$emit("input", [...this.customColors]);
    }
  },
  created() {
    this.select = this.value;
    this.customColors = [...this.select];
  }
};
</script>
