<template>
  <svg ref="chart" :width="width" :height="height">
    <g id="root-group">
      <circle
        v-for="c in nodesLeft"
        :r="c.radius"
        :key="c.id"
        :cx="c.x || 0"
        :cy="c.y || 0"
        class="bubble-chart-node"
        :fill="color(c.group)"
      ></circle>
    </g>
  </svg>
</template>

<script>
import * as d3 from "d3";
import chartMixin from "./mixins/chartMixin.js";
const defaultOption = {
  minRadius: 1,
  maxRadius: 10,
  colors: d3.schemeCategory10
};
function genData() {
  return d3.range(50).map((_, i) => {
    let item = {};
    item.value = Math.floor(Math.random() * Math.sqrt(i));
    item.group = Math.floor(Math.random() * i) % 2;
    item.id = i;
    return item;
  });
}
export default {
  name: "bubble-ring-chart",
  mixins: [chartMixin],
  props: {
    dataset: {
      type: Array,
      default: () => genData()
    }
  },
  data() {
    return {
      nodes: [],
      root: {},
      options: {}
    };
  },
  computed: {
    nodesLeft() {
      return this.nodes.slice(1);
    },
    circles() {
      return this.svg.selectAll(".bubble-chart-node").data(this.nodes.slice(1));
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
  methods: {
    charge_force() {
      return d3.forceManyBody().strength(20);
    },
    center_force() {
      return d3.forceCenter(this.width / 2, this.height / 2);
    },
    collide_force() {
      return d3.forceCollide().radius(d => d.radius + 1);
    },
    renderChart() {
      this.simulation
        .force("charge", this.charge_force())
        .force("center", this.center_force())
        .force("collide", this.collide_force());
      this.simulation.on("tick", this.tick);
    },
    tick() {
      this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
    },
    genNodes() {
      let radius = d3
        .scaleLinear()
        .domain(d3.extent(this.dataset, d => d.value))
        .range([this.options.minRadius, this.options.maxRadius]);
      this.nodes = this.dataset.map(item => {
        let r = radius(item.value);
        return { ...item, radius: r };
      });
      this.root = this.nodes[0];
      this.root.radius = 0;
      this.root.fixed = true;
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
    },
    setMousemove() {
      let self = this;
      this.svg.on("mousemove", function() {
        let p1 = d3.mouse(this);
        console.log(p1);
        self.root.px = p1[0];
        self.root.py = p1[1];
        self.simulation.restart();
      });
    }
  },
  mounted() {
    this.renderChart();
    this.setZoom();
    this.setMousemove();
  }
};
</script>
