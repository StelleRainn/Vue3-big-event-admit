import { createRouter, createWebHistory } from 'vue-router'

/**
 * 1. cearteRouter 创建路由对象实例
 * 2. 配置 history 模式：
 *   2.1 history 模式： createWebHistory → 地址栏不带#号
 *   2.2 hash模式：createHashHistory → 地址栏带#号
 * 3. routes 和之前的Vue2一样，该怎么配就怎么配置
 * 4. 在组件中，基于Vue3 composition API，不用 this.$router 或 this.$route：
 *   4.1 获取路由对象 useRouter()
 *   const router = useRouter()
 *   4.2 获取路由参数 useRoute()
 *   const route = useRoute()
 *   从而，可以执行 router.push() 等操作。
 *
 * 5. createWebHistory中的参数，代表访问的路由路径的前缀
 *     import.meta.env.BASE_URL 是 vite 中的一个特殊环境变量，可以在 vite.config.js 中通过配置 base 配置
 *     更多可以查阅官网
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})

export default router
