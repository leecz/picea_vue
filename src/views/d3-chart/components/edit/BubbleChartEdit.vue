<template>
  <div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="最小半径">
        <el-input type="number" v-model.number="option.minRadius"></el-input>
      </el-form-item>
      <el-form-item label="最大半径">
        <el-input type="number" v-model.number="option.maxRadius"></el-input>
      </el-form-item>
      <el-form-item label="标签阈值">
        <el-input type="number" v-model.number="option.labelValue"></el-input>
      </el-form-item>
      <el-form-item label="碰撞力">
        <vue-slider
          :min="0"
          :max="1"
          :interval="0.1"
          v-model.number="option.forceProps.collide.strength"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="颜色">
        <d3-colors v-model="option.colors"></d3-colors>
      </el-form-item>
      <el-form-item label="自定义">
        <custom-colors v-model="option.colors"></custom-colors>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _ from "lodash";
import D3Colors from "../D3Colors";
import * as d3 from "d3";
import CustomColors from "../CustomColors";
export default {
  components: {
    D3Colors,
    CustomColors
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      option: {
        colors: d3.schemeCategory10,
        minRadius: 1,
        maxRadius: 20,
        labelValue: 100,
        forceProps: {
          collide: {
            enabled: true,
            strength: 0.7,
            iterations: 1,
            radius: 1
          }
        }
      }
    };
  },
  watch: {
    options: {
      handler() {
        this.option = _.merge(this.option, this.options);
      }
    },
    option: {
      deep: true,
      handler() {
        this.$emit("change", this.option);
      }
    }
  }
};
</script>
