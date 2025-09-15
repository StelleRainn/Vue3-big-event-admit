import request from '@/utils/request'

// 获取文章列表
export const artGetChannelsService = () => request.get('my/cate/list')
