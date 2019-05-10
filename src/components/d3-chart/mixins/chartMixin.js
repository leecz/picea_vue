export default {
  props: {
    width: {
      default: "100%"
    },
    height: {
      default: "100%"
    },
    option: {
      type: Object,
      default: () => ({})
    },
    dataset: {
      type: Array,
      default: () => []
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
  }
};
