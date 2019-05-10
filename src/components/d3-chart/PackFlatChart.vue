<template>
  <svg ref="chart" :width="width" :height="height">
    <g v-for="c in nodes" :key="c.data.id">
      <circle
        :r="c.r"
        :cx="c.x"
        :cy="c.y"
        class="pack-flat-chart-node"
        :id="`node-${c.data.id}`"
        :fill="color"
      ></circle>
      <clipPath :id="`clip-${c.data.id}`">
        <use :xlink:href="`#node-${c.data.id}`"></use>
      </clipPath>
      <text
        v-if="!options.thumb"
        :clip-path="`url(#clip-${c.data.id})`"
        :x="c.x"
        :y="c.y"
        dy=".3em"
        text-anchor="middle"
      >
        {{ c.data.name }}
      </text>
      <title>
        {{ c.data.name + ":" + c.data.value }}
      </title>
    </g>
  </svg>
</template>

<script>
import * as d3 from "d3";
const defaultOption = {
  colors: d3.schemeCategory10,
  thumb: false
};
function genData() {
  return d3.range(200).map((_, i) => {
    let item = {};
    item.value = Math.floor(Math.random() * Math.sqrt(i));
    // item.group = Math.floor(Math.random() * i) % 2;
    item.name = i;
    item.id = i;
    return item;
  });
}
export default {
  name: "force-chart",
  props: {
    width: {
      type: Number,
      default: 600
    },
    height: {
      type: Number,
      default: 400
    },
    option: {
      type: Object,
      default: () => ({})
    },
    dataset: {
      type: Array,
      default: () => genData()
    }
  },
  data() {
    return {
      nodes: [],
      options: {}
    };
  },
  computed: {
    circles() {
      return this.svg.selectAll(".pack-flat-chart-node").data(this.nodes);
    },
    svg() {
      return d3.select(this.$refs.chart);
    },
    color() {
      return this.options.colors[0];
    }
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler() {
        this.genOptions();
      }
    },
    dataset: {
      deep: true,
      immediate: true,
      handler() {
        this.genNodes();
      }
    }
  },
  methods: {
    genNodes() {
      let root = d3
        .pack()
        .size([this.width, this.height])
        .padding(1)(
        d3
          .hierarchy({ children: this.dataset })
          .sum(d => d.value)
          .sort((a, b) => b.value - a.value)
      );
      this.nodes = root.leaves();
    },
    genOptions() {
      this.options = Object.assign(defaultOption, { ...this.option });
    }
  },
  mounted() {}
};
</script>

<style>
text {
  font-size: 10px;
}
</style>
