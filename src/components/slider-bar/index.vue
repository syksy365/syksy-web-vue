<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { usePermissionStore } from '@/stores/permission'

const route = useRoute()
const router = useRouter()
const permissionStore = usePermissionStore()
console.log({
    route,
    router,
})
</script>

<template>
    <div class="flex flex-col">
        <div v-for="item in permissionStore.use_sidebar_r" :key="item.path">
            <div>
                name: {{ item.name }}
            </div>
            <div>
                path: {{ item.path }}
            </div>
            <div class="pl-3">
                <div v-for="child in item.children" :key="child.path">
                    <div>
                        name: {{ child.name }}
                    </div>
                    <div>
                        path: {{ child.path }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
