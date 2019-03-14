<template>
  <div>
    <div class="f4 mt4 mb2">标题</div>
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
        <vue-slider
          :value="title.left"
          @change="leftChange"
          :tooltip-formatter="formatter"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="垂直位置">
        <vue-slider
          :value="title.top"
          @change="topChange"
          :tooltip-formatter="formatter"
          use-keyboard
        ></vue-slider>
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
        left: 0,
        top: 0
      }
    };
  },
  computed: {
    percentLeft() {
      return this.title.left + "%";
    },
    percentTop() {
      return this.title.top + "%";
    }
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
      this.title.left = val;
      this.$store.commit(UPDATE_OPTION, {
        path: "title.left",
        value: this.percentLeft
      });
    },
    topChange(val) {
      this.title.top = val;
      this.$store.commit(UPDATE_OPTION, {
        path: "title.top",
        value: this.percentTop
      });
    }
  },
  created() {
    let title = Object.assign(this.title, this.$store.state.chart.option.title);
    let { left, top } = title;
    if (left && typeof left === "string") {
      title.left = parseInt(left);
    }
    if (top && typeof top === "string") {
      title.top = parseInt(top);
    }
    this.title = title;
  }
};
</script>
