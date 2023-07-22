<script setup lang="ts">
import {login} from "@/api/user";
import {reactive, ref} from "vue";

const form = reactive({
    username: '',
    password: ''
})

const loginForm = ref(null)

const handleClickLogin = () => {
    loginForm.value.validate().then(() => {
        login(form).then(res => {
            //登录
        })
    }).catch(() => {
        console.log('error submit!!')
        return false
    })
}

const rules = ref({
    username: [
        {required: true, message: '请输入用户名', trigger: 'blur'},
        {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
    ],
    password: [
        {required: true, message: '请输入密码', trigger: 'blur'},
        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
    ]
})

</script>

<template>
    <div class="login-box">

        <div class="login-inner">
            <el-form :model="form" :rules="rules" ref="loginForm" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" @keydown.enter="handleClickLogin"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" @keydown.enter="handleClickLogin"></el-input>
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
    width: 400px;
    height: 400px;
    background-color: #fff;
    padding: 20px;
  }
}
</style>