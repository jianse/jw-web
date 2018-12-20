<template>
    <div style="margin: 10px">
        <div>
            <el-col :span="5">
                <template>
                    学院：<el-select v-model="value" placeholder="请选择学院">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-col>
            <el-row :gutter="5">
                <el-col :span="6">
                    <el-input v-model="keyword" label="教师名" placeholder="请输入教师名"></el-input>
                </el-col>
                <el-col :span="5">
                    <el-button type="primary" @click="refreshTable()">
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
                        <el-table ref="multipleTable" :data="teacherTableData" tooltip-effect="dark" style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column prop="id" label="教师编号" width="150">
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

        data() {
            return {
                pageInfo:{
                    pageNum:1,
                    pageSize:10
                },
                options: [{
                    value: '选项1',
                    label: '2016-2017第一学期'
                }, {
                    value: '选项2',
                    label: '2016-2017第二学期'
                }, {
                    value: '选项3',
                    label: '2017-2018第一学期'
                }, {
                    value: '选项4',
                    label: '2017-2018第二学期'
                }, {
                    value: '选项5',
                    label: '2018-2019第一学期'
                }],
                value: '',

                teacherTableData: [{
                    id: '1',
                    name: '陈卓',
                    gender: '女',
                    age: '1',
                    department:'信息学院',
                    education:'博士',
                    title:['']

                }],
                teacherTableData:[{

                }],
                total:10,
                multipleSelection: [],
            };

        },
        methods(){
            refreshTable();{
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
            };
            onPageChange();{
                this.fetchCourseData();
            }
            fetchCourseData();{
                this.axios({
                    url:'',
                    method:'get',
                    data:this.pageInfo
                }).then((res)=>{
                    this.teacherTableData=res.data.data.list;
                    this.total = res.data.data.total;
                })
            }
        }

    }
</script>

<style scoped>

</style>