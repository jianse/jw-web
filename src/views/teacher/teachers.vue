<template>
    <div style="margin: 10px">
        <div>
            <el-form :inline="true">
                <el-form-item>
                    <el-cascader filterable
                                 :change-on-select="true"
                                 :show-all-levels="false"
                                 :props="{
                             value:'id',
                             label:'name',
                             children:'children',
                             }"
                                 expand-trigger="hover"
                                 :options="options"
                                 @change="handleChange">
                    </el-cascader>
                </el-form-item>

                <el-form-item>
                    <el-input v-model="qO.keyword">

                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="fetchTableData" type="primary">
                        <i class="el-icon-search"></i>
                        查找
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success"
                               @click="newDialogVisible=true">
                        <i class="el-icon-plus"></i>
                        新建
                    </el-button>
                </el-form-item>
            </el-form>
        </div>


        <div>

            <ul style="list-style: none;padding: 0">
                
                <li>
                    <div>
                        <el-table border v-loading="loading"
                                  ref="multipleTable"
                                  :data="teacherTableData"
                                  tooltip-effect="dark"
                                  style="width: 100%">
                            <el-table-column prop="no" label="教师编号" width="150">
                            </el-table-column>

                            <el-table-column prop="name" label="教师名" width="250">
                            </el-table-column>

                            <el-table-column prop="gender" label="性别" width="150">
                            </el-table-column>

                            <el-table-column prop="age" label="年龄" width="150">
                            </el-table-column>

                            <el-table-column prop="department" label="所属学院" width="200">
                            </el-table-column>

                            <el-table-column prop="education" label="学历" width="200">
                            </el-table-column>

                            <el-table-column prop="title" label="职称" width="200">
                                <template slot-scope="scope">

                                        <el-tag v-for="{id,name,description} in scope.row.title"
                                                type="warning"
                                                disable-transitions
                                                style="margin-right: 10px">
                                            {{name}}
                                        </el-tag>


                                </template>
                            </el-table-column>

                        </el-table>
                    </div>
                </li>
                <li>
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-pagination background
                                       layout="->,prev, pager, next"
                                       :total="total"
                                       :page-size="pageInfo.pageSize"
                                       :current-page.sync="pageInfo.pageNum"
                                       @current-change="onPageChange">
                        </el-pagination>
                    </div>
                </li>

            </ul>
        </div>
        <div>
            <el-dialog title="添加教师"
                       width="26%"
                       :visible.sync="newDialogVisible"
                       @close="onNewDialogClose"
                       v-if="newDialogVisible">
                <div>
                    <el-form ref="newTeacherForm"
                             label-width="20%"
                             status-icon
                             :model="newFormData"
                             :rules="newFormRoles"
                             style="margin:0 10px 0 0  ;padding-bottom: 0">

                        <el-form-item label="教师号" prop="no">
                            <el-input v-model="newFormData.no" type="text" >

                            </el-input>
                        </el-form-item>

                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="newFormData.name" type="text" >

                            </el-input>
                        </el-form-item>

                        <el-form-item label="所属部门" prop="depSelected">
                            <el-cascader filterable
                                         :change-on-select="true"
                                         :show-all-levels="false"
                                         :props="{
                                             value:'id',
                                             label:'name',
                                             children:'children',
                                             }"
                                         expand-trigger="hover"
                                         :options="options"
                                         v-model="newFormData.depSelected"
                                         @change="newTeaDeptChange"
                                         style="width: 100%">
                            </el-cascader>
                        </el-form-item>

                        <el-form-item label="性别" prop="gender">
                            <el-select v-model="newFormData.gender" placeholder="请选择" style="width:100%">
                                <el-option value="男">
                                    男
                                </el-option>
                                <el-option value="女">
                                    女
                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="年龄" prop="age">
                            <el-input type="text" v-model="newFormData.age">

                            </el-input>
                        </el-form-item>

                        <el-form-item label="学历" prop="education">
                            <el-input type="text" v-model="newFormData.education">

                            </el-input>
                        </el-form-item>

                        <el-form-item label="职称" prop="title" >
                            <el-select v-model="newFormData.title" multiple placeholder="请选择" style="width: 100%">
                                <el-option
                                        v-for="item in titleOptions"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="newDialogVisible=false">取 消</el-button>
                    <el-button type="primary" @click="onNewDialogOk" >确 定</el-button>
                </div>

            </el-dialog>
        </div>
    </div>


</template>
<script>
    export default {
        name: "Teachers",

        data() {
            let validTNO=(rule,value,callback)=>{
                this.axios({
                    url:'/teacher/exist',
                    method:'post',
                    data:value,
                }).then((res)=>{
                    if(res.data.data){
                        callback(new Error("该教师号已经存在，请检查后再试！"));
                    }else {
                        callback();
                    }
                }).catch(()=>{
                    callback(new Error("系统或网络错误！"));
                })
            };
            return {
                newTeaDeptSelection:[],
                titleOptions:[],
                newFormData:{

                },
                newFormRoles:{
                    no:[
                        {required:true,message:'请输入教师号',trigger:'blur'},
                    ],
                    depSelected:[
                        {required: true,trigger:'blur',type:'array'},
                    ],
                    name: [
                        {required:true,message:'请输入姓名',trigger:'blur'},
                    ],
                },
                newDialogVisible:false,
                loading:true,
                total:null,
                pageInfo:{
                    pageNum:1,
                    pageSize:10
                },
                qO:{
                    keyword:'',
                },
                options: [],
                teacherTableData: [],
            };

        },
        mounted(){
            this.fetchCurrentGrade();
            this.fetchTableData();
            this.fetchCascaderData();
            this.fetchTitleData();
        },
        methods:{
            mConfirm(confirmBoxConf,axiosConf,okCallback,msgConf) {
                this.$confirm(confirmBoxConf.message,confirmBoxConf.title,{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:confirmBoxConf.type
                }).then(()=>{
                    this.mRemote(axiosConf,okCallback,msgConf)
                }).catch((error)=>{

                });
            },
            mSubmit(ref,axiosConf,okCallback,msgConf){
                this.$refs[ref].validate((valid)=>{
                    if(valid){
                        this.mRemote(axiosConf,okCallback,msgConf)
                    }
                });
            },
            mRemote(axiosConf,okCallback,msgConf){
                //{okMsg:{title,message},failMsg:{title,message},errorMsg:{title,message}}
                this.axios(axiosConf).then((res)=>{
                    if(res.data.status==100){
                        if(msgConf.okMsg.enable){
                            this.$notify({
                                title:msgConf.okMsg.title,
                                message:msgConf.okMsg.message,
                                type:'success',
                                position: 'bottom-right',
                            });
                        }
                        okCallback(res.data.data)
                    }else {
                        if(msgConf.failMsg.enable) {
                            this.$notify({
                                title: msgConf.failMsg.title,
                                message: msgConf.failMsg.message,
                                type: 'warning',
                                position: 'bottom-right',
                            });
                        }
                    }
                }).catch((error)=>{
                    if(msgConf.errorMsg.enable) {
                        this.$notify({
                            title: msgConf.errorMsg.title,
                            message: msgConf.errorMsg.message,
                            type: 'error',
                            position: 'bottom-right',
                        });
                    }
                });
            },
            fetchCurrentGrade(){
                this.mRemote({
                    url:'/grade/current',
                    method:'get'
                },(res)=>{
                    this.currentGrade=res;
                    this.qO.gradeId = res.id;
                },{
                    okMsg:{
                        enable:false,
                    },
                    failMsg:{
                        enable:false,
                    },
                    errorMsg:{
                        enable:false,
                    },
                })
            },
            fetchCascaderData(){
                this.mRemote({
                    url:'/department',
                    method:'get'
                },(res)=>{
                    this.options=res;
                    //this.qO.gradeId = res.id;
                },{
                    okMsg:{
                        enable:false,
                    },
                    failMsg:{
                        enable:false,
                    },
                    errorMsg:{
                        enable:false,
                    },
                })
            },
            refreshTable(){
                this.loading=true;
                this.axios({
                    url:'',
                    method:'get',
                    params:{
                        'pageNum':this.pageInfo.pageNum,
                        'pageSize':this.pageInfo.pageSize,
                        'keyword':this.keyword,
                    }
                }).then((response)=>{
                    let data = response.data.data;
                    //console.log(data);
                    this.teacherTableData = data.list;
                    this.total = data.total;
                }).catch((error)=>{
                    alert(error);
                });
                this.loading = false;
            },
            onPageChange(){
                this.fetchCourseData();
            },
            fetchCourseData(){
                this.axios({
                    url:'',
                    method:'get',
                    data:this.pageInfo
                }).then((res)=>{
                    this.teacherTableData=res.data.data.list;
                    this.total = res.data.data.total;
                })
            },
            fetchTableData(){
                this.loading =true;
                this.mRemote({
                    url:'/teacher',
                    method:'get',
                    params: {
                        keyword:this.qO.keyword,
                        deptId:this.qO.deptId,
                        pageNum:this.pageInfo.pageNum,
                        pageSize:this.pageInfo.pageSize
                    }
                },(res)=>{
                    // console.log(res);
                    this.teacherTableData=res.list;
                    this.total=res.total;
                    this.loading = false;
                },{
                    okMsg:{
                        enable:false
                    },
                    failMsg:{
                        enable:false
                    },
                    errorMsg:{
                        enable:false
                    }
                });
            },
            handleChange(arg){
                setTimeout(()=>{
                    //console.log(arg);
                    this.qO.deptId=arg[arg.length-1];
                    //console.log(this.qO.deptId);
                    //console.log(this.selectedOptions);
                    //部门层级选择
                    this.fetchTableData();
                },500);

            },
            fetchTitleData(){
                this.mRemote({
                    url:'/teacherTitle',
                    method:'get',
                },(res)=>{
                    //console.log(res);
                    this.titleOptions=res;
                },{
                    okMsg:{
                        enable:false
                    },
                    failMsg:{
                        enable:false
                    },
                    errorMsg:{
                        enable:false
                    }
                });

            },
            onNewDialogOk(){
                console.log(this.newFormData);
                this.mSubmit('newTeacherForm',
                    {
                        url:'/teacher',
                        method:'post',
                        data:this.newFormData,
                    },(res)=>{
                        this.newDialogVisible=false;
                    },{
                    okMsg:{
                        enable:true,
                        title:'成功',
                        message:'',
                    },
                    failMsg:{
                        enable:true,
                        title:'失败',
                        message:'',
                    },
                    errorMsg:{
                        enable:true,
                        title:'出错',
                        message:'',
                    }
                    })
            },
            onNewDialogClose(){
                this.$refs['newTeacherForm'].resetFields();
            },
            newTeaDeptChange(arg){
                this.newFormData.depId=arg[arg.length-1];
            },

        }

    }
</script>

<style scoped>

</style>