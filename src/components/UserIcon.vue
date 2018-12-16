<template>
    <div id="user_icon">
        <el-dropdown trigger="click" @command="select">
            <div class="el-dropdown-link">
                <span >
                    <img height="30" width="30"  src="../../public/headIcon.jpeg">
                    <span style="font-size: 22px ;text-align:center">
                        {{username}}
                    </span>
                </span>
            </div>

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="showInfo">
                    个人信息
                </el-dropdown-item>
                <el-dropdown-item command="changePass">
                    修改密码
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                    退出登录
                </el-dropdown-item>

            </el-dropdown-menu>

        </el-dropdown>
        <span >

        </span>
    </div>

</template>

<script>
    export default {
        name: "UserIcon",
        data() {
            return {
                headIcon:'../../public/headIcon.jpeg',
                username: '',
            };
        },
        mounted(){
            this.axios({
                method: 'get',
                url:'/user/name/'+window.localStorage.getItem("currentUser_name")
            }).then( (response) => {
                //console.log(response.data);
                this.username = response.data.data.username;
            }).catch( (error) => {
                alert(error);
            });
        },
        methods : {
            select(command){
                switch (command) {
                    case 'showInfo':

                        break;
                    case 'changePass':
                        break;
                    case 'logout':
                        this.$store.dispatch('users/logout',{'router':this.$router});
                        break;
                }
            }
        }
    }
</script>

<style scoped>

</style>