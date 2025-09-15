import { useUserStore } from '@/stores'
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

// 注意使用异步加载语法时，单行箭头函数默认省略 return，如果被格式化插件换行，要手动添加 return 语句

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannel.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        }
      ]
    }
  ]
})

// 需求：只有登录页，可以未授权的时候访问，其他所有页面，都需要先登录再访问
// 导航守卫
// Every guard function receives two arguments:
// to: the target route location in a normalized format being navigated to.（到哪儿去）
// from: the current route location in a normalized format being navigated away from.(从哪儿来)

// 默认（不做任何配置）直接放行
// 根据返回值决定拦截或放行
// 返回值：
// 1. undefined / true 直接放行
// 2. false 拦回 from 的地址界面
// 3. 具体路径 或 路径对象 → 拦截到具体的地址，如 '/login' 或 { name: '/login' }
router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return { path: '/login' }
})

export default router
