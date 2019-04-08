<template>
  <div>
    <div class="mv2">
      <el-button @click="onDataChange" type="success" size="small"
        >更新图表数据</el-button
      >
    </div>
    <div>
      <div id="json-editor" class="vh-50"></div>
    </div>
  </div>
</template>

<script>
import { UPDATE_OPTION, RESET_CHART_SERIES } from "@/store/mutations.type";

import JSONEditor from "jsoneditor";

export default {
  name: "json-data",
  data() {
    return {
      dataName: "",
      jsonData: undefined,
      dataset: {},
      editor: {},
      error: ""
    };
  },
  methods: {
    onDataChange() {
      if (this.hotRef) {
        this.$store.commit(UPDATE_OPTION, {
          path: "dataset.source",
          value: this.getSourceData()
        });
        this.$store.commit(RESET_CHART_SERIES);
      }
    },
    onSelectChange() {
      let sheet = this.datasheets.find(el => el.id === this.selectSheet);
      this.$store.commit(UPDATE_OPTION, {
        path: "dataset.source",
        value: sheet.data.source
      });
      this.jsonData = sheet.data.source;
    },
    initJsonEditor() {
      const options = {
        mode: "code",
        onChange: () => {
          try {
            this.jsonData = this.editor.get();
          } catch (error) {
            this.error = error;
            console.log(error);
          }
        }
      };
      this.editor = new JSONEditor(
        document.getElementById("json-editor"),
        options,
        this.jsonData
      );
    },
    removeAceElement() {
      [...document.getElementsByClassName("jsoneditor-poweredBy")].forEach(
        el => {
          el.remove();
        }
      );
    }
  },
  mounted() {
    this.dataset = this.$store.getters.dataset;
    this.jsonData = this.dataset.source;
    this.initJsonEditor();
    this.removeAceElement();
  }
};
</script>

<style lang="scss">
@import "~jsoneditor/dist/jsoneditor.css";
</style>
