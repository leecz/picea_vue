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
      default: "icon-dog"
    }
  },
  computed: {
    iconName() {
      return `#${this.name}`;
    }
  }
};
</script>
