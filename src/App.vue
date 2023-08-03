<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'

// 将 Element Plus 的语言设置为中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <ElConfigProvider :lang="zhCn">
    <router-view />
  </ElConfigProvider>
</template>
