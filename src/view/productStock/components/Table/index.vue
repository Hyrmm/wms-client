<template>
  <div>
    <el-table v-bind="$attrs" :stripe="true" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-tag
            style="margin-right: 10px"
            v-for="(item, index) in scope.row.materialRecipe"
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
      <el-table-column prop="index" label="#" width="100"> </el-table-column>
      <el-table-column prop="name" label="名称">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.tempName"
          ></el-input>
          <div v-else>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.tempType"
          ></el-input>
          <div v-else>{{ scope.row.type }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="stock" label="库存" width="100" :sortable="true">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.tempStock"
          ></el-input>
          <div v-else>{{ scope.row.stock }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="单个成本"
        width="160"
        :sortable="true"
      >
        <template slot-scope="scope">
          {{ scope.row.price ? scope.row.price : 0 }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="总成本" width="160" :sortable="true">
        <template slot-scope="scope">
          <div>{{ scope.row.price * scope.row.stock }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="last_updata" label="备注" :sortable="true">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.isEdit"
            v-model="scope.row.tempDes"
          ></el-input>
          <div v-else>{{ scope.row.des ? scope.row.des : "无备注" }}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="last_updata"
        label="最近变动"
        width="250"
        :sortable="true"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{
            dataFormat(scope.row.last_updata)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
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
  </div>
</template>

<script>
import { formatDate } from "@/utils";
export default {
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

<style scoped>
.edit-btn {
  padding: 4px 8px;
}
</style>