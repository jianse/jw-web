<template>
    <el-tabs type="border-card">
        <el-tab-pane>
            <span slot="label"><i class="el-icon-date"></i> 所有选课</span>
            <div style="margin: 10px">

                <div>
                    <el-row :gutter="5">
                        <el-col :span="12">
                            <el-input v-model="loginName"></el-input>
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
                                <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"
                                    @selection-change="handleSelectionChange">
                                    <el-table-column type="selection" width="55">
                                    </el-table-column>
                                    <el-table-column label="课课程名称" width="150">
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
                                <span class="demonstration"></span>
                                <el-pagination layout="prev, pager, next" :total="1000">
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
                        <el-col :span="12">
                            <el-input v-model="loginName"></el-input>
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
                    <el-select v-model="value2" placeholder="请选择学年">
                        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"
                            :disabled="item.disabled">
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
                options2: [{
                        value: '选项1',
                        label: '黄金糕'
                    }],
                    tableData3: [{
                        date: '2016-05-03',
                        name: '王小虎',
                    }, {
                        date: '2016-05-02',
                        name: '王小虎',
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                    }, {
                        date: '2016-05-08',
                        name: '王小虎',
                    }, {
                        date: '2016-05-06',
                        name: '王小虎',
                    }, {
                        date: '2016-05-07',
                        name: '王小虎',
                    }],
                    multipleSelection: [],
                };

            },

        }
</script>

<style scoped>

</style>