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
                            <el-table-column label="角色名" width="160">
                                <template slot-scope="scope">{{ scope.row.date }}</template>
                            </el-table-column>
                            <el-table-column prop="name" label="描述" width="400">
                            </el-table-column>
                            <el-table-column label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button size="medium" type="info" round @click="dialogVisible = true"><i class="fas fa-tasks"></i>
                                        权限配置</el-button>
                                    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                                        <span>
                                            <template>
                                                <el-table :data="tableData" style="width: 100%">
                                                    <el-table-column prop="name" label="权限" width="180">
                                                    </el-table-column>
                                                    <el-table-column prop="name" label="操作" width="180">
                                                        <el-switch
  v-model="value2"
  active-color="#13ce66"
  inactive-color="#ff4949">
</el-switch>
                                                    </el-table-column>
                                            
                                                </el-table>
                                            </template>
                                        </span>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button @click="dialogVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                                        </span>
                                    </el-dialog>
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
                dialogVisible: false,
                
                

            };

        },
        methods: {
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style scoped>

</style>