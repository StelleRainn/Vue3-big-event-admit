<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article'

// 获取分类列表
const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  console.log(res.data)
}
getChannelList()

// v-model 绑定
const props = defineProps({
  modelValue: [String, Number]
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <!-- v-model 绑定，同样要拆开 :modelValue 和 @update:modelValue 事件 -->
  <el-select :modelValue="props.modelValue" @update:modelValue="emit('update:modelValue', $event)" style="width: 200px">
    <!-- label是给用户看的， value是实际提交的值 -->
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
