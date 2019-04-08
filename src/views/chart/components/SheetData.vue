<template>
  <div>
    <div class="flex justify-end items-center">
      <span class="mr1">关联数据 </span>
      <el-select v-model="selectSheet" @change="onSelectChange">
        <el-option
          v-for="sheet in datasheets"
          :key="sheet.id"
          :label="sheet.name"
          :value="sheet.id"
        ></el-option>
      </el-select>
    </div>
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
import { UPDATE_OPTION, RESET_CHART_SERIES } from "@/store/mutations.type";

import { SheetService } from "@/common/api.service";

export default {
  name: "sheet-data",
  components: {
    HotTable
  },
  data() {
    return {
      selectSheet: null,
      datasheets: [],
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
        this.$store.commit(RESET_CHART_SERIES);
      }
    },
    getDataList() {
      SheetService.list().then(res => {
        this.datasheets = res.data.data;
      });
    },
    onSelectChange() {
      let sheet = this.datasheets.find(el => el.id === this.selectSheet);
      this.$store.commit(UPDATE_OPTION, {
        path: "dataset.source",
        value: sheet.data.source
      });
      this.sheetData = sheet.data.source;
    }
  },
  mounted() {
    this.getDataList();
    this.hotRef = this.$refs.sheetTable.hotInstance;
    this.dataset = this.$store.getters.dataset;
    this.sheetData = this.dataset.source;
  }
};
</script>

<style lang="scss">
@import "~handsontable/dist/handsontable.full.css";
</style>
