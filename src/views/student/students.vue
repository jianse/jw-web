<template>
    <div>
        <el-form :inline="true">
            <el-form-item>
                <el-select :disabled="selectDisable"
                           v-model="qO.gradeId"
                           placeholder="请选择学年"
                           @change="onSelectChange"
                           style="width: 100%">
                    <el-option v-for="item in gradeSelectorData"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
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
                             v-model="selectedOptions"
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
                <el-button @click="onNewClick" type="success">
                    <i class="el-icon-plus"></i>
                    新建
                </el-button>
            </el-form-item>
        </el-form>
        <el-table border ref="multipleTable"
                  :data="studentTableData"
                  v-loading="loading"
                  tooltip-effect="dark"
                  style="width: 100%; margin-bottom: 10px"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center">
            </el-table-column>

            <el-table-column label="班级" align="center" prop="className">

            </el-table-column>

            <el-table-column sortable label="学生号" width="110" align="center" prop="no">

            </el-table-column>

            <el-table-column prop="studentName" label="姓名" align="center" width="250">
            </el-table-column>

            <el-table-column prop="studentGender" label="性别" align="center" width="150">
            </el-table-column>

            <el-table-column prop="studentAge" label="年龄" align="center" width="150">
            </el-table-column>

            <el-table-column prop="birth" label="出生日期" align="center" width="100">
            </el-table-column>

            <el-table-column prop="studentGrade" label="入学年份">
            </el-table-column>
            <el-table-column align="center" width="200" label="操作">
                <template slot-scope="scope" >
                    <el-tooltip class="item" effect="dark" content="修改" placement="top">
                        <el-button size="mini"
                                   type="success"
                                   @click="onInlineEditClick(scope.$index,studentTableData)"
                                   circle>
                            <i class="fas fa-edit"></i>
                        </el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                        <el-button size="mini"
                                   type="danger"
                                   icon="el-icon-delete"
                                   @click="onInlineDeleteClick(scope.$index,studentTableData)"
                                   circle>
                        </el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination background
                           layout="->,prev, pager, next"
                           :current-page.sync="pageInfo.pageNum"
                           @current-change="fetchTableData"
                           :total="total">
            </el-pagination>
        </div>

        <div>
            <el-dialog :title="isEdit?'修改学生信息':'添加学生'"
                       width="26%"
                       :visible.sync="DialogVisible"
                       @open="dialogOpenCallback"
                       @close="dialogCloseCallback"
                       v-if="DialogVisible">
                <div>
                    <el-form ref="Form"
                             label-width="20%"
                             status-icon
                             :model="FormData"
                             :rules="FormRules" style="margin:0 ;padding-bottom: 0">
                        <el-form-item label="学号" prop="no">
                            <el-input :disabled="isEdit" v-model="FormData.no" type="text" >

                            </el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="studentName">
                            <el-input v-model="FormData.studentName" type="text" >

                            </el-input>
                        </el-form-item>

                        <el-form-item label="年龄" prop="studentAge">
                            <el-input-number v-model="FormData.studentAge"
                                             :step="1"
                                             :precision="0"
                                             :max="100"
                                             :min="1"
                                             style="width:100%">

                            </el-input-number>
                        </el-form-item>


                        <el-form-item label="性别" prop="studentGender">
                            <el-select v-model="FormData.studentGender"
                                       placeholder="请选择"
                                       style="width: 100%">
                                <el-option :value="'男'"
                                           :label="'男'">

                                </el-option>
                                <el-option :value="'女'"
                                           :label="'女'">

                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="入学年" prop="gradeId">
                            <el-select v-model="FormData.gradeId">
                                <el-option v-for="item in gradeSelectorData" :value="item.id" :label="item.name">

                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="班级" prop="depSelected">
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
                                         v-model="FormData.depSelected"
                                         @change="onCascaderChange"
                                         style="width: 100%">
                            </el-cascader>
                        </el-form-item>

                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="()=>{DialogVisible=false;this.FormData={};}">取 消</el-button>
                    <el-button type="primary" @click="onDialogOk" >确 定</el-button>
                </div>

            </el-dialog>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Students",
        data(){
            return {
                isEdit:false,
                FormData:{},
                FormRules:{
                    no:[
                        {required:true,message:'请输入学号',trigger:'blur'}
                    ],
                    studentName:[
                        {required:true,message:'请输入姓名',trigger:'blur'}
                    ],

                },
                DialogVisible:false,
                pageInfo:{
                    pageNum:1,
                    pageSize:10,
                },
                total:null,
                studentTableData:
                    [
                        {
                            id:1,
                            no:'1608090101',
                            name:'曹安富',
                            gender:'男',
                            grade:'2016-9-1',
                            classId:1,
                            age:20,
                            birth:'1997-9-9',
                            className:'惠普测试161'
                        }

                    ],
                options:[],
                selectedOptions:[],
                gradeSelectorData:[],
                selectDisable:false,
                qO:{
                    keyword:'',
                    gradeId:1,
                    deptId:null,
                },
                loading:false,
                currentGrade:{},
            }
        },
        mounted(){
            this.fetchCurrentGrade();
            this.fetchGradeSelectorData();
            this.fetchCascaderData();
            this.fetchTableData();
        },
        methods:{
            onInlineDeleteClick(index,table){
                this.$confirm('此操作将永久删除该学生，是否继续?','警告',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    this.mRemote({
                        url:'/student/'+table[index].id,
                        method:'delete',
                    },(res)=>{

                    },{
                        okMsg:{
                            enable:true,
                            title:'成功'
                            ,message:'',
                        },
                        failMsg:{
                            enable:true,
                            title:'失败'
                            ,message:'',
                        },
                        errorMsg:{
                            enable:true,
                            title:'错误'
                            ,message:'',
                        },
                    })
                })
            },
            dialogCloseCallback(){
                this.FormData={};
                this.$refs['Form'].resetFields();
            },
            onInlineEditClick(index,table){
                console.log(table[index]);
                this.isEdit = true;
                this.DialogVisible =true;
                this.FormData = table[index];
            },
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
            fetchTableData(){
                this.loading =true;
                this.mRemote({
                    url:'/student',
                    method:'get',
                    params:{
                        pageNum: this.pageInfo.pageNum,
                        pageSize: this.pageInfo.pageSize,
                        keyword:this.qO.keyword,
                        deptId:this.qO.deptId,
                        gradeId:this.qO.gradeId,
                    }
                },(res)=>{
                    this.studentTableData=res.list;
                    this.total=res.total;
                    this.loading =false;
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
                })
            },
            fetchGradeSelectorData(){
                this.mRemote({
                    url:'/grade',
                    method:'get',
                },(res)=>{
                    //console.log(res);
                    this.gradeSelectorData=res;
                    //console.log(this.gradeSelectorData);
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
                })
            },
            onSelectChange(){
                //学年选择框
                this.fetchTableData();
            },
            handleChange(arg){
                //console.log(arg);
                this.qO.deptId=arg[arg.length-1];
                //console.log(this.qO.deptId);
                //console.log(this.selectedOptions);
                //部门层级选择
                this.fetchTableData();
            },
            handleSelectionChange(selection){
                //处理表单选中
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
            dialogOpenCallback(){
                if(!this.isEdit){
                    this.$refs['Form'].resetFields();
                }
            },
            onCascaderChange(arg){
                this.FormData.classId=arg[arg.length-1];
            },
            editOk(){
                this.$refs['Form'].validate((valid)=>{
                    if(valid){
                        console.log('edit ok');
                        //this.mRemote();
                        this.mRemote({
                            url:'/student/'+this.FormData.id,
                            method:'put',
                            data:this.FormData,
                        },(res)=>{
                            this.DialogVisible=false;
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
                                title:'错误',
                                message:'',
                            }
                        })
                    }
                })
            },
            createOk(){
                this.$refs['Form'].validate((valid)=>{
                    if(valid){
                        console.log('create ok');
                        //this.mRemote();
                        this.mRemote({
                            url:'/student',
                            method:'post',
                            data:this.FormData,
                        },(res)=>{
                            this.DialogVisible=false;
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
                                title:'错误',
                                message:'',
                            }
                        })
                    }
                })
            },
            onDialogOk(){
                this.isEdit?this.editOk():this.createOk();
            },
            onNewClick(){
                this.isEdit=false;
                this.DialogVisible=true;
            }
        }
    }
</script>

<style scoped>

</style>