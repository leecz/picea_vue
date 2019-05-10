<template>
  <svg ref="chart" :width="width" :height="height"></svg>
</template>

<script>
import * as d3 from "d3";
import cloud from "./d3-cloud-layout";

function genData() {
  return [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "HTTP",
    "GraphQL",
    "PostgreSQL",
    "Webpack",
    "Vue",
    "React",
    "DOM",
    "Git",
    "SVG",
    "Node.js"
  ].map(d => {
    return {
      text: d,
      size: 10 + Math.random() * 90,
      group: Math.floor(Math.random() * 2)
    };
  });
}

const defaultOption = {
  colors: d3.schemeCategory10
};
export default {
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
      nodes: []
    };
  },
  computed: {
    color() {
      return d3
        .scaleOrdinal()
        .domain(this.dataset.map(d => d.group))
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
      this.nodes = this.dataset.map(item => ({ ...item }));
    },
    genOptions() {
      this.options = Object.assign(defaultOption, this.option);
    },
    init() {
      this.layout.start();
    },

    draw() {
      d3.select(this.$refs.chart)
        .append("g")
        .attr(
          "transform",
          "translate(" + this.width / 2 + "," + this.height / 2 + ")"
        )
        .selectAll("text")
        .data(this.nodes)
        .enter()
        .append("text")
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
    this.init();
  }
};
</script>
