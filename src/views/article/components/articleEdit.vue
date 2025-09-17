<script setup>
import channelSelect from './channelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artGetArticleDetailService, artPublishArticleService, artUpdateArticleService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request'
import { convertOnlineImageToFile } from '@/utils/convertImage'

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
const imageUrl = ref() // 图片预览 实例
const quillEditRef = ref() // 富文本编辑器 实例

// 打开抽屉（由父组件调用）
const open = async (row) => {
  visibleDrawer.value = true
  if (row.id) {
    // 通过 row 取得的数据不完备，需要根据其id发起请求，拿到详细数据以「回显」
    const res = await artGetArticleDetailService(row.id)
    formModel.value = res.data.data // 更新到最新的详细数据

    // 图片预览 需要单独管理，且需要自己拼接服务器地址（baseURL）
    imageUrl.value = baseURL + res.data.data.cover_img

    // 服务器为我们返回了一个地址，然而提交编辑时，我们需要上传一个 file 对象
    // 因而我们需要提供一个函数，将网络图片转换成 file 对象
    const imageFile = await convertOnlineImageToFile(imageUrl.value)
    formModel.value.cover_img = imageFile
  } else {
    formModel.value = { ...defaultForm }
  }
}

// 图片上传
const onUploadFile = (uploadfile) => {
  // console.log(uploadfile) // on-change 属性可以传参 uploadfile
  // 其中的raw为我们需要的信息
  // URL.ceateObjectURL为新方法，后续补充说明
  // 立即将图片信息保存到 formModel对应字段 中
  imageUrl.value = URL.createObjectURL(uploadfile.raw) //图片预览
  formModel.value.cover_img = uploadfile.raw // 存入到数据中
}

// 添加 / 编辑 文章
const emit = defineEmits(['success'])
const onPublish = async (state) => {
  formModel.value.state = state

  // 重点：需要封装成 form-data 格式提交给接口
  const fd = new FormData()
  // 遍历添加。注意不要漏了.value
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }

  // 如点击的是“添加文章”，则没有id，据此判断是添加文章还是编辑文章（见open函数）
  if (formModel.value.id) {
    await artUpdateArticleService(fd)
    ElMessage.success('已修改')
    visibleDrawer.value = false
    emit('success', 'edit')
  } else {
    await artPublishArticleService(fd)
    ElMessage.success('文章添加成功')
    visibleDrawer.value = false
    // 通知父组件，添加成功，跳转到对应页码
    emit('success', 'add')
    // 图片预览和富文本编辑器需手动重新置空
    // 虽然表单会自动重置（open方法），但建议顺手重置
    formModel.value = { ...defaultForm }
    imageUrl.value = ''
    quillEditRef.value.setHTML('') // 官网方法
  }
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
        <div class="editor">
          <QuillEditor ref="quillEditRef" theme="snow" v-model:content="formModel.content" content-type="html" />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
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

.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
