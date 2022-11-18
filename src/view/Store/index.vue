<template>
  <div>
    <TableFilter size="mini" />
    <Table :data="tableData" />
    <el-divider></el-divider>
    <div class="control">
      <el-button type="primary" class="button" @click="showDialogFrom"
        ><i class="el-icon-plus" style="font-size: 16px"></i>添加库存</el-button
      >
    </div>
    <AddDialogForm :visible="dialogFromVisible" @close="closeDialogFrom" />
  </div>
</template>

<script>
import TableFilter from "@/components/TableFilter"
import AddDialogForm from "./AddDialogForm";
import Table from "./components/Table";
export default {
  components: { AddDialogForm, Table,TableFilter },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
          date: "2022-11-14 16:54",
        },
        {
          id: 2,
          name: "可乐",
          type: "320ml",
          stock: 6000,
          date: "2022-11-14 16:54",
        },
        {
          id: 3,
          name: "可乐",
          type: "320ml",
          stock: 6000,
          date: "2022-11-14 16:54",
        },
        {
          id: 4,
          name: "可乐",
          type: "320ml",
          stock: 6000,
          date: "2022-11-14 16:54",
        },
        {
          id: 5,
          name: "可乐",
          type: "320ml",
          stock: 6000,
          date: "2022-11-14 16:54",
        },
        {
          id: 6,
          name: "可乐",
          type: "320ml",
          stock: 6000,
          date: "2022-11-14 16:54",
        },
        {
          id: 7,
          name: "可乐",
          type: "320ml",
          stock: 6000,
          date: "2022-11-14 16:54",
        },
        {
          id: 8,
          name: "可乐",
          type: "320ml",
          stock: 6000,
          date: "2022-11-14 16:54",
        },
        {
          id: 9,
          name: "可乐",
          type: "320ml",
          stock: 6000,
          date: "2022-11-14 16:54",
        },
        {
          id: 10,
          name: "可乐",
          type: "320ml",
          stock: 6000,
          date: "2022-11-14 16:54",
        },
        {
          id: 11,
          name: "可乐",
          type: "320ml",
          stock: 6000,
          date: "2022-11-14 16:54",
        },
      ],
      dialogFromVisible: false,
    };
  },
  methods: {
    showDialogFrom: function () {
      this.dialogFromVisible = true;
    },
    closeDialogFrom: function () {
      this.dialogFromVisible = false;
    },
  },
};
</script>


<style lang="less" scoped>
.control {
  margin-top: 20px;
  .button {
    float: right;
  }
}
</style>
