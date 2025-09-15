<script setup>
defineProps({
  title: String
})
</script>

<!--    
  - props 定制标题
  - 默认插槽 default 定制内容主体
  - 具名插槽 extra  定制头部右侧额外的按钮
-->

<template>
  <el-card class="page-container">
    <!-- 标题栏 -->
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <slot name="extra"></slot>
      </div>
    </template>

    <!-- 内容 -->
    <!-- 默认插槽 -->
    <slot>The default, 内容将由父组件提供</slot>
  </el-card>
</template>

<style lang="scss">
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
