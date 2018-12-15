<template>
<Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
    <FormItem prop="userName" >
        <Input v-model="formLogin.userName" type="text" placeholder="用户名" >
            <Icon type="ios-person-outline" slot="prepend" ></Icon>
        </Input>
    </FormItem>
    <FormItem prop="password">
        <Input v-model="formLogin.password" type="password" placeholder="密码" >
            <Icon type="ios-locked-outline" slot="prepend"></Icon></Input>
    </FormItem>
    <FormItem>
        <Button type="primary" @click="login('formLogin')" style="width: 250px">登录</Button>

    </FormItem>
</Form>
</template>

<script>
    export default {
        name: "LoginForm",
        data() {
            return {
                code:null,
                formLogin:{
                    userName: null,
                    password: null
                },
                ruleLogin: {
                    userName: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                    ]
                }
            };
        },
        methods:{
            login(formLogin){
                this.$refs[formLogin].validate((valid) => {
                    if(valid){
                        //this.$store.dispatch('users/userLogin',{"user_name":this.formLogin.userName,"user_password":this.formLogin.password,"router":this.$router});
                    }
                });
            },
            register(){
                this.$router.push({path:'/register'});
            }
        }
    }
</script>

<style scoped>

</style>