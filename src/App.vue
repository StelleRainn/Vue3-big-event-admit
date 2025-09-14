<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import request from '@/utils/request'
import { ElMessage } from 'element-plus'

const router = useRouter()
const goHome = () => {
  router.push('/home')
}
const userStore = useUserStore()

const testRequester = async () => {
  ElMessage({
    message: '发送成功',
    type: 'success',
    plain: true
  })
  await request.get('my/menus')
}
</script>

<template>
  <div>
    This is the App.vue
    <el-button @click="goHome">Home</el-button>
    <RouterView></RouterView>
    {{ userStore.token }}
    <el-button @click="userStore.setToken('Bearer StelleRainn Rosa Mizukawa')">
      登录
    </el-button>
    <el-button @click="userStore.removeToken()">退出</el-button>
    <el-button @click="testRequester">测试接口</el-button>
    <TestDemo></TestDemo>
  </div>
</template>

<style scoped></style>
