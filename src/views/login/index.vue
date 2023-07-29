<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { getAllUrlParams } from '@/utils'
import { getCaptcha } from '@/api/user'

const form = reactive({
    username: '',
    password: '',
})

const loginForm = ref(null)

const userStore = useUserStore()
const router = useRouter()

function handleClickLogin() {
    loginForm.value.validate().then(() => {
        userStore.storeLogin(form).then((res) => {
            // 登录成功
            if (res.status === 'ok') {
                if (getAllUrlParams().redirect)
                    router.push(getAllUrlParams().redirect)
                else
                    router.push('/')

                // 登录失败
            }
            else if (res.status === 'error') {
                ElNotification({
                    title: '登录出了问题',
                    message: res.message,
                    type: 'error',
                })
            }
        }).catch(() => {
            ElNotification({
                title: '登录出了问题',
                message: '登录失败,请检查网络',
                type: 'error',
            })
            return false
        })
    }).catch(() => {
        ElNotification({
            title: '请填写完整',
            message: '请检查输入',
            type: 'error',
        })
        return false
    })
}

const url = ref<any>(null)

function captcha() {
    getCaptcha().then((res) => {
        const blob = new Blob([res], { type: 'image/png' })
        url.value = URL.createObjectURL(blob)
    })
}

captcha()

const rules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
    ],
})
</script>

<template>
  <div class="login-box">
    <div class="login-inner">
      <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" @keydown.enter="handleClickLogin" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password @keydown.enter="handleClickLogin" />
        </el-form-item>
        <img :src="url">
        <el-form-item>
          <el-button type="primary" @click="handleClickLogin">
            登录
          </el-button>
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
    width: 400px;
    height: 400px;
    background-color: #fff;
    padding: 20px;
  }
}
</style>
