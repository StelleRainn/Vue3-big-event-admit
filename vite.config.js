import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// Element-Plus 插件
// 只需要在这里配置一次，之后在组件中不需要导入（特指Template）即可使用样式
// 同时，@/components/ 下的组件也会被自动注册，可以直接使用而不需要额外的导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 根据部署环境动态设置base路径
  // 开发环境和Vercel使用根路径，GitHub Pages需要仓库名前缀
  base: '/'
})
