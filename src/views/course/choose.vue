<template>
    <el-tabs type="border-card">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 可选选课</span>
            <div style="margin: 10px">

                <div>
                    <el-row :gutter="5">
                        <el-col :span="12">
                            <el-input v-model="keyword"></el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="primary">
                                <i class="el-icon-search"></i>
                                <span>查找</span>
                            </el-button>
                        </el-col>
                    </el-row>
                </div>

                <div>
                    <ul style="list-style: none;padding: 0">
                        <li>
                            <div>
                                <el-table border
                                          ref="multipleTable"
                                          :data="chooseTableData"
                                          tooltip-effect="dark">
                                    <el-table-column label="课程名称" width="150" prop="course.name">

                                    </el-table-column>
                                    <el-table-column label="开课学院" prop="deptName" width="200">
                                    </el-table-column>
                                    <el-table-column label="教师" prop="teacherName" width="150">
                                    </el-table-column>
                                    <el-table-column label="学分" prop="course.point" sortable width="100">
                                    </el-table-column>
                                    <el-table-column label="学时" prop="course.hour" sortable width="100">
                                    </el-table-column>
                                    <el-table-column label="班级容量" prop="sits" sortable width="200">
                                    </el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button size="medium" type="primary" round @click="dialogVisible = true"><i
                                                    class="fas fa-check"></i>
                                                选入课程</el-button>
                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>
                        </li>
                        <li>
                            <div class="block">
                                <el-pagination background
                                               layout="->,prev, pager, next"
                                               :current-page.sync="pageInfo.pageNum"
                                               @current-change="fetchChooseCourseTableData"
                                               :total="total" >
                                </el-pagination>
                            </div>
                        </li>
                    </ul>



                </div>
            </div>

        </el-tab-pane>
        <el-tab-pane label="已选课程">
            <div style="margin: 10px">

                <div>
                    <el-row :gutter="5">
                        <el-col :span="5">
                            <el-input v-model="keyword" placeholder="请输入"></el-input>
                        </el-col>
                        <el-col :span="5">
                            <el-button type="primary">
                                <i class="el-icon-search"></i>
                                <span>查找</span>
                            </el-button>
                        </el-col>
                    </el-row>
                </div>
                <br>
                <div>
                    <el-select v-model="graId" placeholder="请选择学年">
                        <el-option v-for="item in gradeSelectorData"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </div>

                <div>


                    <ul style="list-style: none;padding: 0">

                        <li>
                            <div>
                                <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                    <el-table-column type="selection" width="55">
                                    </el-table-column>
                                    <el-table-column label="课程名称" width="150">
                                        <template slot-scope="scope">{{ scope.row.date }}</template>
                                    </el-table-column>
                                    <el-table-column prop="name" label="开课学院" width="200">
                                    </el-table-column>
                                    <el-table-column label="教师" width="150">
                                    </el-table-column>
                                    <el-table-column label="学分" sortable width="100">
                                    </el-table-column>
                                    <el-table-column label="学时" sortable width="100">
                                    </el-table-column>
                                    <el-table-column label="班级容量" sortable width="200">
                                    </el-table-column>
                                    <el-table-column label="操作" width="200">
                                        <template slot-scope="scope">
                                            <el-button size="medium" type="info" round @click="dialogVisible = true"><i
                                                    class="fas fa-minus-circle"></i>
                                                退选课程</el-button>
                                        </template>
                                    </el-table-column>

                                </el-table>
                            </div>
                        </li>
                        <li>
                            <div class="block">
                                <span class="demonstration"></span>
                                <el-pagination layout="prev, pager, next" :total="1000">
                                </el-pagination>
                            </div>
                        </li>
                    </ul>



                </div>
            </div>
        </el-tab-pane>

    </el-tabs>
</template>
<script>
    export default {
        name: "Role",
        data() {
            return {
                graId:1,
                chooseTableData:[],
                pageInfo:{
                    pageNum:1,
                    pageSize:10,
                },
                total:10,
                keyword:'',
                gradeSelectorData:[
                    {
                        id: 1,
                        name: '2016-2017第一学期'
                    }
                ],
                qO:{
                    keyword:'',
                    deptId:null,
                    graId :null,
                }
            };
        },
        mounted() {
            this.fetchChooseCourseTableData();
            this.fetchGradeSelectorData();
        },
        methods:{
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

            fetchChooseCourseTableData(){
                this.mRemote({
                    url:'/course/open',
                    method:'get',
                    params:{
                        pageNum:this.pageInfo.pageNum,
                        pageSize:this.pageInfo.pageSize,
                        keyword:this.keyword,
                        deptId:this.qO.deptId,
                        graId :this.qO.graId,
                    }
                },(res)=>{
                    console.log(res);
                    this.total =res.total;
                    this.chooseTableData = res.list;
                },{
                    okMsg:{
                        enable:false,
                    },
                    failMsg:{
                        enable:false
                    },
                    errorMsg:{
                        enable:false,
                    }
                })
            },
            fetchGradeSelectorData(){
                this.mRemote({
                    url:'/grade',
                    method:'get',
                },(res)=>{
                    console.log(res);
                    this.gradeSelectorData=res;
                    console.log(this.gradeSelectorData);
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
            }
        }


    }
</script>

<style scoped>

</style>