<template>
  <el-table v-bind="$attrs" style="width: 100%" class="edit-table">
    <el-table-column prop="index" label="#" width="50"></el-table-column>
    <el-table-column prop="name" label="名称"></el-table-column>
    <el-table-column prop="type" label="类型"> </el-table-column>
    <el-table-column prop="client" label="客户" width="80"> </el-table-column>
    <el-table-column prop="updata_date" label="出货日期" width="180">
      <template slot-scope="scope">
        <div>{{ dateFormat(scope.row.updata_date) }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="订单状态" width="200">
      <template slot-scope="scope">
        <div v-if="!scope.row.isEdit">
          <el-tag
            :type="getTagStyle(scope.row.status_id)"
            :disable-transitions="true"
            >{{ scope.row.status }}</el-tag
          >
        </div>
        <div v-else>
          <el-select
            v-model="scope.row.tempStatus"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="item in transportStatusOptions"
              :key="item.id"
              :label="item.status_name"
              :value="item.status_name"
            >
            </el-option>
          </el-select>
        </div>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="transport_order" label="物流单号">
      <template slot-scope="scope">
        <div class="transport-order">{{ scope.row.transport_order }}</div>
      </template>
    </el-table-column> -->

    <el-table-column prop="fuck" label="操作 " width="180">
      <template slot-scope="scope">
        <el-button
          v-if="!scope.row.isEdit"
          type="primary"
          size="mini"
          class="edit-btn"
          icon="el-icon-edit"
          @click="$emit('editRow', scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="scope.row.isEdit"
          type="success"
          size="mini"
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
import { mapState } from "vuex";
import { formatDate } from "@/utils";
export default {
  computed: {
    ...mapState("store", ["transportStatusOptions"]),
    // transportStatus() {
    //   for (let item of this.transportStatusOptions) {
    //     if (item.status_name == this.addForm.transportStatusLabel) {
    //       return item.id;
    //     }
    //   }
    // },
    getTagStyle() {
      return (transportStatusId) => {
        switch (transportStatusId) {
          case 1:
            return "danger";
          case 2:
            return "warning";
          case 3:
            return "success";
        }
      };
    },
  },
  methods: {
    dateFormat(date) {
      return formatDate(new Date(date));
    },
  },
};
</script>
<style lang="less">
// .edit-table {
//   .el-table__row {
//     background-color: #dcdfe6;
//   }
// }
.el-table .success-row {
  background: #f0f9eb;
}
</style>
<style lang="less" scoped>
.edit-btn {
  padding: 4px 8px;
}
.transport-order {
  overflow: hidden;
  white-space: nowrap;
  word-break: normal;
  text-overflow: ellipsis;
}
</style>