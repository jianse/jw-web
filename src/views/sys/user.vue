<template>
        <div style="margin: 10px">
            <div>
                <el-row :gutter="5">
                    <el-col :span="12">
                        <el-input v-model="loginName"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-button type="primary">
                            <i class="el-icon-search"></i>
                            <span>查找</span></el-button>
                    </el-col>
                </el-row>
            </div>
            <div>

                <ul style="list-style: none;padding: 0">
                    <li>
                        <el-button type="primary" icon="el-icon-plus" @click="newModal=true">新建</el-button>
                        <el-button type="success" icon="el-icon-edit">修改</el-button>
                        <el-button type="danger" icon="el-icon-delete">删除</el-button>
                    </li>
                    <li>
                        <div>
                            <el-table border :data="tableData">
                                <el-table-column
                                        v-for="{ align,width,type ,prop, label } in colConfigs"
                                        :type="type"
                                        :key="prop"
                                        :prop="prop"
                                        :label="label"
                                        :width="width"
                                        :align="align?align:'center'">
                                </el-table-column>
                                <el-table-column align="center" width="150" label="操作">
                                    <template slot-scope="scope" >
                                        <el-button
                                                size="mini"
                                                type="info"
                                        >配置角色</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </li>
                    <li>
                        <div>
                            <el-pagination
                                    layout="prev, pager, next,jumper"
                                    :total="total" :page-size="pageInfo.pageSize">
                            </el-pagination>
                        </div>
                    </li>
                </ul>
            </div>

            <!--添加dialog-->
            <div>
                <el-dialog title="添加用户" :visible.sync="newModal" @close="newUser">
                    <el-form ref="newUserForm" status-icon :model="newUserForm" :rules="newUserRules">

                        <el-form-item label="用户名">
                            <el-input v-model="newUserForm.username" auto-complete="off">

                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="newUserForm.password" auto-complete="off">

                            </el-input>
                        </el-form-item>
                        <el-form-item label="确认密码">
                            <el-input v-model="newUserForm.confirmPass" auto-complete="off">

                            </el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="newUserForm.email" auto-complete="off">

                            </el-input>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input v-model="newUserForm.tel" auto-complete="off">

                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="newModal = false">取 消</el-button>
                        <el-button type="primary" @click="newModal = false">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>

</template>

<script>
    export default {
        name: "User",
        data() {
            return{
                /*用于查找的登录名*/
                loginName:null,
                /*选择的数量*/
                count:null,
                /*选中的组数据*/
                groupId:null,
                /*新建modal的显示参数*/
                newModal:false,
                /*修改modal的显示参数*/
                modifyModal:false,
                /*角色配置modal的显示参数*/
                roleModal:false,
                total:50,
                pageInfo:{
                    pageSize:10,
                },
                colConfigs:[{
                        type: 'selection',
                        width: 40,
                        align: 'center'
                    },
                    {
                        width:80,
                        prop:'id',
                        label:'用户id',
                    }
                    ,
                    {
                        width:150,
                        prop:'username',
                        label:'登录名',
                    }
                    ,
                    {
                        width:240,
                        prop:'email',
                        label:'E-mail',
                    }
                    ,
                    {
                        width:150,
                        prop:'moble',
                        label:'联系电话',
                    }
                    ,
                    {
                        width:240,
                        prop:'genTime',
                        label:'创建时间',
                    }
                    ,
                    {
                        prop:'loginTime',
                        label:'登录时间',
                    }
                    ,
                    {
                        width:240,
                        prop:'lastLoginTime',
                        label:'上次登录时间',
                    }
                    ,
                    {
                        width:80,
                        prop:'count',
                        label:'登录次数',
                    },
                ],
                tableData:[],
                newUserForm:{
                    username:'',
                    password:'',
                    confirmPass:'',
                    email:'',
                    tel:'',
                },
                newUserRules:{
                    username:[
                        {required:true,message:'请填写用户名',trigger:'blur'},

                    ],
                    password:[
                        {required:true,message:'请填写密码',trigger:'blur'},

                    ]
                }

            }
        },
        mounted(){
            this.axios({
                url:'/user/all',
                method:'get',
            }).then((response)=>{
                this.tableData = response.data.data;
            }).catch((error)=>{
                alert(error);
            })
        },
        methods:{
            initPageInfo(){

            },
            newUser(){
                this.$refs[newUserForm].validate((valid)=>{

                });
                console.log(this.newUserForm);
            }
        }
    }
</script>

<style scoped>

</style>