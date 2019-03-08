<template>
  <svg class="icon" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: "svg-icon",
  props: {
    name: {
      type: String,
      default: "dog"
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    }
  }
};
</script>
