<template>
  <el-table style="width: 100%" v-bind="$attrs">
    <el-table-column label="#" width="40">
      <template slot-scope="scope">
        <el-checkbox
          v-model="scope.row.checked"
          :disabled="scope.row.postStatus == 'success'"
        ></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="180">
      <template slot-scope="scope">
        <el-input
          v-if="scope.row.isEdit"
          v-model="scope.row.tempName"
          placeholder="客户姓名"
        ></el-input>
        <div v-else>{{ scope.row.name }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="phone" label="号码" width="180">
      <template slot-scope="scope">
        <el-input
          v-if="scope.row.isEdit"
          v-model="scope.row.tempPhone"
          placeholder="客户联系方式"
        ></el-input>
        <div v-else>{{ scope.row.phone }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="地址">
      <template slot-scope="scope">
        <el-input
          v-if="scope.row.isEdit"
          v-model="scope.row.tempAddress"
          placeholder="客户地址"
        ></el-input>
        <div v-else>{{ scope.row.address }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="postStatus" label="状态" width="160">
      <template slot-scope="scope">
        <span v-if="scope.row.postStatus == 'success'" style="color: #67c23a"
          >入库成功</span
        >
        <span v-else-if="scope.row.postStatus == 'fail'" style="color: #f56c6c"
          >入库失败,请重试...</span
        >
        <span v-else style="color: #e6a23c">待提交</span>
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
          @click="$emit('delRow', scope.$index)"
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
          size="mini"
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