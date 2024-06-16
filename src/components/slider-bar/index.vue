<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { type SidebarItem, usePermissionStore } from '@/stores/permission'

const route = useRoute()
const router = useRouter()
const permissionStore = usePermissionStore()
function gotoRouter(child: SidebarItem) {
    if (!child.isRoute)
        return
    router.push(child.path)
}
</script>

<template>
    <div class="flex flex-col h-full gap-1 bg-gray-100  select-none">
        <div
            v-for="item in permissionStore.use_sidebar_r" :key="item.path"
            class="bg-gray-300 py-3 rounded-xl"
            @click="gotoRouter(item)"
        >
            <div class="px-2">
                name: {{ item.name }}
            </div>
            <div class="px-2">
                path: {{ item.path }}
            </div>
            <div>
                <div
                    v-for="child in item.children" :key="child.path" class="hover:bg-blue-400 my-2 px-4 py-2 rounded-r-xl cursor-pointer"
                    :class="child.path === route.path ? 'bg-blue-500' : 'bg-blue-300'"
                    @click="gotoRouter(child)"
                >
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
