<template>
  <vue-slider
    :value="innerData"
    @change="onChange"
    :tooltip-formatter="formatter"
    use-keyboard
  ></vue-slider>
</template>
<script>
export default {
  name: "percent-slider",
  data() {
    return {
      formatter: "{value}%"
    };
  },
  props: {
    percent: {
      type: String,
      required: true
    }
  },
  computed: {
    innerData() {
      return Number.parseInt(this.percent);
    }
  },
  methods: {
    onChange(val) {
      this.$emit("change", val + "%");
    }
  }
};
</script>
