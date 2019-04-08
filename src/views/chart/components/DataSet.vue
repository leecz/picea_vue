<template>
  <div>
    <component :is="compo"></component>
  </div>
</template>

<script>
import SheetData from "./SheetData";
import JsonData from "./JsonData";
import { mapGetters } from "vuex";
export default {
  name: "dataset",
  components: {
    SheetData,
    JsonData
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      compo: "currentDataset"
    })
  }
};
</script>
