<template>
  <component :is="compo" />
</template>

<script>
import VLine from "./Line";
import VBar from "./Bar";
import VGraph from "./Graph";
import VMixed from "./Mixed";
import VPie from "./Pie";
import VRadar from "./Radar";
import VSankey from "./Sankey";
import VScatter from "./Scatter";
import { mapState } from "vuex";

export default {
  components: {
    VLine,
    VBar,
    VGraph,
    VMixed,
    VPie,
    VRadar,
    VSankey,
    VScatter
  },
  computed: {
    ...mapState({
      compo: state => `v-${state.chart.type}`
    })
  }
};
</script>
