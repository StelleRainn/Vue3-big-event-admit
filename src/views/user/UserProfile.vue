<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { userUpdateUserInfoService } from '@/api/user'

const userStore = useUserStore()
const isLoading = ref(false)

// 表单引用
const formRef = ref()

// 表单数据
const formData = ref({
  id: userStore.user.id,
  username: userStore.user.username, // 登录名称，禁用状态
  nickname: userStore.user.nickname,
  email: userStore.user.email
})

// 自定义邮箱校验函数
const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入邮箱地址'))
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      callback(new Error('请输入正确的邮箱格式'))
    } else {
      callback()
    }
  }
}

// 表单校验规则
const rules = ref({
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      min: 2,
      max: 10,
      message: '昵称长度必须在2-10个字符之间',
      trigger: 'blur'
    },
    {
      pattern: /\S/,
      message: '昵称不能为空字符串',
      trigger: 'blur'
    }
  ],
  email: [{ required: true, validator: validateEmail, trigger: 'blur' }]
})

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    isLoading.value = true
    // 校验通过，处理提交逻辑
    await userUpdateUserInfoService(formData.value)
    ElMessage.success('提交成功！')
    // 通知 user 仓库更新
    userStore.getUser()
    isLoading.value = false
  } catch (error) {
    console.log('校验失败:', error)
    ElMessage.error('请检查表单内容')
  }
}

// 如果需要对外暴露方法
defineExpose({
  submitForm,
  formData
})
</script>

<template>
  <PageContainer title="用户资料">
    <div class="user-form-container">
      <el-form
        v-loading="isLoading"
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
        class="user-form"
      >
        <!-- 第一行：登录名称（禁用） -->
        <el-form-item label="登录名称" prop="username">
          <el-input v-model="formData.username" disabled placeholder="登录名称" />
        </el-form-item>

        <!-- 第二行：用户昵称（可输入，带校验） -->
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入用户昵称" clearable />
        </el-form-item>

        <!-- 第三行：用户邮箱（可输入，带校验） -->
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="formData.email" placeholder="请输入用户邮箱" clearable />
        </el-form-item>

        <!-- 第四行：提交按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm"> 提交修改 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </PageContainer>
</template>

<style scoped>
.user-form-container {
  max-width: 500px;
  /* margin: 20px auto; */
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #fff;
}

.user-form {
  width: 100%;
}

.el-form-item:last-child {
  margin-bottom: 0;
  text-align: center;
}

.el-button + .el-button {
  margin-left: 10px;
}
</style>
