<script setup>
import PageContainer from '@/components/PageContainer.vue'
</script>
<template>
  <PageContainer title="Know Issues Documentation">
    <template #extra>
      <el-button type="primary">Report Issues</el-button>
    </template>
    <h3>Belows are the known issues that remain to fix.</h3>
    <p style="font-style: italic; color: #888; font-size: 14px; font-weight: bold">
      If you find any known issues, please report them to us. We will try to fix them as soon as possible.
    </p>
    <hr />
    <h4>Current Known Issues:</h4>
    <ul>
      <li>
        <p><strong>Issue:</strong> v-loading 配置异常</p>
        <p>
          <strong>Impact:</strong> 某些组件使用了 v-loading 实现用户友好的加载状态，但目前某些情况下，loading
          效果不会结束，导致用户无法进一步交互。
        </p>
        <p><strong>Workaround:</strong> 使用浏览器的刷新按钮刷新页面，可部分解决该问题。</p>
      </li>
    </ul>
  </PageContainer>
</template>
<style scoped lang="scss">
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;

  p {
    margin: 3px;
  }
}
</style>
