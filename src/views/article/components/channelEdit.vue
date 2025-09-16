<script setup>
import { ref } from 'vue'
import { artAddChannelsService, artUpdateChannelsService } from '@/api/article'
import { ElMessage } from 'element-plus'

/**
 * 由于article中，添加分类 & 编辑文章等操作都需要弹框，所以封装为「内部组件」article/components/channelEdit.vue
 * 组件对外暴露一个方法 open,  基于 open 的参数，初始化表单数据，并判断区分是添加 还是 编辑
 * 1. open({ })                   =>  添加操作，添加表单初始化无数据
 * 2. open({ id: xx,  ...  })  =>  编辑操作，编辑表单初始化需回显
 */
const dialogVisible = ref(false)
const open = (info) => {
  dialogVisible.value = true
  // console.log(info)
  formModel.value = { ...info }
}
defineExpose({
  open
})

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '请输入1-10位非空字符',
      trigger: 'change'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^[a-zA-z0-9]{1,15}$/,
      message: '请输入1-15位字母或数字',
      trigger: 'change'
    }
  ]
}

const form = ref(null)

// 更新文章分类 & 添加文章分类
const emit = defineEmits(['operationSuccess'])
const onConfirm = async () => {
  await form.value.validate()
  // formModel.value 为表单中的数据（包含id，这在上方 open 方法定义）
  // 而 form.value 是整个表单组件的实例对象
  console.log(formModel.value, form.value)
  ;(await formModel.value.id) ? artUpdateChannelsService(formModel.value) : artAddChannelsService(formModel.value)

  formModel.value.id ? ElMessage.success('编辑成功') : ElMessage.success('添加成功')

  dialogVisible.value = false
  emit('operationSuccess')
}
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.value ? '编辑文章' : '添加分类'" width="500">
    <el-form :model="formModel" :rules="rules" ref="form">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input placeholder="请输入分类名称" v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input placeholder="请输入分类别名" v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false"> 取消 </el-button>
        <el-button type="primary" @click="onConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
