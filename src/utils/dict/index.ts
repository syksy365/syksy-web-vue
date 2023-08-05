import { ref, toRefs } from 'vue'
import { useUserStore } from '@/stores/dict'

/**
 * 获取字典数据
 */
export function useDict(...args: string[]) {
    const res = ref<any>({})
    return (() => {
        args.forEach((dictType, index) => {
            res.value[dictType] = []
            const dicts = useUserStore().storeGetDict(dictType)
            if (dicts) {
                res.value[dictType] = dicts
            }
            else {
                // TODO: 没看明白是哪个接口 明天问问

            }
        })
        return toRefs(res.value)
    })()
}
