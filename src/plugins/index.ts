import type { App } from 'vue'

interface Module {
    (app: App): void
}

const modules = import.meta.glob<Module>('./**/*.ts', { eager: true, import: 'default' })

export function setupPlugins(app: App): void {
    Object.values(modules).forEach((install) => {
        install(app)
    })
}

export default setupPlugins
