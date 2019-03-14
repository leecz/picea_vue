<template>
  <div>
    图表模板
    <div class="flex">
      <div class="tc" @click="$router.push({ name: 'chart_edit' })">
        <svg-icon name="fsux_zhifangtu" class="f-6"></svg-icon>
        <div>
          直方图
        </div>
      </div>
    </div>
  </div>
</template>
