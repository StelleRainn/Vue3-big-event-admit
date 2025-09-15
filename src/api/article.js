import request from '@/utils/request'

// 获取文章列表
export const artGetChannelsService = () =>
  request.get('https://big-event-vue-api-t.itheima.net/my/cate/list')
