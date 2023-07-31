<script setup lang="ts">
import {onUnmounted, reactive, ref, watch} from "vue";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";
import {ElNotification} from "element-plus";
import {getAllUrlParams} from "@/utils";
import {getCaptcha, getCaptchaStatus} from "@/api/user";

const form = reactive({
    username: '',
    password: '',
    captcha: ''
})

const loginForm = ref(null)

const userStore = useUserStore()
const router = useRouter()

const handleClickLogin = () => {
    loginForm.value.validate().then(() => {
        userStore.storeLogin(form).then((res) => {
            // 登录成功
            if (res.status === 'ok') {
                if (getAllUrlParams().redirect) {
                    router.push(getAllUrlParams().redirect)
                } else {
                    router.push('/')
                }
                // 登录失败
            } else if (res.status === 'error') {
                ElNotification({
                    title: '登录出了问题',
                    message: res.message,
                    type: 'error'
                })
            }
        }).catch(() => {
            ElNotification({
                title: '登录出了问题',
                message: '登录失败,请检查网络',
                type: 'error'
            })
            return false
        })

    }).catch(() => {
        ElNotification({
            title: '请填写完整',
            message: '请检查输入',
            type: 'error'
        })
        return false
    })
}

const url = ref<any>(null)
//是否过期了
const isExpired = ref<any>(false)
const captchaTimer = ref<any>(null)
const captchaFn = () => {
    getCaptcha().then((res) => {
        //显示照片
        let blob = new Blob([res], {type: 'image/png'})
        url.value = URL.createObjectURL(blob)
        //倒计时
        isExpired.value = false
        if (captchaTimer.value) clearTimeout(captchaTimer.value)
        captchaTimer.value = setTimeout(() => {
            isExpired.value = true
        }, captchaStatus.value.effectiveTime * 1000)
    })
}

onUnmounted(() => {
    if (captchaTimer.value) clearTimeout(captchaTimer.value)
})

const captchaStatus = ref<any>(null)
/**
 * {
 *     "success": true,
 *     "data": {
 *         "enable": true,
 *         "effectiveTime": 30
 *     },
 */
const getCaptchaStatusFn = () => {
    getCaptchaStatus().then(res => {
        if (res.success) captchaStatus.value = res.data
    })
}

watch(captchaStatus, (newVal) => {
    if (newVal) {
        if (newVal.enable) {
            captchaFn()
        }
    }
})

getCaptchaStatusFn()

const rules = ref({
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
    ],
    captcha: [
        {required: true, message: '请输入验证码', trigger: 'blur'},
        {min: 4, max: 4, message: '长度为 4 个字符', trigger: 'blur'}
    ]
})

</script>

<template>
    <div class="login-box">

        <div class="login-inner">
            <el-form :model="form" :rules="rules" size="large" ref="loginForm" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" @keydown.enter="handleClickLogin"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input show-password v-model="form.password" @keydown.enter="handleClickLogin"></el-input>
                </el-form-item>
                <el-form-item v-if="captchaStatus && captchaStatus.enable" label="验证码" prop="captcha">
                    <div class="captcha-box">
                        <el-input v-model="form.captcha" @keydown.enter="handleClickLogin"></el-input>
                        <img v-if="!isExpired" class="captcha" @click="captchaFn" :src="url" alt="captcha"/>
                        <span v-if="isExpired" class="captcha-text" @click="captchaFn">验证码过期了点击刷新</span>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleClickLogin">登录</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<style lang="less" scoped>

.login-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #e5e5e5;

  .login-inner {
    width: 500px;
    height: 500px;
    background-color: #fff;
    padding: 20px;

    .captcha-box {
      width: 100%;
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
        color: #409EFF;
        text-align: center;

      }
    }


  }
}
</style>