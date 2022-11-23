<template>
  <div>
    <el-table v-bind="$attrs" :stripe="true" style="width: 100%" height="600">
      <el-table-column prop="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column
        prop="amount"
        label="数量"
        width="80"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="单价"
        width="80"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="another_fee"
        label="费用"
        width="80"
        :sortable="true"
      ></el-table-column>
      <el-table-column prop="client" label="客户" width="70"></el-table-column>
      <el-table-column
        prop="status"
        label="订单状态"
        width="80"
      ></el-table-column>
      <el-table-column
        prop="transport_order"
        label="物流单号"
        width="320"
      ></el-table-column>
      <el-table-column
        prop="updata_date"
        label="日期"
        width="200"
        :sortable="true"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            dataFormat(scope.row.updata_date)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="big" @click="rowEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="big"
            @click="rowRemoveClick(scope.row)"
            style="color: red"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <EditDialogForm
      @close="closeDialogFrom"
      :visible="dialogFromVisible"
      :editData="editData"
    />
  </div>
</template>

<script>
import EditDialogForm from "./EditDialogForm";
import { formatDate } from "@/utils";
export default {
  components: { EditDialogForm },
  data: function () {
    return {
      dialogFromVisible: false,
      editData: {},
    };
  },

  methods: {
    rowEditClick: function (row) {
      // 要编辑输入传入
      this.editData = row;
      this.showDialogFrom();
    },
    rowRemoveClick: function (reow) {},
    showDialogFrom: function () {
      this.dialogFromVisible = true;
    },
    closeDialogFrom: function () {
      this.dialogFromVisible = false;
    },
    dataFormat: function (date) {
      return formatDate(new Date(date));
    },
  },
};
</script>

<style>
</style>