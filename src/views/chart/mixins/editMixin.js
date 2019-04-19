import { mapState } from "vuex";
export default {
  data() {
    return {
      seriesIndex: 0
    };
  },
  computed: {
    ...mapState({
      series: state => state.chart.option.series
    })
  }
};
