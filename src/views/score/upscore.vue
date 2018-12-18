<template>



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
                <li style="margin-top:10px;margin-bottom:20px">
                    <el-button type="primary" icon="el-icon-plus" @click="newModal=true">插入</el-button>
                    <el-button type="danger" icon="el-icon-delete">删除</el-button>
                </li>
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
                            <el-table-column label="分数" width="150" sortable>
                            </el-table-column>
                            <el-table-column label="修改" width="300">
                                <template slot-scope="scope">
                                    <el-button size="medium" type="success" round @click="dialogVisible = true"><i class="fas fa-pencil-alt"></i>
                                        修改分数</el-button>
                                    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                                        <span>
                                            <template>
                                                <el-form ref="form" :model="form" label-width="80px">
                                                    <el-form-item label="分数">
                                                        <el-input v-model="form.name"></el-input>
                                                    </el-form-item>
                                                   
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    <el-form-item>
                                                        <el-button type="primary" @click="onSubmit">保存</el-button>
                                                        <el-button>取消</el-button>
                                                    </el-form-item>
                                                </el-form>

                                            </template>
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
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
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
            },
            onSubmit() {
                console.log('submit!');
            }
        }
       
        


    }
</script>

<style scoped>

</style>