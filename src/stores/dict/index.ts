import { defineStore } from 'pinia'
import { ref } from 'vue'
import { isStrEmpty } from '@/utils'

export const useUserStore = defineStore('dict', () => {
    const dict = ref<Dict[]>([])

    const storeGetDict = (key: string): any => {
        if (isStrEmpty(key))
            return null

        return dict.value.find((item: any) => item.key === key)
    }

    const storeSetDict = (key: string, data: any): any => {
        if (isStrEmpty(key))
            return null

        const item = dict.value.find((item: any) => item.key === key)
        if (item) {
            item.data = data
        }
        else {
            dict.value.push({
                key,
                data,
            })
        }
    }

    const storeRemoveDict = (key: string): any => {
        if (isStrEmpty(key))
            return null

        const index = dict.value.findIndex((item: any) => item.key === key)
        if (index >= 0)
            dict.value.splice(index, 1)
    }

    const storeClearDict = (): any => {
        dict.value = []
    }

    return {
        dict, // 字典
        storeGetDict, // 获取字典
        storeSetDict, // 设置字典
        storeRemoveDict, // 删除字典
        storeClearDict, // 清空字典
    }
})

export interface Dict {
    key: string
    data: any
}
