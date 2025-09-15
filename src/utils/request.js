import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const isMock = true

const baseURL = isMock
  ? 'http://localhost:3000'
  : 'http://big-event-vue-api-t.itheima.net'

// 创建 axios 实例
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token

    // 数据在哪里用，就在哪里调
    // 一定要放在请求/响应拦截器里
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    ElMessage({
      message: '请求成功，等待响应结果中......',
      type: 'success',
      plain: true
    })
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 0) return res
    // TODO 3. 处理业务失败
    ElMessage({
      message: res.data.message || '响应异常',
      type: 'error',
      plain: true
    })
    return Promise.reject(res)
  },
  (err) => {
    // TODO 5. 处理401错误
    // 401错误：即“未授权”（Unauthorized）的HTTP状态码 → 可能是token过期或未登录，拦截到登录

    // 可选链运算符（?.） 用于访问对象的属性或调用函数。
    // 如果使用此运算符访问的对象或调用的函数是 undefined 或 null，
    // 则表达式会短路并计算为 undefined，而不是抛出错误。
    if (err.response?.status === 401) {
      const userStore = useUserStore()
      userStore.removeToken()
      router.push('/login')
    }

    // 其他错误 (502 Bad Gateway 等)
    ElMessage({
      message: err.message || 'Other Error',
      type: 'error',
      plain: true
    })
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
