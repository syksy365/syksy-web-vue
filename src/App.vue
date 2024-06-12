<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'

// 引入element-plus的语言包
import * as ElLocales from 'element-plus/es/locale/index'
import { computed } from 'vue'
import { elLocale, toHump } from '@/utils'

const elLang = computed(() => {
    return ElLocales[toHump(elLocale.value) as keyof typeof ElLocales] || ElLocales.zhCn
})
</script>

<template>
    <ElConfigProvider :locale="elLang">
        <router-view />
    </ElConfigProvider>
</template>
