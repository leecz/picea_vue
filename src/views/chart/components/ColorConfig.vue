<template>
  <div>
    <div class="f4 mt3 mb2">颜色</div>
    <div>
      <div v-for="(color, i) in colors" :key="i">
        {{ color }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      colors: state => state.chart.option.colors
    })
  }
};
</script>
