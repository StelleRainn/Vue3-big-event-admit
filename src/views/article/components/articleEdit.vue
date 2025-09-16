<script setup>
import channelSelect from './channelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
const visibleDrawer = ref(false)

const defaultForm = {
  id: '',
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}

// 为 表单校验 & 数据收集做准备
const formModel = ref({
  ...defaultForm
})

const open = (row) => {
  visibleDrawer.value = true
  if (row.id) {
    // 通过 row 取得的数据不完备，需要根据其id发起请求，拿到详细数据以「回显」
    console.log(row.id)
  } else {
    console.log('Adding new article')
    formModel.value = { ...defaultForm }
  }
}

// 图片上传
const imageUrl = ref()
const onUploadFile = (uploadfile) => {
  // console.log(uploadfile) // on-change 属性可以传参 uploadfile
  // 其中的raw为我们需要的信息
  // URL.ceateObjectURL为新方法，后续补充说明
  // 立即将图片信息保存到 formModel对应字段 中
  imageUrl.value = URL.createObjectURL(uploadfile.raw)
  formModel.value.cover_img = uploadfile.raw
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="visibleDrawer" :title="formModel.id ? '编辑文章' : '添加文章'" direction="rtl" size="45%">
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channelSelect v-model="formModel.cate_id" style="width: 100%"></channelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <!-- el-upload 各种属性可以查看官网，这里取消了自动上传和格式校验等api，添加onchange事件 -->
        <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false" :on-change="onUploadFile">
          <!-- imageUrl 控制是显示预览图片还是 “待上传” 的 + 符号 -->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">富文本编辑器</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">发布</el-button>
        <el-button type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
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
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
