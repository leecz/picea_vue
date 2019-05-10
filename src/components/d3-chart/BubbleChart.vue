<template>
  <svg ref="chart" :width="width" :height="height">
    <g id="root-group">
      <circle
        v-for="c in nodes"
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
const defaultOption = {
  minRadius: 1,
  maxRadius: 10,
  colors: d3.schemeCategory10
};
function genData() {
  return d3.range(200).map((_, i) => {
    let item = {};
    item.value = Math.floor(Math.random() * Math.sqrt(i));
    item.group = Math.floor(Math.random() * i) % 2;
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
      return this.svg.selectAll(".bubble-chart-node").data(this.nodes);
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
    charge_force() {
      return d3.forceManyBody().strength(20);
    },
    center_force() {
      return d3.forceCenter(this.width / 2, this.height / 2);
    },
    x_force() {
      return d3.forceX().x(d => d.group * 100);
    },
    y_force() {
      return d3.forceY().y(d => d.group);
    },
    collide_force() {
      return d3.forceCollide().radius(d => d.radius + 1);
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
    this.renderChart();
    this.setZoom();
  }
};
</script>
