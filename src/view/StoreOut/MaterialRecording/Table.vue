<template>
  <div>
    <el-table v-bind="$attrs" :stripe="true" style="width: 100%" ref="table">
      <el-table-column prop="index" label="#" width="60"> </el-table-column>
      <el-table-column
        v-if="displayField.name"
        prop="name"
        label="名称"
        width="200"
      >
      </el-table-column>
      <el-table-column
        v-if="displayField.type"
        prop="type"
        label="类型"
        width="200"
      >
      </el-table-column>
      <el-table-column
        v-if="displayField.amount"
        prop="amount"
        label="数量"
        width="120"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        v-if="displayField.price"
        prop="price"
        label="出库单价"
        width="160"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        v-if="displayField.another_fee"
        prop="another_fee"
        label="总成本"
        width="100"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        v-if="displayField.profit"
        prop="profit"
        label="预期利润"
        width="100"
        :sortable="true"
      >
        <template slot-scope="scope">
          <div style="margin-left: 10px">
            {{ scope.row.price * scope.row.amount - scope.row.another_fee }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="displayField.client"
        prop="client"
        label="客户"
        width="160"
      ></el-table-column>
      <el-table-column
        v-if="displayField.client_tel"
        prop="client_tel"
        label="客户联系方式"
        width="120"
      ></el-table-column>
      <el-table-column
        v-if="displayField.client_address"
        prop="client_address"
        label="客户地址"
        width="280"
      ></el-table-column>
      <el-table-column
        v-if="displayField.status"
        prop="status"
        label="订单状态"
        width="80"
      ></el-table-column>
      <el-table-column
        v-if="displayField.transport_order"
        prop="transport_order"
        label="备注"
        width="320"
      ></el-table-column>
      <el-table-column
        v-if="displayField.out_type"
        prop="out_type"
        label="出库类型"
        width="120"
      >
        <template slot-scope="scope">
          {{ outTypeEnum[scope.row.out_type - 1] }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="displayField.updata_date"
        prop="updata_date"
        label="出库日期"
        :sortable="true"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            dataFormat(scope.row.updata_date)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="displayField.finish_date"
        prop="finish_date"
        label="完成日期"
        width="200"
        :sortable="true"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            dataFormat(scope.row.finish_date)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="displayField.nick"
        prop="nick"
        fixed="right"
        label="操作用户"
        width="100px"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { formatDate } from "@/utils";
export default {
  props: ["displayField"],
  data: function () {
    return {
      editData: {},
      outTypeEnum: ["退货", "加工成品", "损耗"],
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
      if (!date) return "xxxx-xx-xx xx:xx:xx";
      return formatDate(new Date(date));
    },
  },
};
</script>

<style>
</style>