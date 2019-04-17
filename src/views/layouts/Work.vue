<template>
  <el-container class="vh-100">
    <el-header class="bg-blue flex items-center justify-between">
      <div class="white f3">云杉微视</div>
      <div class="mr2">
        <el-dropdown @command="handleCommand">
          <span class="ph3 f5 pointer white ">
            {{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="exit">
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
      <el-main style="padding: 0;">
        <router-view style="padding: 20px;" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import { PURGE_AUTH } from "@/store/mutations.type";
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
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    onClick(name) {
      this.current = name;
      this.$router.push({ name });
    },
    handleCommand(cmd) {
      switch (cmd) {
        case "exit":
          this.exitCommand();
          break;
      }
    },
    exitCommand() {
      this.$store.commit(PURGE_AUTH);
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.active {
  color: #357edd;
}
</style>
