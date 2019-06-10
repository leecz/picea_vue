<template>
  <svg ref="chart" :width="width" :height="height">
    <g id="root-group">
      <g v-for="(c, i) in nodes" :key="i">
        <circle
          :r="c.radius"
          class="bubble-chart-node"
          :id="`bubble-node-${i}`"
          :fill="color(c.group)"
        ></circle>
        <clipPath :id="`bubble-clip-${i}`">
          <use :xlink:href="`#bubble-node-${i}`"></use>
        </clipPath>
        <text
          v-if="!options.thumb"
          v-show="c.showLabel"
          :clip-path="`url(#bubble-clip-${i})`"
          class="bubble-chart-text"
          :x="c.x"
          :y="c.y"
          fill="#fff"
          style="font-size: 10px;"
          dy=".3em"
          text-anchor="middle"
        >
          {{ c.name }}
        </text>
        <title>
          {{ c.name + " : " + c.value }}
        </title>
      </g>
    </g>
  </svg>
</template>

<script>
import * as d3 from "d3";
const defaultOption = {
  chart: "BubbleChart",
  minRadius: 1,
  maxRadius: 20,
  thumb: false,
  labelValue: 100,
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
  name: "bubble-chart",
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
      default: () => []
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
      return this.svg.selectAll(".bubble-chart-node").data(this.nodes);
    },
    text() {
      return this.svg.selectAll(".bubble-chart-text").data(this.nodes);
    },
    simulation() {
      return d3.forceSimulation().nodes(this.nodes);
    },
    svg() {
      return d3.select(this.$refs.chart);
    },
    color() {
      return d3
        .scaleOrdinal()
        .domain(this.dataset.map(d => d.group))
        .range(this.options.colors);
    }
  },
  watch: {
    option: {
      deep: true,
      immediate: true,
      handler() {
        this.genOptions();
        this.genNodes();
        this.renderChart();
      }
    },
    dataset: {
      deep: true,
      immediate: true,
      handler() {
        this.genNodes();
        this.renderChart();
      }
    }
  },
  methods: {
    charge_force() {
      return d3.forceManyBody().strength();
    },
    center_force() {
      return d3.forceCenter(this.width / 2, this.height / 2);
    },
    x_force() {
      return d3.forceX();
    },
    y_force() {
      return d3.forceY();
    },
    collide_force() {
      let collide = this.options.forceProps.collide;
      return d3
        .forceCollide()
        .radius(d => d.radius + 1)
        .strength(collide.strength);
    },
    renderChart() {
      this.simulation
        .force("charge", this.charge_force())
        .force("center", this.center_force())
        .force("collide", this.collide_force())
        .force("x", this.x_force())
        .force("y", this.y_force());
      this.simulation.on("tick", this.tick);
    },
    tick() {
      this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
      this.text.attr("x", d => d.x).attr("y", d => d.y);
    },
    genNodes() {
      let radius = d3
        .scaleLinear()
        .domain(d3.extent(this.dataset, d => d.value))
        .range([this.options.minRadius, this.options.maxRadius]);
      this.nodes = this.dataset.map(item => {
        let r = radius(item.value) || 1;
        let showLabel = item.value > this.options.labelValue;
        return { ...item, radius: r, showLabel };
      });
    },
    genOptions() {
      this.options = Object.assign(defaultOption, { ...this.option });
    },
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
