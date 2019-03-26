<template>
  <div>
    <div class="f4 mt3 mb2">颜色</div>
    <div class="flex flex-wrap">
      <div v-for="(color, i) in colors" :key="i" class="mr1">
        <el-color-picker v-model="colors[i]"></el-color-picker>
      </div>
      <div @click="addColor">
        <el-button type="primary" icon="el-icon-plus" circle></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { UPDATE_OPTION } from "@/store/mutations.type";

export default {
  data() {
    return {
      colors: []
    };
  },
  computed: {
    ...mapGetters(["currentColors"])
  },
  watch: {
    colors: {
      deep: true,
      handler: function() {
        this.$store.commit(UPDATE_OPTION, {
          path: "color",
          value: this.colors
        });
      }
    }
  },
  methods: {
    addColor() {
      this.colors.push("#ffffff");
    }
  },
  mounted() {
    this.colors = JSON.parse(JSON.stringify(this.currentColors));
  }
};
</script>
