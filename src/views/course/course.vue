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
                    <el-button type="primary" @click="newDialogVisible=true">
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
                        <el-table border ref="multipleTable" :data="courseTableData" tooltip-effect="dark" style="width: 100%; margin-bottom: 10px"
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
            <el-dialog title="添加课程"
                       width="26%"
                       :visible.sync="newDialogVisible"
                       @open="dialogOpenCallback"
                       v-if="newDialogVisible">
                <div>
                    <el-form ref="newCourseForm"
                             label-width="20%"
                             status-icon
                             :model="newCourseFormData"
                             :rules="newCourseFormRoles" style="margin:0 ;padding-bottom: 0">
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
                                <el-option v-for="item in courseNatures" :value="item.id" :key="item.id" :label="item.name">

                                </el-option>
                            </el-select>
                            <el-checkbox disabled label="必修" v-model="newCourserequired">

                            </el-checkbox>
                        </el-form-item>

                    </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button >取 消</el-button>
                    <el-button type="primary" @click="onNewCourseDialogOk" >确 定</el-button>
                </div>

            </el-dialog>
        </div>
    </div>


</template>
<script>
    export default {
        name: "Role",

        data() {
            return {
                isEdit:false,
                deleteButtonDisable:true,
                searchKeyword:'',
                total:10,
                pageInfo:{
                    pageNum:1,
                    pageSize:10
                },
                courseTableData:[{
                    course: {
                        id: 2,
                        couId: null,
                        name: "计算机网络",
                        point: 2,
                        hour: 48
                    },
                    courseNature: {
                        id: 1,
                        name: "专业必修课",
                        description: ".",
                        required: true
                    }
                },],
                selected:[],
                newDialogVisible:false,
                newCourseFormData:{
                    name:'',
                    couId:null,
                    point:1,
                    hour:null,
                },
                newCourseFormRoles:{
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
                courseNatures:[
                    {
                        id: 1,
                        name: "专业必修课",
                        description: ".",
                        required: true
                    }
                ],
                newCourseDialogSelectData:null,
                newCourserequired:false,
            };
        },
        mounted(){
            this.fetchCourseData();
            this.fetchAllCourseNature();
        },
        methods:{
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
                })
            },
            onPageChange(){
                console.log(this.pageInfo);
                this.fetchCourseData();
            },
            handleSelectionChange(selection){
                this.selected=selection;
                if(selection.length>0){
                    this.deleteButtonDisable = false;
                }else {
                    this.deleteButtonDisable = true;
                }
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
            onNewCourseDialogOk(){
                if(this.isEdit){
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
                                title:'',
                                message:''
                            },
                            failMsg:{
                                enable:true,
                                title:'',
                                message:''
                            },
                            errorMsg:{
                                enable:true,
                                title:'',
                                message:''
                            }
                        });

                }else {
                    this.$refs['newCourseForm'].validate((valid)=>{
                        if(valid){
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
                        }
                    });
                }

            },
            dialogOpenCallback(){
                this.fetchAllCourseNature();
            },
            newCourseFormSelectChange(e){
                let c =this.courseNatures;
                c = c.filter((cn)=>{
                    return cn.id == e
                });
                this.newCourserequired=c[0].required;
            },
            pointChange(arg){
                /*
                    使数据更新之后再调用计算总和函数
                    否则拿到的永远是上一次的数据
                 */
                this.$nextTick(()=>{
                    let cp =this.newCourseFormData.point;
                    this.newCourseFormData.point=(cp - cp % 0.5);
                });
            },
            onInlineEditClick(index,table){
                console.log(table[index].course);
                this.isEdit = true;
                this.newDialogVisible =true;
                this.newCourseFormData = table[index].course;
                console.log(this.newCourseFormData);
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