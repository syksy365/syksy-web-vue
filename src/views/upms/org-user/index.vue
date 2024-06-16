<script setup lang="ts">
import { ref } from 'vue'
import { useRequest } from 'vue-hooks-plus'
import { getOrgList, getOrgUser } from '@/api/org-user'
import type { PartialGetOrgUserParams } from '@/api/org-user'

const query_data_r = ref<PartialGetOrgUserParams>({
    username: '',
    email: '',
    phone: '',
    orgId: '',
    roleId: '',
    notRoleId: '',
    current: 1,
    pageSize: 10,
    sorter: '',
    filter: '',
})

const {
    data: org_list_r,
    loading: org_list_loading,
    run: orgListRun,
} = useRequest(() => getOrgList(), {
    formatResult: (data) => {
        return data.data
    },
})

const {
    data: org_user_list_r,
    loading: org_user_loading,
    run: orgUserRun,
} = useRequest(() => getOrgUser(query_data_r.value), {
    formatResult: (data) => {
        return data.data
    },
})
</script>

<template>
    <div class="flex">
        <div v-loading="org_list_loading" class="w-1/4">
            123
            <pre>
                {{ org_list_r }}
            </pre>
        </div>
        <div v-loading="org_user_loading" class="flex-1">
            <pre>
                {{ org_user_list_r }}
            </pre>
            <el-table :data="org_user_list_r?.data" border style="width: 100%">
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="email" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
            </el-table>
        </div>
    </div>
</template>

<style scoped>

</style>
