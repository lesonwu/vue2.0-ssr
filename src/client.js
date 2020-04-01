// client.js 客户端打包文件入口
import { createApp } from './main'
const { app, router } = createApp()
// 路由加载完成，将app的内容手动挂载到#app根目录
// 为什么是onReady？避免路由的一些异步操作或者延迟操作
router.onReady(() => {
  app.$mount('#app')
})
