<template>
    <div style="margin: 10px">
        <div>
            <el-row :gutter="5" style="margin-bottom: 16px">
                <el-col :span="5">
                    <el-input v-model="searchKeyword"></el-input>
                </el-col>
                <el-col :span="19">
                    <el-button type="primary">
                        <i class="el-icon-search"></i>
                        <span>查找</span>
                    </el-button>
                    <el-button type="primary" @click="newModal=true">
                        <i class="el-icon-plus"></i>
                        新建
                    </el-button>
                    <el-button type="primary" :disabled="deleteButtonDisable" @click="onDeleteClick">
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
                        <el-table border ref="multipleTable" :data="courseTableData" tooltip-effect="dark" style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="50" align="center">
                            </el-table-column>

                            <el-table-column label="课程编号" width="150" prop="course.id">

                            </el-table-column>

                            <el-table-column prop="course.name" label="课程名称" width="250">
                            </el-table-column>

                            <el-table-column prop="course.point" label="学分" width="150">
                            </el-table-column>

                            <el-table-column prop="course.hour" label="学时" width="150">
                            </el-table-column>

                            <el-table-column prop="courseNature.name" label="课程性质" width="200">
                            </el-table-column>

                            <el-table-column prop="courseNature.required" label="必修">
                                <template slot-scope="scope">
                                    <el-switch
                                            v-model="scope.row.courseNature.required"
                                            active-text="必修"
                                            disabled>
                                    </el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column prop="courseNature.description" label="课程性质描述" width="300">
                            </el-table-column>
                            <el-table-column align="center" width="200" label="操作">
                                <template slot-scope="scope" >
                                    <!--配置角色按钮-->
                                    <el-tooltip class="item" effect="dark" content="修改" placement="top">
                                        <el-button size="mini"
                                                   type="success"
                                                   @click="onEditClick(scope.$index,courseTableData)"
                                                   circle>
                                            <i class="fas fa-edit"></i>
                                        </el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                        <el-button
                                                size="mini"
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
                       v-if="newDialogVisible">
                <el-form ref="newCourseForm"
                         label-width="20%"
                         status-icon
                         :model="newCourseForm"
                         :rules="newCourseRoles">
                    <el-form-item lable="课程名" prop="">
                        <el-input></el-input>
                    </el-form-item>

                    <el-form-item lable="学分">
                        <el-input>

                        </el-input>
                    </el-form-item>

                    <el-form-item lable="学时">
                        <el-input>
                            <el-option v-for="">

                            </el-option>
                        </el-input>
                    </el-form-item>

                    <el-form-item lable="课程性质">
                        <el-select></el-select>
                    </el-form-item>

                </el-form>
            </el-dialog>
        </div>
    </div>


</template>
<script>
    export default {
        name: "Role",

        data() {
            return {
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
                multipleSelection: [],
                selected:[],
                newDialogVisible:false,
            };
        },
        mounted(){
            this.fetchCourseData();
        },
        methods:{
            fetchCourseData(){
                this.axios({
                    url:'/course/page',
                    method:'get',
                    data:this.pageInfo
                }).then((res)=>{
                    console.log(res.data.data);
                    this.courseTableData=res.data.data.list;
                    this.total = res.data.data.total;
                })
            },
            onPageChange(){
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
            onEditClick(){

            },
            onInlineDeleteClick(index, tableData){
                console.log(tableData);
                console.log(index);
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