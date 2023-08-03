import { type App } from 'vue'
import { createPinia } from 'pinia'

export default function install(app: App) {
    app.use(createPinia())
}
