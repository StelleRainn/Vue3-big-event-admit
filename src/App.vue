<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <div>
    <!-- Config-Provider 全局配置，修改组件中的默认语言为中文  -->
    <el-config-provider :locale="zhCn">
      <!-- App.vue 只需保留一个路由出口 -->
      <router-view></router-view>
      <TestDemo></TestDemo>
    </el-config-provider>
  </div>
</template>

<style scoped></style>
