<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { Plus, Upload } from '@element-plus/icons-vue'
import { userUpadteAvatarService } from '@/api/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const isLoading = ref(false)
const imageUrl = ref(userStore.user.user_pic)
const uploadRef = ref()
const onFileUpload = (uploadFile) => {
  // 图片预览
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // 为了符合服务器的需求，需要将图片转换为 base64 格式
  const reader = new FileReader()
  reader.readAsDataURL(uploadFile.raw)
  reader.onload = () => {
    imageUrl.value = reader.result
    console.log(imageUrl.value)
  }
}

const onUpdateAvatar = async () => {
  isLoading.value = true
  await userUpadteAvatarService(imageUrl.value)
  // await userStore.getUser()
  ElMessage.success('上传头像成功')
  isLoading.value = false
}
</script>

<template>
  <PageContainer title="用户头像" v-loading="isLoading">
    <el-upload
      ref="uploadRef"
      class="avatar-uploader"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="onFileUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <div class="button-group">
      <!-- 通过给 el-upload 绑定ref，el-button 在点击时可以触发其“选择图片功能” -->
      <!-- $el 可以选中绑定的 DOM元素，然后可以向下选中其中的元素，input则是因为实际在浏览器中渲染如此 -->
      <!-- 最后加上点击事件，就相当于点击了 上传图片 整个大元素 -->
      <el-button @click="uploadRef.$el.querySelector('input').click()" size="large" type="primary" :icon="Plus">
        选择图片
      </el-button>
      <el-button @click="onUpdateAvatar" size="large" type="success" :icon="Upload">上传图片</el-button>
    </div>
  </PageContainer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
.button-group {
  width: 278px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
