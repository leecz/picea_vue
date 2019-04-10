<template>
  <div>
    <div id="json-editor" class="vh-50"></div>
  </div>
</template>

<script>
import { UPDATE_OPTION } from "@/store/mutations.type";

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
      this.$store.commit(UPDATE_OPTION, {
        path: "dataset.source",
        value: this.jsonData
      });
    },
    initJsonEditor() {
      const options = {
        mode: "code",
        onChange: () => {
          try {
            this.jsonData = this.editor.get();
            this.onDataChange();
          } catch (error) {
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
