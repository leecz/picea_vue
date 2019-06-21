<template>
  <div>
    <div class="flex flex-wrap">
      <div v-for="(color, i) in colors" :key="i" class="mr1">
        <el-color-picker
          v-model="colors[i]"
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
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      colors: [...this.value]
    };
  },
  watch: {
    value() {
      this.colors = [...this.value];
    }
  },
  methods: {
    addColor() {
      this.colors.push("#ffffff");
    },
    onColorChange() {
      this.$emit("input", [...this.colors]);
    }
  }
};
</script>
