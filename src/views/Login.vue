<template>
    <el-row type="flex" justify="center" align="middle">
        <el-col :span="4" :lg="4" :xl="4" :sm="10">
            <el-card class="box-card">
                <el-form ref="formLogin" status-icon :model="formLogin" :rules="rules">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="formLogin.username">

                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="formLogin.password">

                        </el-input>
                    </el-form-item>
                    <el-form-item align="right">
                        <el-button type="primary" @click="login('formLogin')">立即登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-col>
    </el-row>

</template>

<script lang="ts">
export default {
    name: 'LoginForm',
    data() {
        return {
            code: null,
            formLogin: {
                username: null,
                password: null,
            },
            rules: {
                username: [
                    { required: true, message: '请填写用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请填写密码', trigger: 'blur' },
                ],
            },
        };
    },
    methods: {
        login(formLogin) {
            this.$refs[formLogin].validate((valid) => {
                 if (valid) {
                     // console.log(this);
                     this.$store.dispatch('users/userLogin', {user_name: this.formLogin.username, user_password: this.formLogin.password, router: this.$router});
                 }
             });
        },
        register() {
            // this.$router.push({path:'/register'});
        },
    },
};
</script>

<style scoped>

</style>