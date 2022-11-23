<template>
  <div>
    <el-table v-bind="$attrs" :stripe="true" style="width: 100%">
      <el-table-column prop="id" label="#" width="40"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column
        prop="amount"
        label="数量"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="单价"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="anotherFee"
        label="费用"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="client"
        label="客户"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="transportOrder"
        label="物流单号"
        width="320"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="removeRow(scope.$index, scope.row)"
            style="color: red"
            >删除</el-button
          >
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