<script setup lang="ts">
import { onUnmounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { getAllUrlParams, notification } from '@/utils'
import { getCaptcha, getCaptchaStatus } from '@/api/user'

const form = reactive({
    username: '',
    password: '',
    captcha: '',
})

const { t } = useI18n()

const loginForm = ref<FormInstance | null>(null)

const userStore = useUserStore()
const router = useRouter()

async function handleClickLogin() {
    try {
        await loginForm.value?.validate()
    }
    catch (e) {
        return
    }

    try {
        const res = await userStore.storeLogin(form)
        const redirect = getAllUrlParams().redirect
        if (res.status !== 'ok') {
            throw new Error(res.message)
        }
        if (redirect)
            router.push(redirect)
        else
            router.push('/')
    }
    catch (e: any) {
        notification.error(e.message || t('error.msg.default'))
    }
}

const url = ref<any>(null)
// 是否过期了
const isExpired = ref(false)
const captchaTimer = ref<any>(null)
const captchaStatus = ref<any>(null)

// 测试cz
function captchaFn() {
    getCaptcha().then((res) => {
        // 显示照片
        const blob = new Blob([res], { type: 'image/png' })
        url.value = URL.createObjectURL(blob)
        // 倒计时
        isExpired.value = false
        if (captchaTimer.value)
            clearTimeout(captchaTimer.value)
        captchaTimer.value = setTimeout(() => {
            isExpired.value = true
        }, captchaStatus.value.effectiveTime * 1000)
    })
}

onUnmounted(() => {
    if (captchaTimer.value)
        clearTimeout(captchaTimer.value)
})

async function getCaptchaStatusFn() {
    const response = await getCaptchaStatus()
    response.success && (captchaStatus.value = response.data)
}

watch(captchaStatus, (newVal) => {
    if (newVal) {
        if (newVal.enable)
            captchaFn()
    }
})

getCaptchaStatusFn()

const rules = {
    username: [
        { required: true, message: t('error.login.username'), trigger: 'blur' },
        { min: 3, max: 10, message: t('error.validate.length.range', [3, 10]), trigger: 'blur' },
    ],
    password: [
        { required: true, message: t('error.login.password'), trigger: 'blur' },
        { min: 2, max: 20, message: t('error.validate.length.range', [6, 20]), trigger: 'blur' },
    ],
    captcha: [
        { required: true, message: t('error.login.captcha'), trigger: 'blur' },
        { min: 4, max: 4, message: t('error.validate.length.equal', [4]), trigger: 'blur' },
    ],
}
</script>

<template>
    <div class="login-box">
        <div class="login-inner">
            <el-form ref="loginForm" :model="form" :rules="rules" size="large" label-width="120px">
                <el-form-item :label="t('form.login.username')" prop="username">
                    <el-input
                        v-model="form.username"
                        :placeholder="t('form.placeholder.pleaseInputYour') + t('form.login.username')"
                        @keydown.enter="handleClickLogin"
                    />
                </el-form-item>
                <el-form-item :label="t('form.login.password')" prop="password">
                    <el-input
                        v-model="form.password"
                        :placeholder="t('form.placeholder.pleaseInputYour') + t('form.login.password')"
                        show-password @keydown.enter="handleClickLogin"
                    />
                </el-form-item>
                <el-form-item
                    v-if="captchaStatus && captchaStatus.enable" :label="t('form.login.captcha')"
                    prop="captcha"
                >
                    <div class="captcha-box">
                        <el-input
                            v-model="form.captcha"
                            :placeholder="t('form.placeholder.pleaseInput') + t('form.login.captcha')"
                            @keydown.enter="handleClickLogin"
                        />
                        <img v-if="!isExpired" class="captcha" :src="url" alt="captcha" @click="captchaFn">
                        <span
                            v-if="isExpired" class="captcha-text"
                            @click="captchaFn"
                        >{{ $t("form.login.captchaExpired") }}</span>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleClickLogin">
                        {{ $t("button.login") }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.login-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #e5e5e5;

    .login-inner {
        width: 500px;
        height: 500px;
        padding: 20px;
        background-color: #fff;

        .captcha-box {
            height: 100%;
            display: flex;
            justify-content: space-between;

            .captcha {
                margin-left: 4px;
                width: 150px;
                height: 40px;
                cursor: pointer;
            }

            .captcha-text {
                flex-shrink: 0;
                margin-left: 4px;
                width: 150px;
                height: 40px;
                cursor: pointer;
                text-align: center;
                color: #409eff;
            }
        }

    }
}
</style>
