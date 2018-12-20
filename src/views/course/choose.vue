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
                    <el-form-item>
                        <el-button type="success" @click="fetchChooseCourseTableData">
                            <i class="el-icon-refresh"></i>
                            <span>刷新</span>
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
                              v-loading="loading"
                              ref="multipleTable"
                              :data="chooseTableData"
                              empty-text="暂无可选课程"
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
                                <el-button size="medium" type="primary" round @click="choose(scope.$index,chooseTableData)">
                                    <i class="fas fa-check"></i>
                                    选入课程</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane :name="tabNames[1]">
                <span slot="label"><i class="far fa-calendar-check"></i> 已选课程</span>
                <div style="margin: 10px">
                    <el-table border
                              v-loading="loading"
                              ref="multipleTable"
                              :data="chooseTableData"
                              empty-text="当前所选学年还未选修课程"
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
                                <el-button size="medium" type="primary" round @click="unChoose(scope.$index,chooseTableData)"><i
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
                loading:true,
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
                    chose:false,
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
            unChoose(index,tableData){
                console.log(tableData[index]);
                let h=this.$createElement;
                this.mConfirm({
                    message:h('p',null,[h('span',null,'您即将退选 '),h('span',{ style: 'color: teal' },tableData[index].course.name),h('span',null,' 是否确定？')]),
                    title:'提醒',
                    type:'warning'
                },{
                    url:'/course/choose/'+tableData[index].id,
                    method:'delete',
                },(res)=>{
                    this.fetchChooseCourseTableData();
                },{
                    okMsg:{
                        enable:true,
                        title:'退选成功',
                        message:'您的'+tableData[index].course.name +'已退选成功！'
                    },
                    failMsg:{
                        enable:true,
                        title:'退选失败',
                        message:''
                    },
                    errorMsg:{
                        enable:true,
                        title:'退选错误',
                        message:'退选过程中发生错误，请您刷新页面再试，或向管理员报告此事件'
                    }
                });
            },
            choose(index,tableData){
                this.mRemote({
                    url:'/course/choose/' +tableData[index].id,
                    method:'put',

                },(res)=>{
                    this.fetchChooseCourseTableData();
                },{
                    okMsg:{
                        enable:true,
                        title:'成功',
                        message:'恭喜选课成功！',
                    },
                    failMsg:{
                        enable:true,
                        title:'选课失败',
                        message:'请检查您的选课项，或刷新页面再进行选课！',
                    },
                    errorMsg:{
                        enable:true,
                        title:'选课出错',
                        message:'选课过程中出现错误，请联系管理员！',
                    }
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
            fetchChooseCourseTableData(){
                this.loading = true;
                this.mRemote({
                    url:'/course/open',
                    method:'get',
                    params:{
                        pageNum:this.pageInfo.pageNum,
                        pageSize:this.pageInfo.pageSize,
                        keyword:this.qO.keyword,
                        deptId:this.qO.deptId,
                        graId :this.qO.graId,
                        chose:this.qO.chose
                    }
                },(res)=>{
                    this.total =res.total;
                    this.chooseTableData = res.list;
                    this.loading=false;
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
                    this.qO.chose =false;
                }else {
                    this.selectDisable = false;
                    this.qO.chose=true;
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