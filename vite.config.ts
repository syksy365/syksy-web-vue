import { URL, fileURLToPath } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }: ConfigEnv): UserConfig => {
    const env = loadEnv(mode, process.cwd())
    // eslint-disable-next-line no-console
    console.log({ command, mode, isSsrBuild, isPreview, ...env })
    const launchEditor = env.VITE_EDITOR || process.env.EDITOR || 'code' as any
    return {
        plugins: [
            vue(),
            vueJsx(),
            vueDevTools({
                launchEditor,
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: '@import "@/styles/utils.scss";',
                },
            },
        },
        server: {
            host: true,
            proxy: {
                '/api': {
                    target: 'http://localhost:8849/qz/api/',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ''),
                },
            },
        },
    }
})
