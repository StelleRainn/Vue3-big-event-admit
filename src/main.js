import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/main.scss'

import router from './router'
import pinia from '@/stores/index' // 令 pinia 被独立维护，而不是堆在 main.js 中

// 尽管对于ElementPlus我们选择按需自动引入，但存在部分样式可能不生效的问题
// （2025-09-14 20:56:49 v2.11.2, macOS 26, Chrome-140.0.7339.133（正式版本） (arm64)）
// 故于此导入全部样式
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
