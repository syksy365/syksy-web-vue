<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
console.log(route)
console.log(router)
console.log(router.options)
</script>

<template>
    <aside />
</template>

<style scoped>

</style>
