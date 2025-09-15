<script setup>
import { ElMessage } from 'element-plus'
import request from '@/utils/request'

const testElMessage = () => {
  ElMessage({
    message: '实例文字',
    type: 'success',
    plain: true
  })
}

const testRequest = async () => {
  await request.get('my/menus')
}
</script>

<template>
  <hr />
  <h3>Below is the test demo</h3>
  <el-button :plain="true" @click="testElMessage">
    测试 ElMessage 样式
  </el-button>
  <el-button :plain="true" @click="testRequest"> 测试接口 </el-button>
</template>
