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
                        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            
                            <el-table-column prop="plan.name" label="课程名称" width="200">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            
                            <el-table-column prop="plan.department" label="开课学院" width="200">
                            </el-table-column>
                            
                            <el-table-column prop="plan.point" label="学分" width="150">
                            </el-table-column>
                            
                            <el-table-column prop="plan.hour" label="学时" width="150">
                            </el-table-column>
                            
                            <el-table-column prop="courseNature.name" label="课程性质" width="200">
                            </el-table-column>

                            <el-table-column prop="courseNature.required." label="课程性质" width="150">
                                <template slot-scope="scope">
                                   <el-switch
                                            v-model="scope.row.courseNature.required"
                                            active-text="必修"
                                            disabled>
                                    </el-switch>
                                </template>
                            </el-table-column>
                            
                            <el-table-column label="课程性质描述" width="200">
                            </el-table-column>
                            <el-table-column align="center" width="200" label="操作">
                                <template slot-scope="scope" >
                                    <!--配置角色按钮-->
                                    <el-tooltip class="item" effect="dark" content="修改" placement="top">
                                        <el-button size="mini"
                                                   type="success"
                                                   @click="onEditClick(scope.$index,planTableData)"
                                                   circle>
                                            <i class="fas fa-edit"></i>
                                        </el-button>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" content="删除" placement="top">
                                        <el-button size="mini"
                                                   type="danger"
                                                   icon="el-icon-delete"
                                                   @click="onInlineDeleteClick(scope.$index,planTableData)"
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
    </div>
</template>

<script>
    export default {
        name: "Role",
        mounted() {
            this.fetchPlanData();
        },
        data() {
            return {
                deleteButtonDisable: true,
                newDialogVisible: false,
                searchKeyword:'',
                total:10,
                planTableData: [{
                plan:{
                    id: 2,
                    graId: null,
                    depId: null,
                    couId: null,
                }, 
                courseNature: {
                        id: 1,
                        name: "专业必修课",
                        description: ".",
                        required: true
                    }
                }],
                multipleSelection: [],
                selected: [],
            };

        },
        methods: {
            fetchPlanData() {
                this.axios({
                    url: '',
                    method: 'get',
                    data: this.pageInfo
                }).then((res) => {
                    this.planTableData = res.data.data.list;
                    this.total = res.data.data.total;
                })
            },
            onPageChange(){
                this.fetchPlanData();
            },
            onEditClick(){

            },
            onNewPlanDialogOk() {
                this.$refs['newPlanForm'].validate((valid) => {
                    if (valid) {
                        this.axios({
                            url: '',
                            method: 'post',
                            data: this.newPlanFormData,
                        }).then((res) => {
                            if (res.data.status == 100) {
                                this.$notify({
                                    title: '添加成功！',
                                    message: '添加教学计划成功',
                                    type: 'success',
                                    position: 'bottom-right',
                                });
                                this.newDialogVisible = false;
                                this.fetchPlanData();
                                this.$refs['newPlanForm'].resetFields();
                            } else {
                                this.$notify({
                                    title: '添加失败！',
                                    message: response.data.message,
                                    type: 'warning',
                                    position: 'bottom-right',
                                });
                                this.newDialogVisible = false;
                            }
                        }).catch((error) => {
                            this.$notify({
                                title: '错误！',
                                message: '新建教学计划发生错误，请向管理员报告此错误。',
                                type: 'error',
                                position: 'bottom-right',
                            });
                        })
                    }
                })
            },
            handleSelectionChange(selection) {
                this.selected = selection;
                if (selection.length > 0) {
                    this.deleteButtonDisable = false;
                } else {
                    this.deleteButtonDisable = true;
                }
            },
            onDeleteClick() {
                let ids = [];
                for (let i in this.selected) {
                    ids.push(this.selected[i].plan.id);
                }
                this.deleteConfirmed(ids);
                this.fetchPlanData();
            },
            deleteConfirmed(ids) {
                this.$confirm('此操作将永久删除教学计划，是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        url: '',
                        method: 'delete',
                        data: ids
                    }).then((response) => {
                        if (response.data.status == 100) {
                            this.$notify({
                                title: '删除成功！',
                                message: response.data.message,
                                type: 'success',
                                position: 'bottom-right',
                            });
                        } else {
                            this.$notify({
                                title: '删除失败！',
                                message: response.data.message,
                                type: 'error',
                                position: 'bottom-right',
                            });
                        }
                    }).catch((error) => {
                        this.$notify({
                            title: '删除失败！',
                            message: '操作中遇到异常请与管理员联系解决！',
                            type: 'error',
                            position: 'bottom-right',
                        });
                    });
                    this.refreshTable();
                }).catch((error) => {
                    this.$notify({
                        title: '取消删除！',
                        message: '已取消删除',
                        type: 'info',
                        position: 'bottom-right',
                    });
                });
                
            },
            pointChange(point){
                this.newCourseFormData.point=(point - point % 0.5);
            }

        },

    }
</script>

<style scoped>

</style>