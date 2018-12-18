<template>

    <el-tabs type="border-card">
        <el-tab-pane label="个人成绩查询">
            <div style="margin: 10px">
                <div>
                    <template>
                        学期：<el-select v-model="value" placeholder="请选择学期">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </div>

                <div>

                    <ul style="list-style: none;padding: 0">

                        <li>
                            <div>
                                <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                    <el-table-column label="学期" width="150">
                                        <template slot-scope="scope">{{ scope.row.date }}</template>
                                    </el-table-column>
                                    <el-table-column prop="name" label="课程名称" width="250">
                                    </el-table-column>
                                    <el-table-column label="学分" width="150" sortable>
                                    </el-table-column>
                                    <el-table-column label="教师" width="150">
                                    </el-table-column>
                                    <el-table-column label="分数" width="300" sortable>
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

        <el-tab-pane label="班级成绩查询">
            <div style="margin: 10px">


                <div>



                    <el-row :gutter="5">
                        <el-col :span="5">
                            <template>
                                学期：<el-select v-model="value" placeholder="请选择学期">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-col>

                        <el-col :span="5">
                            <template>
                                学院：<el-select v-model="value" placeholder="请选择学院">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-col>

                        <el-col :span="5">
                            <template>
                                班级：<el-select v-model="value" placeholder="请选择班级">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-col>

                        <el-col :span="3">
                            <el-input v-model="keyword"></el-input>
                        </el-col>
                        <el-col :span="3">
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
                                <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                    <el-table-column label="学期" width="150">
                                        <template slot-scope="scope">{{ scope.row.date }}</template>
                                    </el-table-column>
                                    <el-table-column prop="name" label="课程名称" width="250">
                                    </el-table-column>
                                    <el-table-column label="学分" width="150" sortable>
                                    </el-table-column>
                                    <el-table-column label="教师" width="150">
                                    </el-table-column>
                                    <el-table-column label="平均分数" width="300" sortable>
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
                activeName2: 'first',
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


                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '1518',
                    radio: '1'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '1518',
                    radio: '1'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '1518',
                    radio: '1'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '1518',
                    radio: '1'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '1518',
                    radio: '1'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '1518',
                    radio: '1'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '1518',
                    radio: '1'
                }],
                multipleSelection: [],





            };

        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },

            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            onSubmit() {
                console.log('submit!');
            }
        }

    }
</script>

<style scoped>

</style>