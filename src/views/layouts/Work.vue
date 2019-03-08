<template>
  <el-container class="bg-washed-blue vh-100">
    <el-header class="bg-blue flex items-center">
      <div class="white f3">云杉微视</div>
    </el-header>
    <el-container>
      <el-aside
        width="100px"
        class="flex flex-column items-center br b--light-silver color-primary"
      >
        <div class="mv4 tc">
          <svg-icon name="conduc" class="f1"></svg-icon>
          <div class="mt1">图表库</div>
        </div>
        <div class="mv4 tc" @click="$router.push('/works/sheets')">
          <svg-icon name="data" class="f1"></svg-icon>
          <div class="mt1">数据源</div>
        </div>
        <div class="mv4 tc">
          <svg-icon name="photo" class="f1"></svg-icon>
          <div class="mt1">图表</div>
        </div>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
