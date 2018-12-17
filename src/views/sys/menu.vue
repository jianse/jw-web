<template>
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
                <li style="margin-top:10px;margin-bottom:20px">
                    <el-button type="primary" icon="el-icon-plus" @click="newModal=true">新建</el-button>
                    <el-button type="success" icon="el-icon-edit">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete">删除</el-button>
                </li>
                <li>
                    <div>
                        <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark" style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column label="菜单" width="200">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column prop="name" label="菜单名称" width="200">
                            </el-table-column>
                            <el-table-column label="地址" width="200">
                            </el-table-column>
                            <el-table-column label="上级菜单id" width="200">
                            </el-table-column>
                            <el-table-column label="排序" width="200">
                            </el-table-column>
                            <el-table-column label="图标" width="200">
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


</template>
<script>
    export default {
        name: "Role",

        data() {
            return {
                tableData3: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '1518'
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '1518'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '1518'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '1518'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '1518'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '1518'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '1518'
                }],
                multipleSelection: [],
        



            };

        },
        
    }
</script>

<style scoped>

</style>