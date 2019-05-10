<template>
  <svg ref="chart" :width="width" :height="height">
    <g id="root-group">
      <g stroke="#999" stroke-opacity="0.6">
        <line
          v-for="l in links"
          :key="l.id"
          class="collapsible-force-link"
          :stroke-width="2"
        ></line>
      </g>
      <g>
        <circle
          v-for="c in nodes"
          :r="c.data.radius || 2"
          :key="c.id"
          :cx="c.x || 0"
          :cy="c.y || 0"
          class="collapsible-force-node"
          :fill="c.data.isLeaf ? '#fd8d3c' : '#c6dbef'"
        >
          <title>{{ c.data.name + ":" + c.data.value }}</title>
        </circle>
      </g>
    </g>
  </svg>
</template>

<script>
import * as d3 from "d3";
import _ from "lodash";
import datas from "./data/flare.js";
import chartMixin from "./mixins/chartMixin.js";
function genData() {
  return _.cloneDeep(datas);
}
const defaultOption = {
  minRadius: 2,
  maxRadius: 20
};
export default {
  mixins: [chartMixin],
  props: {
    dataset: {
      type: Object,
      default: () => genData()
    }
  },
  data() {
    return {
      options: {},
      nodes: [],
      links: [],
      root: []
    };
  },
  computed: {
    circles() {
      return this.svg
        .selectAll(".collapsible-force-node")
        .data(this.nodes)
        .call(this.drag());
    },
    lines() {
      return this.svg.selectAll(".collapsible-force-link").data(this.links);
    },
    simulation() {
      return d3.forceSimulation().nodes(this.nodes);
    },
    svg() {
      return d3.select(this.$refs.chart);
    }
  },
  methods: {
    color() {
      return d => {
        d.children ? "51a1dc" : d.children ? "#51a1dc" : "#f94b4c";
      };
    },
    genNodes() {
      let root = d3.hierarchy(_.cloneDeep(this.dataset));
      const scaleRadius = d3
        .scaleLinear()
        .domain(d3.extent(root.leaves(), d => d.data.value))
        .range([this.options.minRadius, this.options.maxRadius]);
      root.leaves().forEach(leaf => {
        leaf.data.radius = scaleRadius(leaf.data.value);
        leaf.data.isLeaf = true;
      });
      this.root = root;

      this.nodes = root.descendants();
      this.links = root.links();
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
    renderChart() {
      this.simulation
        .force("link", d3.forceLink(this.links).id(d => d.id))
        .force(
          "charge",
          d3
            .forceManyBody()
            .strength(-10)
            .distanceMax(200)
        )
        .force("center", d3.forceCenter(this.width / 2, this.height / 2))
        .force("collide", d3.forceCollide().radius(d => d.data.radius + 1));
      this.simulation.on("tick", this.tick);
    },
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
    tick() {
      this.lines
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
      this.circles.attr("cx", d => d.x).attr("cy", d => d.y);
    }
  },
  mounted() {
    this.setZoom();
    this.renderChart();
  }
};
</script>

<style>
.collapsible-force-link {
  fill: none;
  stroke: #9ecae1;
  stroke-width: 1.5px;
}
.collapsible-force-node {
  cursor: pointer;
  stroke: #3182bd;
  stroke-width: 1.5px;
}
</style>
