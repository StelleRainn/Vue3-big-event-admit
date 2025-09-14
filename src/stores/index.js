import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

// 使 index 作为唯一出口，统一导出
// 通过该方法，任何组件调用 store 中的任何模块都只需要一行导入，即导入本 index 文件即可

// import { useUserStore } from './modules/user'
// export { useUserStore }
// 可直接写为：
export * from './modules/user'
