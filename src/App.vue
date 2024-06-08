<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'

// 引入element-plus的语言包
import * as ElLocales from 'element-plus/es/locale/index'
import { computed } from 'vue'
import { elLocale, toHump } from '@/utils'

const elLang = computed(() => {
    return ElLocales[Object.keys(ElLocales).find(item => item.toLocaleLowerCase() === toHump(elLocale.value).toLocaleLowerCase()) || 'zhCn']
})
</script>

<template>
    <ElConfigProvider :locale="elLang">
        <router-view />
    </ElConfigProvider>
</template>
