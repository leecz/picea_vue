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
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      select: [...this.value],
      colors: [
        { key: "schemeCategory10", val: d3.schemeCategory10 },
        { key: "schemeAccent", val: d3.schemeAccent },
        { key: "schemeDark2", val: d3.schemeDark2 },
        { key: "schemePaired", val: d3.schemePaired },
        { key: "schemePastel1", val: d3.schemePastel1 },
        { key: "schemePastel2", val: d3.schemePastel2 },
        { key: "schemeSet1", val: d3.schemeSet1 },
        { key: "schemeSet2", val: d3.schemeSet2 },
        { key: "schemeSet3", val: d3.schemeSet3 }
      ]
    };
  },
  methods: {
    onChange() {
      this.$emit("input", [...this.select]);
    }
  }
};
</script>
