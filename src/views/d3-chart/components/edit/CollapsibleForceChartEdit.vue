<template>
  <div>
    <el-form size="mini" label-width="80px">
      <el-form-item label="最小半径">
        <el-input type="number" v-model.number="option.minRadius"></el-input>
      </el-form-item>
      <el-form-item label="最大半径">
        <el-input type="number" v-model.number="option.maxRadius"></el-input>
      </el-form-item>
      <el-form-item label="电荷力">
        <vue-slider
          :min="-50"
          :max="50"
          v-model.number="option.forceProps.charge.strength"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="电荷大值">
        <el-input
          type="number"
          v-model.number="option.forceProps.charge.distanceMax"
        ></el-input>
      </el-form-item>
      <el-form-item label="连接力">
        <vue-slider
          :min="-50"
          :max="50"
          v-model.number="option.forceProps.link.distance"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="X方向力">
        <vue-slider
          :min="0"
          :max="1"
          :interval="0.1"
          v-model.number="option.forceProps.forceX.strength"
          use-keyboard
        ></vue-slider>
      </el-form-item>
      <el-form-item label="Y方向力">
        <vue-slider
          :min="0"
          :max="1"
          :interval="0.1"
          v-model.number="option.forceProps.forceY.strength"
          use-keyboard
        ></vue-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      option: {
        maxRadius: 20,
        minRadius: 2,
        showLabel: false,
        forceProps: {
          collide: {
            enabled: true,
            strength: 0.7,
            iterations: 1,
            radius: 1
          },
          charge: {
            strength: -10,
            enabled: 1,
            distanceMin: 1,
            distanceMax: 200
          },
          link: {
            distance: 30
          },
          forceX: {
            strength: 0
          },
          forceY: {
            strength: 0
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
