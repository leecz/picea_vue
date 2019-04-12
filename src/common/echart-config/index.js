export default {
  line: {
    data_type: "sheet",
    orthogonal_coordinates: true
  },
  bar: {
    data_type: "sheet",
    orthogonal_coordinates: true
  },
  pie: {
    data_type: "sheet",
    orthogonal_coordinates: false
  },
  scatter: {
    data_type: "sheet",
    orthogonal_coordinates: true
  },
  mixed: {
    data_type: "sheet",
    orthogonal_coordinates: true
  },
  sankey: {
    multi_series: false,
    orthogonal_coordinates: false,
    data_type: "json"
  },
  graph: {
    multi_series: false,
    orthogonal_coordinates: false,
    data_type: "json"
  },
  radar: {
    multi_series: false,
    orthogonal_coordinates: false,
    data_type: "json"
  },
  liquidFill: {
    orthogonal_coordinates: false,
    data_type: "json"
  }
};
