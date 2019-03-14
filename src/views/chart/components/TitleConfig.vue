<template>
  <div>
    <div class="f4 mt3 mb2">标题</div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="是否显示">
        <el-switch :value="title.show" @input="showChange"></el-switch>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          type="text"
          :value="title.text"
          @input="textChange"
        ></el-input>
      </el-form-item>
      <el-form-item label="字体">
        <font path="title.textStyle"></font>
      </el-form-item>
      <el-form-item label="水平位置">
        <percent-slider
          :percent="title.left"
          @change="leftChange"
        ></percent-slider>
      </el-form-item>
      <el-form-item label="垂直位置">
        <percent-slider
          :percent="title.top"
          @change="topChange"
        ></percent-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Font from "./Font";
import { UPDATE_OPTION } from "@/store/mutations.type";
export default {
  name: "title-config",
  components: {
    Font
  },
  data() {
    return {
      formatter: "{value}%",
      title: {
        show: true,
        text: "",
        left: "0%",
        top: "0%"
      }
    };
  },
  methods: {
    showChange(val) {
      this.title.show = val;
      this.$store.commit(UPDATE_OPTION, { path: "title.show", value: val });
    },
    textChange(val) {
      this.title.text = val;
      this.$store.commit(UPDATE_OPTION, { path: "title.text", value: val });
    },
    leftChange(val) {
      this.$store.commit(UPDATE_OPTION, {
        path: "title.left",
        value: val
      });
    },
    topChange(val) {
      this.$store.commit(UPDATE_OPTION, {
        path: "title.top",
        value: val
      });
    }
  },
  created() {
    this.title = Object.assign(
      this.title,
      this.$store.state.chart.option.title
    );
  }
};
</script>
