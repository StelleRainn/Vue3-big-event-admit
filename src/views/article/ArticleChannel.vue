<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref, onMounted } from 'vue'

const channelList = ref([])

const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  console.log(channelList.value)
}
onMounted(() => {
  getChannelList()
})
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary"> 添加分类 </el-button>
    </template>
    文章分类内容
  </page-container>
</template>
