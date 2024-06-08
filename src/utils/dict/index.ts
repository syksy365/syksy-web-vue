import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/dict'
import { getDictInfo } from '@/api/setting/dicItem'

/**
 * 获取字典数据
 */
export function useDict(...args: string[]) {
    const res = ref<any>({})
    return (() => {
        args.forEach((dictType, _index) => {
            res.value[dictType] = []
            const dicts = useUserStore().storeGetDict(dictType)
            if (dicts) {
                res.value[dictType] = dicts
                // 表示已经获取到了字典表
                res.value[dictType].isGetDict = true
            }
            else {
                getDictInfo(dictType).then((response: any) => {
                    res.value[dictType] = response.data
                    // 表示已经获取到了字典表
                    res.value[dictType].isGetDict = true
                    useUserStore().storeSetDict(dictType, response.data)
                })
            }
        })
        return toRefs(res.value)
    })()
}
