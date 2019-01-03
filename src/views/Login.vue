<template>
    <div style="height: 100%" class="back" :style="back"
        >
        <el-row type="flex" justify="center" align="middle" style="padding-top: 260px;background-color: transparent" >
            <el-col :span="4" :lg="4" :xl="4" :sm="10">
                <el-card shadow="hover" class="box-card" >
                    <div slot="header" class="clearfix">
                        <span>登录</span>
                    </div>
                    <el-form ref="formLogin" status-icon :model="formLogin" :rules="rules" label-width="25%" style="margin-right: 10px">
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
    </div>


</template>

<script lang="ts">
export default {
    name: 'LoginForm',
    data() {
        return {
            back:{
              backgroundImage: 'url('+require('../../public/login_back.jpg')+')',
              backgroundRepeat: "no-repeat",
              backgroundSize: " auto",
            },
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
                     var message= this.$store.dispatch('users/userLogin', {user_name: this.formLogin.username, user_password: this.formLogin.password, router: this.$router});
                     console.log(message);
                     message.catch((e)=>{
                       console.log(e);
                     });
                     if(message=='登录失败！'){
                        this.$message({
                         showClose: true,
                         message: '登录失败，请检查您的用户名或密码！',
                         type: 'error'
                        });
                     }

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