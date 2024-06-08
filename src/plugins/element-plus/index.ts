import type { App } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

export default function install(app: App) {
    /** 注册 Element Plus */
    app.use(ElementPlus)

    /** 注册所有 Element Plus Icon */
    for (const [key, component] of Object.entries(ElementPlusIconsVue))
        app.component(key, component)
}
