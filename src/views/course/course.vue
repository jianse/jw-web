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
                <li>
                    <div class="block">
                        <span class="demonstration"></span>
                        <el-pagination layout="->,prev, pager, next" :total="total">
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

        data() {
            return {
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
            handleSelectionChange(selection){

            }
        }

    }
</script>

<style scoped>

</style>