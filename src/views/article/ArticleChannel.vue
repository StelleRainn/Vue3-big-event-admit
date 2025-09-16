<script setup>
import { artDelChannelsService, artGetChannelsService } from '@/api/article'
import { ref, onMounted } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import channelEdit from './components/channelEdit.vue'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'

const isLoading = ref(false)

// 获取列表数据，存储到channelList当中
const channelList = ref([])
const getChannelList = async () => {
  isLoading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  isLoading.value = false
}
onMounted(() => {
  getChannelList()
})

// 操作 → 绑定编辑弹框
const dialog = ref(null)

// 添加分类 → 不需要传参
const addChannel = () => {
  dialog.value.open({})
}

// 编辑 & 删除 → 需要获取列表信息
const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = async (row) => {
  ElMessageBox.confirm('你确定要删除吗？', '温馨提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await artDelChannelsService(row.id)
  ElMessage.success('已删除')
  reloadChannelList()
}

const reloadChannelList = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="addChannel"> 添加分类 </el-button>
    </template>

    <el-table v-loading="isLoading" :data="channelList" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <!--通过 slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
        <template #default="scope">
          <el-button @click="onEditChannel(scope.row)" type="primary" :icon="Edit" circle plain></el-button>
          <el-button @click="onDelChannel(scope.row)" type="danger" :icon="Delete" circle plain></el-button>
        </template>
      </el-table-column>
      <!-- 无数据样式 -->
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <channelEdit ref="dialog" @operationSuccess="reloadChannelList"></channelEdit>
  </page-container>
</template>
