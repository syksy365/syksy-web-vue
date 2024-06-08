/// <reference types="vite/client" />
declare module '*.vue' {
    import type { defineComponent } from 'vue'

    const Component: ReturnType<typeof defineComponent>
    export default Component
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
    readonly VITE_API_BASE_URL: string
}
