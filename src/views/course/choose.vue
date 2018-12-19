<template>

    <div>
        <div style="margin-bottom: 22px">
            <el-row :gutter="5">
                <el-form :inline="true" :model="qO" class="demo-form-inline">
                    <el-form-item>
                        <el-select :disabled="selectDisable" v-model="qO.graId"  placeholder="请选择学年" @change="onSelectChange" style="width: 100%">
                            <el-option v-for="item in gradeSelectorData"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="qO.keyword" placeholder="请输入">

                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="fetchChooseCourseTableData">
                            <i class="el-icon-search"></i>
                            <span>查找</span>
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>

        <el-tabs type="card" @tab-click="onSwitch" :value="tabValue">
            <el-tab-pane :name="tabNames[0]" >
                <span slot="label"><i class="el-icon-date"></i> 可选选课</span>
                <div style="margin: 10px">
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
            </el-tab-pane>
            <el-tab-pane :name="tabNames[1]">
                <span slot="label"><i></i>已选课程</span>
                <div style="margin: 10px">
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
                                    退选课程</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>

        </el-tabs>
        <div class="block">
            <el-pagination background
                           layout="->,prev, pager, next"
                           :current-page.sync="pageInfo.pageNum"
                           @current-change="fetchChooseCourseTableData"
                           :total="total" >
            </el-pagination>
        </div>
    </div>


</template>
<script>
    export default {
        name: "Role",
        data() {
            return {
                selectDisable:true,
                tabValue:'tab1',
                tabNames:['tab1','tab2'],
                chooseTableData:[],
                pageInfo:{
                    pageNum:1,
                    pageSize:10,
                },
                total:10,
                gradeSelectorData:[],
                qO:{
                    keyword:'',
                    deptId:null,
                    graId :null,
                },
                currentGrade:{}
            };
        },
        mounted() {
            this.fetchGradeSelectorData();
            this.fetchCurrentGrade();
            this.fetchChooseCourseTableData();

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
                        keyword:this.qO.keyword,
                        deptId:this.qO.deptId,
                        graId :this.qO.graId,
                    }
                },(res)=>{
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
            fetchCurrentGrade(){
                this.mRemote({
                    url:'/grade/current',
                    method:'get'
                },(res)=>{
                    this.currentGrade=res;
                    this.qO.graId = res.id;

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
            onSwitch(tab){
                if(tab.name==this.tabNames[0]){
                    this.qO.graId=this.currentGrade.id;
                    this.selectDisable = true;

                }else {
                    this.selectDisable = false;
                }
                this.fetchChooseCourseTableData();
            },
            onSelectChange(value){
                this.fetchChooseCourseTableData();

            }
        }


    }
</script>

<style scoped>

</style>