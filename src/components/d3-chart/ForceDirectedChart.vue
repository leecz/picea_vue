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
        <g v-for="(c, i) in nodes" :key="i">
          <circle
            :r="options.radius"
            :cx="c.x || 0"
            :cy="c.y || 0"
            class="force-chart-node"
            :fill="color(c.group)"
          >
            <title>{{ c.id }}</title>
          </circle>
          <text
            v-if="options.showLabel"
            class="force-directed-chart-text"
            :x="c.x"
            :y="c.y"
            fill="#333"
            style="font-size: 10px;"
            dy=".3em"
            text-anchor="middle"
          >
            {{ c.id }}
          </text>
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
import * as d3 from "d3";
import defaultData from "./data/index";
import _ from "lodash";
const defaultOption = {
  radius: 5,
  showLabel: false,
  colors: d3.schemeCategory10,
  forceProps: {
    collide: {
      enabled: true,
      strength: 0.7,
      iterations: 1,
      radius: 1
    },
    charge: {
      strenth: -200,
      enabled: 1,
      distanceMin: 1,
      distanceMax: 2000
    },
    link: {
      distance: 30
    },
    forceX: {
      strength: 0
    },
    forceY: {
      strength: 0
    }
  }
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
    text() {
      return this.svg.selectAll(".force-directed-chart-text").data(this.nodes);
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
      let forceProps = this.options.forceProps;
      this.simulation
        .force(
          "link",
          d3
            .forceLink(this.links)
            .id(d => d.id)
            .distance(forceProps.link.distance)
        )
        .force("forceX", d3.forceX().strength(forceProps.forceX.strength))
        .force("forceY", d3.forceY().strength(forceProps.forceY.strength))
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
      this.text.attr("x", d => d.x).attr("y", d => d.y);
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
      this.options = _.merge({}, defaultOption, this.option);
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
