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
        prop="totalCost"
        label="成本"
        width="80"
      ></el-table-column>
      <el-table-column prop="updata_date" label="日期" width="250">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updata_date }}</span>
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