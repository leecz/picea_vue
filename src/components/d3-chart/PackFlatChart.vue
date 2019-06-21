<template>
  <svg ref="chart" :width="width" :height="height">
    <g id="root-group">
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
          v-if="c.data.value >= options.labelValue"
          :clip-path="`url(#clip-${c.data.id})`"
          :x="c.x"
          :y="c.y"
          dy=".3em"
          fill="#fff"
          text-anchor="middle"
        >
          {{ c.data.name }}
        </text>
        <title>
          {{ c.data.name + ":" + c.data.value }}
        </title>
      </g>
    </g>
  </svg>
</template>

<script>
import * as d3 from "d3";
import chartMixin from "./mixins/chartMixin.js";
import defaultData from "./data/index";
import _ from "lodash";
const defaultOption = {
  chart: "PackFlatChart",
  minRadius: 1,
  maxRadius: 20,
  labelValue: 10,
  colors: d3.schemeCategory10,
  forceProps: {
    collide: {
      enabled: true,
      strength: 0.7,
      iterations: 1,
      radius: 1
    }
  }
};
export default {
  name: "pack-flat-chart",
  mixins: [chartMixin],
  props: {
    option: {
      type: Object,
      default: () => ({})
    },
    dataset: {
      type: Array,
      default: () => defaultData.PackFlatChart
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
      this.options = _.merge({}, defaultOption, this.option);
    },
    renderChart() {},
    setZoom() {
      this.svg.call(
        d3.zoom().on("zoom", () => {
          this.svg.select("#root-group").attr("transform", d3.event.transform);
        })
      );
    }
  },
  mounted() {
    this.setZoom();
  }
};
</script>

<style>
text {
  font-size: 10px;
}
</style>
