<template>
  <div>
    <el-table v-bind="$attrs" :stripe="true" style="width: 100%" height="600">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag
            style="margin-right: 10px"
            v-for="(item, index) in JSON.parse(scope.row.materialRecipe)"
            :key="index"
            type="success"
            effect="plain"
            sizi="mideum"
            >{{ getMaterialNameType(item.stockId)[0] }}/{{
              getMaterialNameType(item.stockId)[1]
            }}
            X {{ item.amount }}</el-tag
          >
        </template>
      </el-table-column>

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
        label="单个成本"
        width="120"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="total_cost"
        label="总成本"
        width="120"
        :sortable="true"
      ></el-table-column>
      <el-table-column
        prop="updata_date"
        label="日期"
        width="250"
        :sortable="true"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            dataFormat(scope.row.updata_date)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="nick" fixed="right" label="操作用户" width="100">
        <!-- <template slot-scope="scope">
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
        </template> -->
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
import { formatDate } from "@/utils";
import EditDialogForm from "./EditDialogForm";
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
    getMaterialNameType(stockId) {
      for (const item of this.$store.state.store.materialStock.data) {
        if (item.id == stockId) return [item.name, item.type];
      }
      return [];
    },
  },
};
</script>

<style>
</style>