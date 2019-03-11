<template>
  <div>
    <div class="f4 mb2">
      上传数据
    </div>
    <div>
      <el-upload
        class="upload-demo"
        drag
        action="#"
        :auto-upload="false"
        :on-change="onChange"
        :multiple="false"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传excel文件
        </div>
      </el-upload>
    </div>
    <div class="f4 mt4 mb2">
      数据预览
    </div>
    <div>
      <el-form inline>
        <el-form-item label="文件名">
          <el-input v-model="dataName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
      <hot-table
        :settings="settings"
        :data="sheetData"
        width="80%"
        height="400"
        ref="sheetTable"
      ></hot-table>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { HotTable } from "@handsontable/vue";
import "handsontable/languages/zh-CN";
import { SheetService } from "@/common/api.service";

export default {
  name: "sheets-new",
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
        colWidths: 110
      },
      sheetData: undefined
    };
  },
  methods: {
    onChange(file) {
      if (file.status !== "ready") return;
      console.log(file);
      this.readExcel(file);
    },
    readExcel({ name, raw }) {
      let nameArr = name.split(".");
      const validTypes = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"];
      if (!validTypes.includes(nameArr.pop())) {
        this.$message("文件类型错误！请重新选择");
        return;
      }
      this.dataName = nameArr.join(".");
      let reader = new FileReader();
      reader.onload = event => {
        try {
          let data = event.target.result;
          let workbook = XLSX.read(data, { type: "binary" });
          console.log(workbook);
          let firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          let sheetData = XLSX.utils.sheet_to_json(firstSheet, {
            header: 1,
            blankrows: false
          });
          this.sheetData = sheetData;
        } catch (error) {
          console.log("读取excel失败");
        }
      };
      reader.readAsBinaryString(raw);
    },
    getSourceData() {
      return this.$refs.sheetTable.hotInstance.getSourceData();
    },
    onSubmit() {
      SheetService.create({
        sheet: {
          name: this.dataName,
          data: { rows: this.getSourceData() }
        }
      }).then(res => {
        console.log(res);
        this.$router.push({ name: "sheets" });
      });
    }
  }
};
</script>

<style lang="scss">
@import "~handsontable/dist/handsontable.full.css";
</style>
