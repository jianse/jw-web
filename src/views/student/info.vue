<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <br>
                    <p>学生个人信息</p>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <br>
                    <p>{{id}}</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <br>
                    <p>{{name}}</p>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <br>
                    <p>{{Gender}}</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <br>
                    <p>{{Birth}}</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <br>
                    <p>{{Grade}}</p>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <br>
                    <p>{{department}}</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <br>
                    <p>{{myclass}}</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <br>
                    <p>{{Email}}</p>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Role",

        data() {
            return {
                studentTableData: [{
                    id: '1',
                    name: '张三',
                    Gender: '女',
                    Birth: '1997-06-30',
                    department: '信息学院',
                    myclass: '计算机161',
                    Grade:'2016',
                    Email:'123'
                }],
            };
        },
    }
</script>

<style scoped>
    .el-row {
        margin-bottom: 0;


    }
    .el-row:last-child {
          margin-bottom: 0;
      }

    .el-col {
        border-radius: 4px;
        text-align: center;
    }


    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 80px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>