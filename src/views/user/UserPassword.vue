<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { userUpdatePasswordService } from '@/api/user'
import { useUserStore } from '@/stores'
import router from '@/router'

const userStore = useUserStore()

const isLoading = ref(false)

// 表单引用
const formRef = ref()

// 表单数据
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})

// 自定义校验：原密码和新密码不能一样
const validateNewPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入新密码'))
  } else if (value.length < 6 || value.length > 15) {
    callback(new Error('密码长度必须在6-15位之间'))
  } else if (!/\S/.test(value)) {
    callback(new Error('密码不能为空字符串'))
  } else if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不能与原密码相同'))
  } else {
    // 新密码校验通过后，重新校验确认密码
    if (pwdForm.value.re_pwd) {
      formRef.value.validateField('re_pwd')
    }
    callback()
  }
}

// 自定义校验：确认密码必须与新密码一致
const validateConfirmPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入确认密码'))
  } else if (value.length < 6 || value.length > 15) {
    callback(new Error('密码长度必须在6-15位之间'))
  } else if (!/\S/.test(value)) {
    callback(new Error('密码不能为空字符串'))
  } else if (value !== pwdForm.value.new_pwd) {
    callback(new Error('确认密码与新密码不一致'))
  } else {
    callback()
  }
}

// 自定义校验：原密码基础校验
const validateOldPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入原密码'))
  } else if (value.length < 6 || value.length > 15) {
    callback(new Error('密码长度必须在6-15位之间'))
  } else if (!/\S/.test(value)) {
    callback(new Error('密码不能为空字符串'))
  } else {
    // 原密码校验通过后，如果新密码有值，重新校验新密码
    if (pwdForm.value.new_pwd) {
      formRef.value.validateField('new_pwd')
    }
    callback()
  }
}

// 表单校验规则
const rules = reactive({
  old_pwd: [{ required: true, validator: validateOldPassword, trigger: 'blur' }],
  new_pwd: [{ required: true, validator: validateNewPassword, trigger: 'blur' }],
  re_pwd: [{ required: true, validator: validateConfirmPassword, trigger: 'blur' }]
})

// 提交表单
const submitForm = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    // 校验通过，处理提交逻辑
    isLoading.value = true
    await userUpdatePasswordService(pwdForm.value)
    isLoading.value = false
    ElMessage.success('密码修改成功！')
    // 成功后可以重置表单
    resetForm()
    // 需要清空 token 信息，重新登录
    userStore.setToken('')
    userStore.setUser({})
    router.push('/login')
  } catch (error) {
    console.log('校验失败:', error)
    ElMessage.error('请检查表单内容')
  }
}

// 重置表单
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}

// 如果需要对外暴露方法
defineExpose({
  submitForm,
  resetForm,
  pwdForm
})
</script>

<template>
  <PageContainer title="修改密码" v-loading="isLoading">
    <div class="password-form-container">
      <el-form ref="formRef" :model="pwdForm" :rules="rules" label-width="100px" class="password-form">
        <!-- 第一行：原密码 -->
        <el-form-item label="原密码" prop="old_pwd">
          <el-input v-model="pwdForm.old_pwd" type="password" placeholder="请输入原密码" show-password clearable />
        </el-form-item>

        <!-- 第二行：新密码 -->
        <el-form-item label="新密码" prop="new_pwd">
          <el-input v-model="pwdForm.new_pwd" type="password" placeholder="请输入新密码" show-password clearable />
        </el-form-item>

        <!-- 第三行：确认密码 -->
        <el-form-item label="确认密码" prop="re_pwd">
          <el-input v-model="pwdForm.re_pwd" type="password" placeholder="请再次输入新密码" show-password clearable />
        </el-form-item>

        <!-- 第四行：按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm"> 修改密码 </el-button>
          <el-button @click="resetForm"> 重置 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </PageContainer>
</template>

<style scoped>
.password-form-container {
  max-width: 500px;
  /* margin: 20px auto; */
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #fff;
}

.password-form {
  width: 100%;
}

.el-form-item:last-child {
  margin-bottom: 0;
  text-align: center;
}

.el-button + .el-button {
  margin-left: 10px;
}

/* 密码输入框样式优化 */
.el-input {
  width: 100%;
}

/* 表单项间距 */
.el-form-item {
  margin-bottom: 22px;
}
</style>
