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
                    <el-button type="primary" icon="el-icon-plus" @click="newModal=true">新增</el-button>
                    <el-button type="danger" icon="el-icon-delete">删除</el-button>
                </li>
                <li>
                    <template>
                        <el-table :data="tableData5" style="width: 100%">
                            <el-table-column type="selection" width="55">
                            </el-table-column>
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" inline class="demo-table-expand">
                                        <el-form-item label="姓名">
                                            <span>{{ props.row.name }}</span>
                                        </el-form-item>
                                        <el-form-item label="学院">
                                            <span>{{ props.row.shop }}</span>
                                        </el-form-item>
                                        <el-form-item label="班级">
                                            <span>{{ props.row.id }}</span>
                                        </el-form-item>
                                        <el-form-item label="性别">
                                            <span>{{ props.row.shopId }}</span>
                                        </el-form-item>
                                        <el-form-item label="出生年月">
                                            <span>{{ props.row.address }}</span>
                                        </el-form-item>
                                        <el-form-item label="年级">
                                            <span>{{ props.row.desc }}</span>
                                        </el-form-item>
                                        <el-form-item label="邮箱">
                                            <span>{{ props.row.desc }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column label="学号" prop="id">
                            </el-table-column>
                            <el-table-column label="姓名" prop="name">
                            </el-table-column>
                            <el-table-column label="操作" prop="desc">
                                <template slot-scope="scope">
                                    <el-button size="medium" type="info" round @click="dialogVisible = true"><i class="fas fa-tasks"></i>
                                        修改信息</el-button>
                                    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                                        <span>
                                            <template>
                                                <el-form ref="form" :model="form" label-width="80px">
                                                    <el-form-item label="姓名">
                                                        <el-input v-model="form.name"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="学院">
                                                        <el-select v-model="form.region" placeholder="请选择学院">
                                                            <el-option label="信息学院" value="shanghai"></el-option>
                                                            <el-option label="机电学院" value="beijing"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                    <el-form-item label="班级">
                                                        <el-select v-model="form.region" placeholder="请选择班级">
                                                            <el-option label="惠普测试" value="shanghai"></el-option>
                                                            <el-option label="惠普开发" value="beijing"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                    <el-form-item label="出生年月">
                                                        <el-col :span="11">
                                                            <el-date-picker type="date" placeholder="选择生日" v-model="form.date1"
                                                                style="width: 100%;"></el-date-picker>
                                                        </el-col>
                                                    </el-form-item>
                                                    <el-form-item label="性别">
                                                        <el-checkbox-group v-model="form.type">
                                                            <el-radio v-model="radio" label="1">男</el-radio>
                                                            <el-radio v-model="radio" label="2">女</el-radio>
                                                        </el-checkbox-group>
                                                    </el-form-item>
                                                    <el-form-item label="年级">
                                                        <el-select v-model="form.region" placeholder="请选择年级">
                                                            <el-option label="2015" value="beijing"></el-option>
                                                            <el-option label="2016" value="shanghai"></el-option>
                                                            <el-option label="2017" value="beijing"></el-option>
                                                            <el-option label="2018" value="beijing"></el-option>
                                                        </el-select>
                                                    </el-form-item>
                                                    <el-form-item label="邮箱">
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
                    </template>
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
                radio: '1',
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

                tableData5: [{
                    id: '12987122',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',

                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987123',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',

                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987125',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',

                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
                }, {
                    id: '12987126',
                    name: '好滋好味鸡蛋仔',
                    category: '江浙小吃、小吃零食',
                    address: '上海市普陀区真北路',
                    shop: '王小虎夫妻店',
                    shopId: '10333'
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

<style scope>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>