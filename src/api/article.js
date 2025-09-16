import request from '@/utils/request'

// 文章分类-获取文章列表
export const artGetChannelsService = () => request.get('my/cate/list')

// 文章分类-更新文章分类
export const artUpdateChannelsService = (data) => request.put('/my/cate/info', data)

// 文章分类-增加文章分类
export const artAddChannelsService = (data) => request.post('/my/cate/add', data)

// 文章分类-删除文章分类
export const artDelChannelsService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章管理-获取文章列表
export const artGetArticleList = ({ pagenum, pagesize, cate_id, state }) =>
  request.get('/my/article/list', {
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })
