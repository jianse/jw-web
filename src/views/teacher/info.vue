<template>
    <div>
        <el-form :inline="true">
            <el-form-item>
                <el-select :disabled="selectDisable"
                           v-model="qO.gradeId"
                           placeholder="请选择学年"
                           @change="onSelectChange"
                           style="width: 100%">
                    <el-option v-for="item in gradeSelectorData"
                               :key="item.id"
                               :label="item.name"
                               :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>

</template>

<script>
    export default {
        name: "Info"
    }
</script>

<style scoped>

</style>