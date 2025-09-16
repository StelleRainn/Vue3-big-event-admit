import request from '@/utils/request'

// 获取文章列表
export const artGetChannelsService = () => request.get('my/cate/list')

// 更新文章分类
export const artUpdateChannelsService = (data) => console.log('Mock to PUT success', data)
// request.put('/my/cate/info', data)

// 增加文章分类
export const artAddChannelsService = (data) => console.log('Mock to POST success', data)
// request.post('/my/cate/add', data)
