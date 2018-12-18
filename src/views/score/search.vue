<template>
    <div style="margin: 10px">
        <div>
            <template>
  学期：<el-select v-model="value" placeholder="请选择学期">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
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


</template>
<script>
    export default {
        name: "Role",

        data() {
            return {
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





            };

        },

    }
</script>

<style scoped>

</style>