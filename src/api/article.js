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
export const artGetArticleListService = ({ pagenum, pagesize, cate_id, state }) =>
  request.get('/my/article/list', {
    params: {
      pagenum,
      pagesize,
      cate_id,
      state
    }
  })

// 文章管理-发布文章
// 参数类型：multi-part/form-data
export const artPublishArticleService = (data) => request.post('/my/article/add', data)

// 文章管理-获取文章详情
export const artGetArticleDetailService = (id) => request.get('/my/article/info', { params: { id } })

// 文章管理-更新文章详情
// multipart/form-data
export const artUpdateArticleService = (data) => request.put('/my/article/info', data)

// 文章管理-删除文章
// Query
export const artDeleteArticleService = (id) => request.delete('/my/article/info', { params: { id } })
