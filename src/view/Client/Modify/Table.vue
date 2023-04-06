<template>
  <el-table style="width: 100%" v-bind="$attrs">
    <el-table-column prop="index" label="#" width="60"></el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
      <template slot-scope="scope">
        <el-input
          v-if="scope.row.isEdit"
          v-model="scope.row.tempName"
        ></el-input>
        <div v-else>{{ scope.row.name }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="tel" label="号码" width="180">
      <template slot-scope="scope">
        <el-input
          v-if="scope.row.isEdit"
          v-model="scope.row.tempTel"
        ></el-input>
        <div v-else>{{ scope.row.tel }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="地址">
      <template slot-scope="scope">
        <el-input
          v-if="scope.row.isEdit"
          v-model="scope.row.tempAddress"
        ></el-input>
        <div v-else>{{ scope.row.address }}</div>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180">
      <template slot-scope="scope">
        <el-button
          v-if="!scope.row.isEdit"
          type="primary"
          class="edit-btn"
          icon="el-icon-edit"
          @click="$emit('editRow', scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="!scope.row.isEdit"
          type="danger"
          class="edit-btn"
          icon="el-icon-delete"
          @click="$emit('delRow', scope.row)"
          >删除</el-button
        >
        <el-button
          v-if="scope.row.isEdit"
          type="success"
          class="edit-btn"
          icon="el-icon-circle-check"
          @click="$emit('saveRow', scope.row)"
          >保存</el-button
        >
        <el-button
          v-if="scope.row.isEdit"
          type="danger"
          class="edit-btn"
          icon="el-icon-delete"
          @click="$emit('cancleRow', scope.row)"
          >取消</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.edit-btn {
  padding: 4px 8px;
}
</style>