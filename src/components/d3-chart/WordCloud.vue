<template>
  <svg ref="chart" :width="width" :height="height">
    <g
      id="root-group"
      :transform="`translate(${width / 2}, ${height / 2})`"
    ></g>
  </svg>
</template>

<script>
import * as d3 from "d3";
import cloud from "./d3-cloud-layout";
import defaultData from "./data/index";
import chartMixin from "./mixins/chartMixin";
import _ from "lodash";

const defaultOption = {
  colors: d3.schemeCategory10
};
export default {
  name: "word-cloud-chart",
  mixins: [chartMixin],
  props: {
    dataset: {
      type: Array,
      default: () => defaultData.WordCloud
    }
  },
  data() {
    return {
      nodes: []
    };
  },
  computed: {
    color() {
      return d3
        .scaleOrdinal()
        .domain(this.nodes.map(d => d.group))
        .range(this.options.colors);
    },
    layout() {
      return cloud()
        .size([this.width, this.height])
        .words(this.nodes)
        .padding(1)
        .rotate(() => Math.floor(Math.random() * 2) * 90)
        .font("Impact")
        .fontSize(function(d) {
          return d.size;
        })
        .on("end", this.draw);
    },
    text() {
      return d3
        .select(this.$refs.chart)
        .select("#root-group")
        .selectAll("text")
        .data(this.nodes);
    }
  },
  watch: {
    option: {
      deep: true,
      handler() {
        this.genOptions();
        this.renderChart();
      }
    },
    dataset: {
      deep: true,
      handler() {
        this.genNodes();
        this.renderChart();
      }
    }
  },
  methods: {
    genNodes() {
      this.nodes = this.dataset.map(item => ({ ...item }));
    },
    genOptions() {
      this.options = _.merge({}, defaultOption, this.option);
    },
    init() {
      this.layout.start();
    },
    renderChart() {
      this.text.exit().remove();
      this.layout.start();
    },
    draw() {
      this.text
        .join("text")
        .style("font-size", function(d) {
          return d.size + "px";
        })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .style("fill", d => this.color(d.group))
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ") rotate(" + d.rotate + ")";
        })
        .text(function(d) {
          return d.text;
        });
    }
  },
  mounted() {
    this.genOptions();
    this.genNodes();
    this.init();
  }
};
</script>
