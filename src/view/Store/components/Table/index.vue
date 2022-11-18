<template>
  <div>
    <el-table v-bind="$attrs" :stripe="true" style="width: 100%" height="700">
      <el-table-column prop="id" label="序号" width="80"> </el-table-column>
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="stock" label="库存" width="100" :sortable='true'> </el-table-column>
      <el-table-column prop="date" label="最近变动" width="250" :sortable='true'>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
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
      this.editData = row;
      this.showDialogFrom();
    },
    showDialogFrom: function () {
      this.dialogFromVisible = true;
    },
    closeDialogFrom: function () {
      this.dialogFromVisible = false;
    },
  },
};
</script>

<style>
</style>