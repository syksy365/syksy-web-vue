// 核心组件
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 插件
import { setupPlugins } from '@/plugins'

// 样式
import '@/styles/index.scss'

const app = createApp(App)

setupPlugins(app)

app.use(router)

app.mount('#app')
