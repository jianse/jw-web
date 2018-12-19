<template>
    <el-container style="height:100%;">
        <el-aside  width="260px" style="height: 100%;background-color: #545c64 ;">
            <el-menu :default-openeds="defaultOpened"
                     @select="select"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     style="padding-right: 1px"
                        >
                <el-submenu  v-for="pmenu in menuList" :index="pmenu.id.toString()" >
                    <template slot="title">
                        <i :class="pmenu.icon"></i>{{pmenu.name}}</template>
                        <el-menu-item
                                v-for="smenu in pmenu.children"
                                :index="smenu.id.toString()">
                            <i :class="smenu.icon" ></i>
                            {{smenu.name}}
                        </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>

        <el-container style="height: 100%">
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <div>
                        <span>
                            <img alt="hi" width="22" height="22" src="../../../public/headIcon.jpeg"/>
                        </span>
                        <span>
                            <i class="el-icon-setting" style="margin:0 3px 0 3px;"></i>
                        </span>

                        <span>{{username}}</span>
                    </div>

                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </el-header>

            <el-main style="background-color: rgb(233,234,236);">
                <el-breadcrumb style="margin: 10px 0 22px 0">
                    <el-breadcrumb-item to="/base/welcome"><i class="fas fa-home"></i>Home</el-breadcrumb-item>
                    <el-breadcrumb-item v-for="item in breadcrumbData" :to="item.url" :key="item.id">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
                <el-card  shadow="hover">
                    <router-view>
                    </router-view>
                </el-card>

            </el-main>
        </el-container>
    </el-container>
</template>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }

    .fa,.fas  {
        vertical-align: middle;
        margin-right: 5px;
        width: 24px;
        text-align: center;
        font-size: 18px;
    }
</style>

<script>
    export default {
        name: "Base",
        data() {
            return {
                username: '王小虎',
                userHeadIconUrl:'',
                breadcrumbData:[],
                menuList:[],
                menuSub:[],
                defaultOpened:['1']
            }
        },mounted(){
            this.axios({
                url:'user/name/'+window.localStorage.getItem("currentUser_name"),
                method:'get',
            }).then((response)=>{
                this.username = response.data.data.username;
            });
            this.axios({
                url:'/menu/',
                method:'get'
            }).then((response)=>{
                this.menuList=response.data.data;
                // console.log(response.data.data);
                for(let i in this.menuList){
                    for(let j in this.menuList[i].children){
                        this.menuSub.push(this.menuList[i].children[j]);
                    }
                }
            }).catch((error)=>{
                alert(error);
            })
        },
        methods:{
            select(e){
                var filterMenus = this.menuSub.filter((menu)=>{
                    return (menu.url!=null && menu.url!=''&& menu.id == e)
                });
                this.$router.push(filterMenus[0].url);
                this.breadcrumbData.splice(0,1,filterMenus[0]);
            },
        }
    };
</script>
