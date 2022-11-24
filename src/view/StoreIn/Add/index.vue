<template>
  <div>
    <Table :data="addData" @removeRow="removeRow" />
    <AddFormDailog
      :visible="addFormDailogVisible"
      @close="addFormDailogClose"
      @addRow="addRow"
    />
    <div class="control-warpper">
      <el-button
        icon="el-icon-plus"
        round
        type="primary"
        @click="addFormDailogOpen"
        >新增一条</el-button
      >
      <el-button type="success" icon="el-icon-check" round>提交新增</el-button>
    </div>
  </div>
</template>

<script>
import Table from "./Table";
import AddFormDailog from "./AddFormDailog";
export default {
  components: { Table, AddFormDailog },
  data: function () {
    return {
      addData: [],
      addFormDailogVisible: false,
    };
  },
  methods: {
    addFormDailogClose() {
      this.addFormDailogVisible = false;
    },
    addFormDailogOpen() {
      this.addFormDailogVisible = true;
    },
    addRow(rwoData) {
      console.log(rwoData);
      this.addData.push(rwoData);
    },
    removeRow(rowIndex, rowData) {
      this.$confirm("是否确认执行删除操作?", "提示", {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        this.addData.splice(rowIndex, 1);
        this.$message.success("删除成功");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.control-warpper {
  margin-top: 50px;
  display: flex;
  justify-content: right;
}
</style>