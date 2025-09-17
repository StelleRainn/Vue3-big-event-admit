<script setup>
import { ElMessage } from 'element-plus'
import request from '@/utils/request'
import { useUserStore } from '@/stores'
import router from '@/router'
import { artGetChannelsService } from '@/api/article'
import { userGetUserInfoService } from '@/api/user'

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

const addToken = () => {
  const userStore = useUserStore()
  userStore.setToken(
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OTUxLCJ1c2VybmFtZSI6Imxhb2xpNjY2NiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJpYXQiOjE2NTQ2OTg0ODAsImV4cCI6MTY1NDczNDQ4MH0.fGX3kR-HWE5sk3HFXB7R4LXkmHKnqcP3bQKtKqejyfo'
  )
  ElMessage.success('Added. 自动跳转到首页')
  router.push('/')
}

const delToken = () => {
  const userStore = useUserStore()
  userStore.removeToken()
  ElMessage.success('Removed. 请手动刷新页面')
}

const getUserInfo = async () => {
  const res = await userGetUserInfoService()
  console.log(res)
}

const getCategory = async () => {
  const res = await artGetChannelsService()
  console.log(res)
}
</script>

<template>
  <hr />
  <h3>Below is the test demo</h3>
  <el-button :plain="true" @click="testElMessage"> 测试 ElMessage 样式 </el-button>
  <el-button :plain="true" @click="testRequest"> 测试接口 </el-button>
  <el-button :plain="true" @click="addToken"> 添加 token </el-button>
  <el-button :plain="true" @click="delToken"> 删除 token </el-button>
  <el-button :plain="true" @click="getUserInfo"> 获取用户的基本信息 </el-button>
  <el-button :plain="true" @click="getCategory"> 获取文章分类 </el-button>
</template>
