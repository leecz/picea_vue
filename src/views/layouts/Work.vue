<template>
  <el-container class="vh-100">
    <el-header class="bg-blue flex items-center">
      <div class="white f3">云杉微视</div>
    </el-header>
    <el-container>
      <el-aside
        width="100px"
        class="flex flex-column items-center br b--light-silver color-primary "
      >
        <div
          v-for="(item, i) in navs"
          :key="i"
          class="mv4 tc"
          @click="onClick(item.pathname)"
          :class="{ active: current === item.pathname }"
        >
          <svg-icon :name="item.icon" class="f1"></svg-icon>
          <div class="mt1">{{ item.name }}</div>
        </div>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "work-layout",
  data() {
    return {
      current: "",
      navs: [
        {
          pathname: "chart_templates",
          icon: "icon-conduc",
          name: "图表库"
        },
        {
          pathname: "sheets",
          icon: "icon-data",
          name: "数据源"
        },
        {
          pathname: "charts",
          icon: "icon-photo",
          name: "图表"
        },
        {
          pathname: "chart_theme",
          icon: "icon-shape2",
          name: "主题"
        }
      ]
    };
  },
  methods: {
    onClick(name) {
      this.current = name;
      this.$router.push({ name });
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: #357edd;
}
</style>
