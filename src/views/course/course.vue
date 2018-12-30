<template>
    <div style="margin: 10px">
        <div>
            <el-row :gutter="5" style="margin-bottom: 16px">
                <el-col :span="5">
                    <el-input v-model="searchKeyword"></el-input>
                </el-col>
                <el-col :span="19">
                    <el-button type="primary" @click="fetchCourseData">
                        <i class="el-icon-search"></i>
                        <span>查找</span>
                    </el-button>
                    <el-button type="primary" @click="()=>{newDialogVisible=true;isEdit=false;}">
                        <i class="el-icon-plus"></i>
                        新建
                    </el-button>
                    <el-button type="danger" :disabled="deleteButtonDisable" @click="onDeleteClick">
                        <i class="el-icon-delete"></i>
                        删除
                    </el-button>
                </el-col>
            </el-row>
        </div>

        <div>
            <ul style="list-style: none;padding: 0">
                <li>
                    <div>
                        <el-table border ref="multipleTable"
                                  :data="courseTableData"
                                  v-loading="loading"
                                  tooltip-effect="dark"
                                  style="width: 100%; margin-bottom: 10px"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="50" align="center">

                            </el-table-column>

                            <el-table-column sortable label="课程编号" width="110" align="center" prop="course.id">

                            </el-table-column>

                            <el-table-column prop="course.name" label="课程名称" align="center" width="250">
                            </el-table-column>

                            <el-table-column prop="course.point" label="学分" align="center" width="150">
                            </el-table-column>

                            <el-table-column prop="course.hour" label="学时" align="center" width="150">
                            </el-table-column>

                            <el-table-column prop="courseNature.name" label="课程性质" align="center" width="100">
                            </el-table-column>

                            <el-table-column prop="courseNature.required" label="必修" align="center" width="110">
                                <template slot-scope="scope">
                                    <el-switch
                                            v-model="scope.row.courseNature.required"
                                            active-text="必修"
                                            disabled>
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column prop="courseNature.description" label="课程性质描述">
                            </el-table-column>
                            <el-table-column align="center" width="200" label="操作">
                                <template slot-scope="scope" >
                                    <el-tooltip class="item" effect="dark" content="修改" placement="top">
                                        <el-button size="mini"
                                                   type="success"
                                                   @click="onInlineEditClick(scope.$index,courseTableData)"
                                                   circle>
                                            <i class="fas fa-edit"></i>
                                        </el-button>
                                    </el-tooltip>

                                    <el-tooltip class="item" effect="dark" content="开课" placement="top">
                                        <el-button size="mini"
                                                   type="warning"
                                                   @click="onInlineOpenClick(scope.$index,courseTableData)"
                                                   circle>
                                            <i class="far fa-hand-pointer"></i>
                                        </el-button>
                                    </el-tooltip>

                                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                        <el-button size="mini"
                                                   type="danger"
                                                   icon="el-icon-delete"
                                                   @click="onInlineDeleteClick(scope.$index,courseTableData)"
                                                   circle>
                                        </el-button>
                                    </el-tooltip>
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
            <el-dialog :title="isEdit?'修改课程':'添加课程'"
                       width="26%"
                       :visible.sync="newDialogVisible"
                       @open="dialogOpenCallback"
                       @close="dialogCloseCallback"
                       v-if="newDialogVisible">
                <div>
                    <el-form ref="newCourseForm"
                             label-width="20%"
                             status-icon
                             :model="newCourseFormData"
                             :rules="newCourseFormRules" style="margin:0 ;padding-bottom: 0">
                        <el-form-item label="课程名" prop="name">
                            <el-input v-model="newCourseFormData.name" type="text" >

                            </el-input>
                        </el-form-item>

                        <el-form-item label="学分" prop="point">
                            <el-input-number v-model="newCourseFormData.point"
                                             :step="0.5"
                                             :precision="1"
                                             :max="8"
                                             :min="1" @change="pointChange" @blur="pointChange" style="width:100%">

                            </el-input-number>
                        </el-form-item>

                        <el-form-item label="学时" prop="hour">
                            <el-input type="text" v-model="newCourseFormData.hour">

                            </el-input>
                        </el-form-item>

                        <el-form-item label="课程性质" prop="couId">
                            <el-select v-model="newCourseFormData.couId"
                                       placeholder="请选择"
                                       @change="newCourseFormSelectChange"
                                       style="width: 100%">
                                <el-option v-for="item in courseNatures"
                                           :value="item.id"
                                           :key="item.id"
                                           :label="item.name">

                                </el-option>
                            </el-select>
                            <el-checkbox disabled label="必修" v-model="newCourseRequired">

                            </el-checkbox>
                        </el-form-item>

                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="newDialogVisible=false">取 消</el-button>
                    <el-button type="primary" @click="onNewCourseDialogOk" >确 定</el-button>
                </div>

            </el-dialog>
        </div>

        <div>
            <el-dialog title="新开课程"
                       width="26%"
                       :visible.sync="openCourseDialogVisible"
                       @close="ocCloseCallback"
                       v-if="openCourseDialogVisible">
                <div>
                    <el-form ref="openCourseForm"
                             label-width="20%"
                             status-icon
                             :model="openCourseFormData"
                             :rules="openCourseFormRules" style="margin:0 ;padding-bottom: 0">

                        <el-form-item label="课程名" prop="couId">
                            <el-select disabled v-model="openCourseFormData.couId" style="width: 100%">
                                <el-option v-for="item in courseTableData" :value="item.course.id" :label="item.course.name">

                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="开课学院" prop="depSelected">
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
                                         v-model="openCourseFormData.depSelected"
                                         @change="onCascaderChange"
                                         style="width: 100%">
                            </el-cascader>
                        </el-form-item>

                        <el-form-item label="开课学年" prop="graId">
                            <el-select v-model="openCourseFormData.graId" style="width: 100%;">
                                <el-option v-for="item in gradeOptions" :value="item.id" :label="item.name">

                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="分配教师" prop="teaId">
                            <el-select v-model="openCourseFormData.teaId" style="width: 100%;">
                                <el-option v-for="item in teacherSelectData" :value="item.id" :label="item.name" >

                                </el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="班级容量" prop="sits">
                            <el-input-number v-model="openCourseFormData.sits"
                                             :step="10"
                                             :precision="0"
                                             :max="200"
                                             :min="5" style="width:100%">

                            </el-input-number>
                        </el-form-item>
                    </el-form>

                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="openCourseDialogVisible=false">取 消</el-button>
                    <el-button type="primary" @click="onOpenOkClick" >确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>


</template>
<script>
    export default {
        name: "Course",

        data() {
            return {
                options:[],
                gradeOptions:[],
                openCourseDialogVisible:false,
                openCourseFormData:{
                    depId:null,
                    graId: null,
                    couId:null,
                    sits:80,
                    teaId:null,
                },
                openCourseFormRules:{
                    graId: [
                        {required:true,message:'请选择开课学年！',trigger:'blur'}
                    ],
                    sits:[
                        {required:true,message:'请填写班级容量!',trigger:'blur'}
                    ],
                    teaId:[
                        {required:true,message:'请选择教师！',trigger:'blur'}
                    ],
                    depSelected:[
                        {required: true,message:'请选择学院！',trigger:'blur',type:'array'},
                    ]
                },
                currentGrade:{},
                loading:true,
                isEdit:false,
                deleteButtonDisable:true,
                searchKeyword:'',
                total:10,
                pageInfo:{
                    pageNum:1,
                    pageSize:10
                },
                courseTableData:[],
                selected:[],
                newDialogVisible:false,
                newCourseFormData:{
                    name:'',
                    couId:null,
                    point:1,
                    hour:null,
                },
                newCourseFormRules:{
                    name:[
                        {required:true,message:'请输入课程名',trigger :'blur'},
                    ],
                    couId:[
                        {required:true,message:'请选择课程性质',trigger :'blur',type: 'number'}
                    ],
                    point:[
                        {required:true,message:'请输入学分',trigger :'blur'}
                    ],
                    hour:[
                        {required:true,message:'请输入学时',trigger:'blur'}
                    ],
                },
                courseNatures:[],
                newCourseDialogSelectData:null,
                newCourseRequired:false,
                teacherSelectData:[],
            };
        },
        mounted(){
            this.fetchAllCourseNature();
            this.fetchCurrentGrade();
            this.fetchCourseData();
            this.fetchAllCourseNature();
            this.fetchTeacherData();
            this.fetchGradeSelectorData();
            this.fetchCascaderData();
        },
        methods:{
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
            fetchTeacherData(){
                this.loading =true;
                this.mRemote({
                    url:'/teacher',
                    method:'get',
                    params: {
                        keyword:null,
                        deptId:null,
                        pageNum:1,
                        pageSize:100
                    }
                },(res)=>{
                     //console.log(res);
                    this.teacherSelectData=res.list;

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
            fetchGradeSelectorData(){
                this.mRemote({
                    url:'/grade',
                    method:'get',
                },(res)=>{
                    console.log(res);
                    this.gradeOptions=res;
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
            ocCloseCallback(){
                this.$refs['openCourseForm'].resetFields();
            },
            fetchCurrentGrade(){
                this.mRemote({
                    url:'/grade/current',
                    method:'get'
                },(res)=>{
                    this.currentGrade=res;
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
            fetchAllCourseNature() {
                this.axios({
                    url: '/course/nature',
                    method: 'get'
                }).then((res) => {
                    this.courseNatures = res.data.data;

                }).catch((error) => {
                    console.log(error);
                })
            },
            fetchCourseData(){
                this.loading=true;
                this.axios({
                    url:'/course/page',
                    method:'get',
                    params:{
                        pageNum:this.pageInfo.pageNum,
                        pageSize:this.pageInfo.pageSize,
                        keyword:this.searchKeyword
                    }
                }).then((res)=>{
                    this.courseTableData=res.data.data.list;
                    this.total = res.data.data.total;
                    this.loading=false;
                })
            },
            onPageChange(){
                console.log(this.pageInfo);
                this.fetchCourseData();
            },
            handleSelectionChange(selection){
                this.selected=selection;
                this.deleteButtonDisable = selection.length <= 0;
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
            onInlineDeleteClick(index, tableData){

                this.deleteConfirmed([tableData[index].course.id]);
                this.fetchCourseData();
            },
            deleteConfirmed(ids) {
                this.$confirm('此操作将永久删除课程，是否继续?','警告',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    this.axios({
                        url:'/course',
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
                            message:'操作中遇到异常请与管理员联系解决！',
                            type:'error',
                            position: 'bottom-right',
                        });
                    });
                    this.refreshTable();
                }).catch((error)=>{
                    this.$notify({
                        title:'取消删除！',
                        message:'已取消删除',
                        type:'info',
                        position: 'bottom-right',
                    });
                });
            },
            onDeleteClick(){
                let ids=[];
                for(let i in this.selected){
                    ids.push(this.selected[i].course.id);
                }
                this.deleteConfirmed(ids);
                this.fetchCourseData();
            },
            editOk(){
                this.mSubmit('newCourseForm',{
                        url:'/course/'+ this.newCourseFormData.id,
                        method:'put',
                        data:this.newCourseFormData
                    },
                    (res)=>{
                        this.isEdit= false;
                        this.newDialogVisible = false;
                        this.fetchCourseData();
                    },{
                        okMsg:{
                            enable:true,
                            title:'成功',
                            message:'修改成功！'
                        },
                        failMsg:{
                            enable:true,
                            title:'失败',
                            message:'修改失败 请检查您的内容后再试。'
                        },
                        errorMsg:{
                            enable:true,
                            title:'错误',
                            message:'修改过程中发生错误，请与管理员联系解决'
                        }
                    });
            },
            newOk(){
                this.axios({
                    url:'/course',
                    method:'post',
                    data:this.newCourseFormData,
                }).then((res)=>{
                    if(res.data.status==100){
                        this.$notify({
                            title:'添加成功！',
                            message:'添加课程成功',
                            type:'success',
                            position: 'bottom-right',
                        });
                        this.newDialogVisible=false;
                        this.fetchCourseData();
                        this.$refs['newCourseForm'].resetFields();
                    }else {
                        this.$notify({
                            title:'添加失败！',
                            message:response.data.message,
                            type:'warning',
                            position: 'bottom-right',
                        });
                        this.newDialogVisible=false;
                    }
                }).catch((error)=>{
                    this.$notify({
                        title:'错误！',
                        message:'新建课程发生错误，请向管理员报告此错误。',
                        type:'error',
                        position: 'bottom-right',
                    });
                })
            },
            onNewCourseDialogOk(){
                this.$refs['newCourseForm'].validate((valid)=>{
                    if(valid){
                        if(this.isEdit){
                            this.editOk();
                        }else {
                            this.newOk();
                        }
                    }
                });

            },
            dialogCloseCallback(){
                this.newCourseFormData={};
            },
            dialogOpenCallback(){
                if(!this.isEdit){
                    this.newCourseFormData={};
                }
            },
            newCourseFormSelectChange(e){
                let c =this.courseNatures;
                c = c.filter((cn)=>{
                    return cn.id == e
                });
                this.newCourseRequired=c[0].required;
            },
            pointChange(arg){
                /*
                    使数据更新之后再调用计算总和函数
                    否则拿到的永远是上一次的数据
                 */
                this.$nextTick(()=>{
                    let cp =this.newFormData.point;
                    this.newFormData.point=(cp - cp % 0.5);
                });
            },
            onInlineEditClick(index,table){
                console.log(table[index].course);
                this.isEdit = true;
                this.newDialogVisible =true;
                this.newCourseFormData = table[index].course;
                console.log(this.newFormData);
            },
            onInlineOpenClick(index,tableData){
                this.openCourseFormData.couId=tableData[index].course.id;
                this.openCourseDialogVisible=true;
            },
            onOpenOkClick(){
                this.$refs['openCourseForm'].validate((valid)=>{
                    if(valid){
                        //console.log(this.currentGrade);
                        //console.log(tableData[index]);
                        this.mRemote({
                            url:'/course/open',
                            method:'post',
                            data:this.openCourseFormData,
                        },(res)=>{

                        },{
                            okMsg: {
                                enable:true,
                                title:'成功',
                                message:'开课成功',
                            },
                            failMsg: {
                                enable:true,
                                title:'失败',
                                message:'开课失败',
                            },
                            errorMsg: {
                                enable:true,
                                title:'出错了！',
                                message:'操作过程中出现错误，请与管理员联系',
                            },
                        });
                    }
                });
            },
            onCascaderChange(arg){
                this.openCourseFormData.depId=arg[arg.length-1];
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