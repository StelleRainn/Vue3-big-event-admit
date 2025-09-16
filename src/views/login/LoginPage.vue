<script setup>
import { userLoginService, userRegisterService } from '@/api/user'
import router from '@/router'
import { useUserStore } from '@/stores'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
const isRegister = ref(true)

// 切换 注册/登录 页时，重置表单
watch(isRegister, () => {
  ruleForm.value = {
    username: '',
    password: '',
    repassword: ''
  }
})

// 配置表单验证规则
const ruleForm = ref({
  username: '',
  password: '',
  repassword: ''
})

const rules = {
  // 非空校验、正则校验实例
  // message：提示消息
  // trigger：触发校验与提示的时机
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      pattern: /^[A-Z-a-z-0-9]{1,10}$/,
      message: '用户名长度为1-10位大小写字母和数字',
      trigger: 'change'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码为6-15位非空格字符',
      trigger: 'change'
    }
  ],
  /**
   * 自定义校验：自己写校验逻辑（校验函数）
   * validator: (rule, value, callback) {...}
   * rule: 当前校验规则的相关信息
   * value: 所校验的表单元素的值
   * callback: 无论成功或失败，都需要调用callback
   * - callback() 成功
   * - callback(new Error('错误信息')) 失败
   */
  repassword: [
    {
      validator: (rule, value, callback) => {
        if (value !== ruleForm.value.password) {
          callback(new Error('两次密码不一致'))
        } else {
          callback()
        }
      }
    }
  ]
}

// 注册
const form = ref(null)

const register = async () => {
  // 使用 ele ui - form 中的预校验
  await form.value.validate()
  // 使用 @api/user 下的注册API进行注册
  await userRegisterService(ruleForm.value)
  isRegister.value = false
}

// 登录
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(ruleForm.value)
  const userStore = useUserStore()
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功')
  router.push('/')
}
</script>

<!-- 有关 布局 的内容，可以查看 ELE 官网关于 Icon图标，Layout布局，Form表单组件的内容 -->
<!-- el-row 默认分24行；内嵌的组件 el-col 通过 :span 值来划分占比；:offset 表示列偏移值 -->
<!-- el-form 为表单组件；el-form-item 是单个表单域；在 el-input 中，通过 :prefix-icon 使用图标，图标需要 import 导入 -->
<!-- 通过 v-if & v-else 以及值 isRegister 判断与切换当前页面属于 登录还是注册-->

<!-- 校验相关内容 -->
<!-- el-form -> :model=ruleForm 绑定的整个form数据对象 {a, b, c, ..., n} -->
<!-- el-from -> :rules=rules    绑定的整个rules验证规则对象，与上一条一一对应 {a, b, c, ..., n} -->
<!-- 表单元素 -> v-model="ruleForm.xxx" 为表单元素绑定 form 的子属性  -->
<!-- el-form-item -> prop 配置生效的是哪个规则（与rules相对应） -->

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="form" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="ruleForm.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space> 注册 </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回 </el-link>
        </el-form-item>
      </el-form>

      <!-- 登录表单 -->
      <el-form :model="ruleForm" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space>登录 </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 → </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
