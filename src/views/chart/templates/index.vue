<template>
  <div>
    图表模板
    <div class="flex">
      <div
        v-for="(item, i) in templates"
        :key="i"
        class="tc"
        @click="onClick(item)"
      >
        <svg-icon :name="item.icon" class="f-6"></svg-icon>
        <div>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SET_CHART } from "@/store/mutations.type";
export default {
  data() {
    return {
      templates: []
    };
  },
  methods: {
    onClick(item) {
      item.theme = null;
      this.$store.commit(SET_CHART, item);
      this.$router.push({ name: "chart_edit" });
    }
  },
  mounted() {
    this.templates = this.$store.state.template.charts;
  }
};
</script>
