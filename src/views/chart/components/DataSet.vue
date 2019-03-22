<template>
  <div>
    <hot-table
      :settings="settings"
      :data="sheetData"
      width="80%"
      height="400"
      ref="sheetTable"
    ></hot-table>
  </div>
</template>

<script>
import { HotTable } from "@handsontable/vue";
import "handsontable/languages/zh-CN";
import { UPDATE_OPTION } from "@/store/mutations.type";

export default {
  name: "dataset",
  components: {
    HotTable
  },
  data() {
    return {
      dataName: "",
      settings: {
        licenseKey: "non-commercial-and-evaluation",
        language: "zh-CN",
        startRows: 10,
        startCols: 10,
        colHeaders: true,
        rowHeaders: true,
        manualColumnResize: true,
        manualRowResize: true,
        manualColumnMove: true,
        manualRowMove: true,
        contextMenu: true,
        colWidths: 110,
        afterChange: () => {
          this.onDataChange();
        }
      },
      sheetData: undefined,
      dataset: {},
      hotRef: null
    };
  },
  methods: {
    getSourceData() {
      return this.hotRef.getSourceData();
    },
    onDataChange() {
      if (this.hotRef) {
        this.$store.commit(UPDATE_OPTION, {
          path: "dataset.source",
          value: this.getSourceData()
        });
      }
    }
  },
  mounted() {
    this.hotRef = this.$refs.sheetTable.hotInstance;
    this.dataset = this.$store.getters.dataset;
    this.sheetData = this.dataset.source;
  }
};
</script>

<style lang="scss">
@import "~handsontable/dist/handsontable.full.css";
</style>
