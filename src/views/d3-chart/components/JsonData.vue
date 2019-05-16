<template>
  <div>
    <div id="json-editor" class="vh-50"></div>
  </div>
</template>

<script>
import JSONEditor from "jsoneditor";

export default {
  name: "json-data",
  props: ["dataset"],
  data() {
    return {
      dataName: "",
      editor: {},
      error: ""
    };
  },
  methods: {
    initData(val) {
      this.editor.set(val);
    },
    initJsonEditor() {
      const options = {
        mode: "code",
        onChange: () => {
          try {
            this.jsonData = this.editor.get();
            this.$emit("change", this.jsonData);
          } catch (error) {
            console.log(error);
          }
        }
      };
      this.editor = new JSONEditor(
        document.getElementById("json-editor"),
        options,
        this.dataset
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
    this.initJsonEditor();
    this.removeAceElement();
  }
};
</script>

<style lang="scss">
@import "~jsoneditor/dist/jsoneditor.css";
</style>
