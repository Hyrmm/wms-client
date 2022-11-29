<template>
  <div>
    <el-table v-bind="$attrs" :stripe="true" style="width: 100%">
      <el-table-column prop="id" label="#" width="40">
        <template slot-scope="scope">
          <el-checkbox
            v-model="scope.row.checked"
            :disabled="scope.row.postStatus == 'success'"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="amount" label="数量" width="80"></el-table-column>
      <el-table-column prop="price" label="单价" width="80"></el-table-column>
      <el-table-column
        prop="totalCost"
        label="成本"
        width="80"
      ></el-table-column>

      <el-table-column prop="updata_date" label="日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left:10px">{{ scope.row.updata_date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="postStatus" label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.postStatus == 'success'" style="color: #67c23a"
            >入库成功</span
          >
          <span
            v-else-if="scope.row.postStatus == 'fail'"
            style="color: #f56c6c"
            >入库失败</span
          >
          <span v-else style="color: #e6a23c">待提交</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.postStatus == 'success'"
            type="text"
            @click="removeRow(scope.$index, scope.row)"
            style="color: red"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import AddFormDailog from "./AddFormDailog";
export default {
  components: { AddFormDailog },
  data: function () {
    return {};
  },
  methods: {
    removeRow(rowIndex, rowData) {
      this.$emit("removeRow", rowIndex, rowData);
    },
  },
};
</script>

<style lang="less" scoped>
</style>