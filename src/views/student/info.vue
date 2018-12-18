<template>

    <div>


        <el-row>
            <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                    <p>学生个人信息</p>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <p>学号：1608090111</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <p>姓名：王小虎</p>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <p>姓别：男</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <p>出生年月日：1997-6-30</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <p>年级：2016</p>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <p>学院：信息学院</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <p>班级：惠普测试161</p>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <p>邮箱：123456@qq.com</p>
                </div>
            </el-col>

        </el-row>


    </div>
</template>

<style scoped>
    .el-row {
        margin-bottom: 0;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-col {
        border-radius: 4px;
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