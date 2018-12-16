<template>
    <el-container>
        <el-header>
            <el-row >
                <el-col>
                    <el-menu :default-active="activeIndex" class="el-menu" mode="horizontal" @select="">
                        <el-menu-item index="4">
                            <user-icon >


                            </user-icon>
                         </el-menu-item>
                        <el-menu-item index="1">
                            分数查询
                        </el-menu-item>
                        <el-menu-item index="2">
                            课程查询
                        </el-menu-item>

                        <el-menu-item  index="3">
                            课程选修
                        </el-menu-item>


                    </el-menu>
                </el-col>
                <el-col align="right">

                </el-col>
            </el-row>

        </el-header>
        <el-main>

        </el-main>
    </el-container>
</template>

<script>
    import UserIcon from "../components/UserIcon";
    export default {
        name: "Student",
        components: {UserIcon},
        data(){
            return {
                activeIndex:'1',
                username:null,
                menuList:[],
                menuSub:[],
                breadcrumbData:[],
            }

        },
        mounted() {

        },
        methods:{
            select(e){
                 var filterMenus = this.menuSub.filter(function (menu) {
                     return(menu.url!=null&&menu.url!==''&&menu.id===e)
                 });
                this.$router.push(filterMenus[0].url);
                this.breadcrumbData.splice(0,1,filterMenus[0]);
            }



        }
    }
</script>

<style scoped>

</style>