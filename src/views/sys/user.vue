<template>
        <div style="margin: 10px">
            <div>
                <el-row :gutter="5">

                    <el-col :span="8">
                        <el-input v-model="keyword" label="用户名"  placeholder="请输入内容"></el-input>
                    </el-col>
                    <el-col :span="5">
                        <el-button type="primary"  @click="refreshTable()">
                            <i class="el-icon-search"></i>
                            <span>查找</span></el-button>
                    </el-col>
                </el-row>
            </div>
            <div>

                <ul style="list-style: none;padding: 0">
                    <li style="margin: 8px 0 22px 0">
                        <el-button type="primary" icon="el-icon-plus" @click="newDialogVisible=true">新建</el-button>
                        <el-button type="success" icon="el-icon-edit" @click="modifyButtonClick" :disabled="modifyButtonDisable">修改</el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="deleteSelected" :disabled="deleteDisable">删除</el-button>
                        <el-button type="info" icon="el-icon-refresh"  @click="refreshTable">刷新</el-button>
                    </li>
                    <li>
                        <div>
                            <el-table ref="dataTable" border :data="tableData" v-loading="loading" @selection-change="tableSelectChange">
                                <el-table-column
                                        v-for="{ align,width,type ,prop, label } in colConfigs"
                                        :type="type"
                                        :key="prop"
                                        :prop="prop"
                                        :label="label"
                                        :width="width"
                                        :align="align?align:'center'">
                                </el-table-column>
                                <el-table-column align="center" width="200" label="操作">


                                    <template slot-scope="scope" >
                                        <!--配置角色按钮-->
                                        <el-tooltip class="item" effect="dark" content="配置角色" placement="top">
                                            <el-button size="mini"
                                                    type="info"
                                                    @click="onRoleSetButtonClick(scope.$index,tableData)"
                                                    circle>
                                                <i class="fas fa-users-cog"></i>
                                            </el-button>
                                        </el-tooltip>

                                        <el-tooltip class="item" effect="dark" content="重置密码" placement="top">
                                            <el-button size="mini"
                                                       type="warning"
                                                       @click="resetPass(scope.$index,tableData)"
                                                       circle>
                                                <i class="fas fa-keyboard"></i>
                                            </el-button>
                                        </el-tooltip>

                                        <el-tooltip class="item" effect="dark" content="删除用户" placement="top">
                                            <el-button
                                                    size="mini"
                                                    type="danger"
                                                    icon="el-icon-delete"
                                                    @click="deleteUser(scope.$index,tableData)"
                                                    circle>
                                            </el-button>
                                        </el-tooltip>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </li>
                    <li style="margin-top:12px">
                        <div>
                            <el-pagination background
                                           layout="->,prev, pager, next,jumper"
                                           :total="total" @current-change="refreshTable()"
                                           :current-page.sync="pageInfo.pageNum"
                                           :page-size="pageInfo.pageSize">
                            </el-pagination>
                        </div>
                    </li>
                </ul>
            </div>

            <!--添加dialog-->
            <div>
                <el-dialog title="添加用户"
                           width="26%"
                           :visible.sync="newDialogVisible"
                           @opened="onNewDialogOpened"
                           v-if="newDialogVisible">
                    <div style="margin: 0 10px 0 0">
                        <el-form ref="newUserForm"
                                 label-width="20%"
                                 status-icon :model="newUserForm"
                                 :rules="newUserRules">

                            <el-form-item label="用户名" prop="username">
                                <el-input v-model="newUserForm.username" placeholder="请输入用户名" auto-complete="off">

                                </el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="newUserForm.password" placeholder="请输入密码" auto-complete="off">

                                </el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="confirmPass">
                                <el-input type="password" v-model="newUserForm.confirmPass" placeholder="确认密码" auto-complete="off">

                                </el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input type="email" v-model="newUserForm.email" placeholder="eg. xxx@163.com" auto-complete="off">

                                </el-input>
                            </el-form-item>
                            <el-form-item label="电话" prop="tel">
                                <el-input v-model="newUserForm.tel" placeholder="请输入您的电话号码" auto-complete="off">

                                </el-input>
                            </el-form-item>
                        </el-form>

                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="newDialogCancel">取 消</el-button>
                        <el-button type="primary" :disabled="newDialogOkButtonDisable" @click="newDialogOk">确 定</el-button>
                    </div>
                </el-dialog>
            </div>

            <!-- 修改dialog -->
            <div>
                <el-dialog title="修改用户"
                           width="26%"
                           :visible.sync="modifyDialogVisible"
                           @open="onModifyDialogOpen"
                           @opened="onModifyDialogOpen"
                           v-if="modifyDialogVisible">
                    <el-form ref="modifyUserForm" status-icon :model="modifyUserForm"
                             label-width="20%"
                             :rules="modifyUserRules">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="modifyUserForm.username" auto-complete="off">

                            </el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input :type="showPass?'text':'password'" v-model="modifyUserForm.password" auto-complete="off">

                            </el-input>
                            <el-checkbox v-model="showPass" align="right">
                                显示密码
                            </el-checkbox>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="modifyUserForm.email" auto-complete="off">

                            </el-input>
                        </el-form-item>
                        <el-form-item label="电话" prop="moble">
                            <el-input v-model="modifyUserForm.moble" auto-complete="off">

                            </el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="modifyDialogVisible =false">取 消</el-button>
                        <el-button type="primary" @click="modifyOk">确 定</el-button>
                    </div>
                </el-dialog>
            </div>

            <!-- 配置角色 -->
            <div>
                <el-dialog title="角色配置"
                           width="28%"
                           :visible.sync="roleConfigDialogVisible"
                           v-if="roleConfigDialogVisible">
                    <el-table ref="roleTable" border :data="roleTableData" @selection-change="onRoleTableSelectionChange">
                        <el-table-column width="50" align="center">
                            <template scope="scope">
                                <el-radio :label="scope.row.id"
                                          v-model="templateRadio"
                                          >&nbsp;
                                </el-radio>
                            </template>
                        </el-table-column>

                        <el-table-column
                                v-for="{ align,width,type ,prop, label } in roleTableColConfigs"
                                :type="type"
                                :key="prop"
                                :prop="prop"
                                :label="label"
                                :width="width"
                                :align="align?align:'center'">
                        </el-table-column>
                    </el-table>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="roleConfigDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="onRoleConfigDialogOK">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>

</template>

<script>
    export default {
        name: "User",
        data() {
            var confPass = (rule,value,callback)=>{
                if(value === ''){
                    callback(new Error('请再次输入密码'));
                }else if(value !== this.newUserForm.password){
                    callback(new Error('两次输入的密码不一致！'));
                }else {
                    callback();
                }
            };
            return{
                keyword:'',
                /*用于查找的登录名*/
                loginName:null,
                /*选择的数量*/
                count:null,
                /*选中的组数据*/
                groupId:null,
                /*新建modal的显示参数*/
                newDialogVisible:false,
                newDialogOkButtonDisable:false,
                /*修改modal的显示参数*/
                modifyDialogVisible:false,
                modifyButtonDisable :true,

                deleteDisable:true,
                /*角色配置modal的显示参数*/
                roleConfigDialogVisible:false,
                roleModal:false,
                total:0,
                pageInfo:{
                    pageNum:1,
                    pageSize:10,
                },
                colConfigs:[
                    {
                        type: 'selection',
                        width: 50,
                        align: 'center'
                    },
                    {
                        width:100,
                        prop:'id',
                        label:'用户id',
                    },
                    {
                        width:150,
                        prop:'username',
                        label:'登录名',
                    },
                    {

                        prop:'email',
                        label:'E-mail',
                    },
                    {
                        width:150,
                        prop:'moble',
                        label:'联系电话',
                    },
                    {
                        width:200,
                        prop:'genTime',
                        label:'创建时间',
                    },
                    {
                        width:160,
                        prop:'loginTime',
                        label:'登录时间',
                    },
                    {
                        width:200,
                        prop:'lastLoginTime',
                        label:'上次登录时间',
                    },
                    {
                        width:80,
                        prop:'count',
                        label:'登录次数',
                    },
                ],
                tableData:[],
                loading:true,
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

                    ],
                    confirmPass:[
                        {validator:confPass,trigger:'blur'},
                    ]
                },
                showPass:false,
                modifyUserForm:{

                },
                modifyUserRules:{

                },
                roleTableColConfigs:[
                    {
                        width:80,
                        prop:'id',
                        label:'ID'
                    },
                    {   width:150,
                        prop :'role',
                        label :'角色名称'
                    },
                    {
                        prop :'descp',
                        label :'角色描述'
                    }

                ],
                roleTableData:[{

                }],
                user:{
                    username:null,
                    password:null,
                    email: null,
                    moble: null,
                },
                selectedRow:[],
                selectedRoleRow:[],
                templateRadio:'',
                currentRow:{},
            }
        },
        mounted(){
            this.refreshTable();
        },
        methods:{
            deleteConfirmed(ids){
                this.$confirm('此操作将永久删除用户，是否继续?','警告',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    this.axios({
                        url:'/user',
                        method:'delete',
                        data:ids
                    }).then((response)=>{
                        if (response.data.status==100) {
                            this.$notify({
                                title:'删除成功！',
                                message:response.data.message,
                                type:'success',
                                position: 'bottom-right',
                            });
                        }else {
                            this.$notify({
                                title:'删除失败！',
                                message:response.data.message,
                                type:'error',
                                position: 'bottom-right',
                            });
                        }
                    }).catch((error)=>{
                        this.$notify({
                            title:'删除失败！',
                            message:'操作中遇到异常请与管理员联系解决',
                            type:'error',
                            position: 'bottom-right',
                        });
                    });
                    this.refreshTable();
                }).catch(()=>{
                    this.$notify({
                        title:'取消删除！',
                        message:'已取消删除',
                        type:'info',
                        position: 'bottom-right',
                    });
                })


            },
            deleteSelected(){
                let ids=[];
                for(let i in this.selectedRow){
                    ids.push(this.selectedRow[i].id);
                }
                this.deleteConfirmed(ids);
            },
            deleteUser(index,tableData){
                this.deleteConfirmed([tableData[index].id]);
            },
            tableSelectChange(selection){
                //console.log(selection);
                this.selectedRow = selection;
                if(selection.length>0)
                {
                    this.deleteDisable = false;
                    this.modifyButtonDisable = selection.length > 1;
                }else {
                    this.modifyButtonDisable =true;
                    this.deleteDisable = true;
                }
            },
            onRoleSetButtonClick(index, tableData){
                this.currentRow = tableData[index];
                this.axios({
                    url:'/role',
                    method:'get'
                }).then((res)=>{
                    //console.log(res.data);
                    this.roleTableData =res.data.data;
                }).catch((error)=>{
                    console.log(error);
                });
                this.axios({
                    url:'/user/role/'+tableData[index].id,
                    method:'get',

                }).then((res)=>{
                    let selected=res.data.data;
                    let rows;
                    if(selected.length){
                        rows=this.roleTableData.filter((row)=>{
                            let sr=selected.filter((selectedRow)=>{
                                return selectedRow.id!=row.id;
                            });
                            return !sr.length;
                        });
                    }
                    if (rows) {
                        rows.forEach(row => {
                            this.templateRadio=row.id;
                        });
                    }
                }).catch((error)=>{
                    console.log(error);
                });
                this.roleConfigDialogVisible =true;

            },
            refreshTable(){
                this.loading=true;
                this.axios({
                    url:'/user/page',
                    method:'get',
                    params:{
                        'pageNum':this.pageInfo.pageNum,
                        'pageSize':this.pageInfo.pageSize,
                        'keyword':this.keyword,
                    }
                }).then((response)=>{
                    let data = response.data.data;
                    //console.log(data);
                    this.tableData = data.list;
                    this.total = data.total;
                }).catch((error)=>{
                    alert(error);
                });
                this.loading = false;
            },
            initUser(data){
                this.user.username = data.username;
                this.user.password = data.password;
                this.user.email = data.email;
                this.user.moble = data.tel;
            },
            onNewDialogOpened(){
                this.$refs['newUserForm'].resetFields();
            },
            newDialogOk(){
                this.newDialogOkButtonDisable = true;
                this.$refs['newUserForm'].validate((valid) =>{
                    if(valid){
                        this.initUser(this.newUserForm);
                        this.axios({
                            url:'/user',
                            method:'post',
                            data: this.user,
                        }).then((response) => {
                            if(response.data.status==100){
                                this.$notify({
                                    title:'添加成功！',
                                    message:response.data.message,
                                    type:'success',
                                    position: 'bottom-right',
                                });
                                this.newDialogVisible = false;
                                this.newDialogOkButtonDisable = false;
                                this.refreshTable();
                                this.$refs['newUserForm'].resetFields();
                            }else {
                                this.$notify({
                                    title:'添加失败！',
                                    message:response.data.message,
                                    type:'warning',
                                    position: 'bottom-right',
                                });
                                this.newDialogOkButtonDisable = false;
                            }
                        }).catch((error)=>{
                            this.$notify({
                                title:'错误！',
                                message:'新建用户发生错误，请向管理员报告此错误。',
                                type:'error',
                                position: 'bottom-right',
                            });
                            this.newDialogOkButtonDisable = false;
                        });
                    }
                });
                //this.newDialogOkButtonDisable = false;
            },
            newDialogCancel(){
                this.$refs['newUserForm'].resetFields();
                this.newDialogVisible = false
            },
            onModifyDialogOpen(){
                this.modifyUserForm= this.selectedRow[0];
                console.log(this.modifyUserForm);
            },
            modifyButtonClick(){
                this.modifyDialogVisible=true;

            },
            modifyOk(){
                console.log(this.modifyUserForm);
                this.axios({
                    url:'/user/'+this.modifyUserForm.id,
                    method:'put',
                    data:this.modifyUserForm
                }).then((response)=>{
                    if(response.data.status==100){
                        this.$notify({
                            title:'修改成功！',
                            message:'修改用户信息成功',
                            type:'success',
                            position: 'bottom-right',
                        })
                    }else{
                        this.$notify({
                            title:'修改失败！',
                            message:response.data.message,
                            type:'warning',
                            position: 'bottom-right',
                        })
                    }
                }).catch((error)=>{
                    this.$notify({
                        title:'错误！',
                        message:'服务器遇到内部错误，请联系管理员解决。',
                        type:'error',
                        position: 'bottom-right',
                    })
                });
                this.modifyDialogVisible =false;
            },
            resetPass(index,tableData){
                console.log(index);
                console.log(tableData);
                this.$prompt('请输入密码', '重置密码', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputType:'password',
                    inputPattern:/[\w!#$%&'*+/=?^_`{|}~-]+/,
                    inputErrorMessage: '密码不正确'
                }).then(({ value }) => {
                    if(value!=null&&value!=''){
                        this.axios({
                            url:'/user/'+tableData[index].id,
                            method:'put',
                            data: {
                                password:value,
                            }
                        }).then((res)=>{
                            if(res.data.status==100){
                                this.$notify({
                                    title:'重置成功！',
                                    message:'重置用户密码成功！',
                                    type:'success',
                                    position: 'bottom-right',
                                });
                            }else {
                                this.$notify({
                                    title:'重置失败！',
                                    message:'重置用户密码失败！',
                                    type:'warning',
                                    position: 'bottom-right',
                                });
                            }
                        }).catch(()=>{
                            this.$notify({
                                title:'错误！',
                                message:'服务器遇到内部错误，请通知管理员解决！',
                                type:'error',
                                position: 'bottom-right',
                            });
                        });
                    }
                }).catch(() => {
                    console.log('cancel');
                });
            },
            onRoleConfigDialogOK(){

                this.axios({
                    url:'user/role/'+this.currentRow.id,
                    method:'put',
                    params:{
                        roleId:this.templateRadio
                    }
                });
                this.roleConfigDialogVisible =false;
            },
            onRoleTableSelectionChange(selection){
                this.selectedRoleRow =selection.filter((row)=>{

                });
            }

        }
    }
    
</script>

<style scoped>
    .fa,.fas  {
        vertical-align: middle;
        margin:0;
        width: 13px;
        text-align: center;
        font-size: 12px;
    }
</style>