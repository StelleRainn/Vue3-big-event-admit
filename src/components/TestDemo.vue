<script setup>
import { ElMessage } from 'element-plus'

const openError = () => {
  ElMessage({
    message: 'Oops, this is a error message.',
    type: 'error',
    plain: true
  })
}
</script>

<template>
  <h3>This is the test demo</h3>
  <el-button :plain="true" @click="openError">Open Error</el-button>
</template>
