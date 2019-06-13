<template>
  <svg ref="chart" :width="width" :height="height">
    <g id="root-group">
      <g stroke="#999" stroke-opacity="0.6">
        <line
          v-for="l in links"
          :key="l.id"
          class="force-chart-link"
          :stroke-width="l.lineWidth"
        ></line>
      </g>
      <g>
        <circle
          v-for="c in nodes"
          :r="5"
          :key="c.id"
          :cx="c.x || 0"
          :cy="c.y || 0"
          class="force-chart-node"
          :fill="color(c.group)"
        >
          <title>{{ c.id }}</title>
        </circle>
      </g>
    </g>
  </svg>
</template>

<script>
import * as d3 from "d3";
import defaultData from "./data/index";
const defaultOption = {
  minLineWidth: 1,
  maxLineWidth: 10,
  colors: d3.schemeCategory10
};
import chartMixin from "./mixins/chartMixin";
export default {
  name: "force-directed-chart",
  mixins: [chartMixin],
  props: {
    dataset: {
      type: Object,
      default: () => defaultData.ForceDirectedChart
    }
  },
  data() {
    return {
      nodes: [],
      links: [],
      options: {}
    };
  },
  computed: {
    circles() {
      return this.svg
        .selectAll(".force-chart-node")
        .data(this.nodes)
        .call(this.drag());
    },
    lines() {
      return this.svg.selectAll(".force-chart-link").data(this.links);
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
        .domain(this.nodes.map(d => d.group))
        .range(this.options.colors);
    }
  },

  methods: {
    drag() {
      let dragstarted = d => {
        if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      };

      let dragged = d => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      };

      let dragended = d => {
        if (!d3.event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      };

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    },
    renderChart() {
      this.simulation
        .force("link", d3.forceLink(this.links).id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(this.width / 2, this.height / 2));
      this.simulation.on("tick", this.tick);
    },
    tick() {
      this.lines
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
    },
    genNodes() {
      let widthScale = d3
        .scaleLinear()
        .domain(d3.extent(this.dataset.links, d => d.value))
        .range([this.options.minLineWidth, this.options.maxLineWidth]);
      this.nodes = this.dataset.nodes.map(item => ({ ...item }));
      this.links = this.dataset.links.map(item => ({
        ...item,
        lineWidth: widthScale(item.value)
      }));
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
