<template>
    <el-row style="height:600px" >
        <el-col :span="20" :offset="2">
            <el-carousel indicator-position="outside" height="450px">
                <el-carousel-item v-for="item in 4" :key="item">
                </el-carousel-item>
            </el-carousel>
            
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "Welcome"
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #5a5959;
        font-size: 20px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(4n) {
        background-image: url(../../../public/111.jpg);
        background-repeat: no-repeat;
        background-position: center;
    }

    .el-carousel__item:nth-child(4n+1) {

        background-image: url(../../../public/112.jpg);
        background-repeat: no-repeat;
        background-position: center;
    }

    .el-carousel__item:nth-child(4n+2) {
        background-image: url(../../../public/114.jpg);
        background-repeat: no-repeat;
        background-position: center;
    }

    .el-carousel__item:nth-child(4n+3) {
        background-image: url(../../../public/113.jpg);
        background-repeat: no-repeat;
        background-position: center;
    }
</style>