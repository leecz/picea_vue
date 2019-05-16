import * as d3 from "d3";
import flare from "./flare";
import miserables from "./miserables";
const PackFlatChart = d3.range(200).map((_, i) => {
  let item = {};
  item.value = Math.floor(Math.random() * Math.sqrt(i));
  // item.group = Math.floor(Math.random() * i) % 2;
  item.name = i;
  item.id = i;
  return item;
});
const BubbleChart = d3.range(200).map((_, i) => {
  let item = {};
  item.value = Math.floor(Math.random() * Math.sqrt(i));
  item.group = Math.floor(Math.random() * i) % 2;
  item.id = i;
  return item;
});
const WordCloud = [
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
export default {
  BubbleChart,
  PackFlatChart,
  WordCloud,
  CollapsibleForceChart: flare,
  ForceDirectedChart: miserables
};
