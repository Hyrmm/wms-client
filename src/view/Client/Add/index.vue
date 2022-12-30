<template>
  <div class="warpper">
    <div class="table">
      <Table
        height="500"
        :data="tableData"
        @cancleRow="cancleRow"
        @editRow="editRow"
        @saveRow="saveRow"
      />
    </div>
    <div class="control">
      <el-button icon="el-icon-plus" round type="primary" @click="addRow"
        >新增一条</el-button
      >
    </div>
  </div>
</template>

<script>
import Table from "./Table";
import { addClient } from "@/api/client";
export default {
  data: function () {
    return {
      tableData: [],
    };
  },
  components: { Table },
  methods: {
    addRow() {
      this.tableData.push({
        name: "",
        tel: "",
        address: "",
        isEdit: true,
        isSaved: false,
      });
    },
    editRow(rwoData) {
      rwoData.isEdit = true;
    },
    cancleRow(rwoData) {
      rwoData.isEdit = false;
    },
    async saveRow(rowData) {
      //验证为空
      if (!(rowData.name && rowData.tel && rowData.address)) {
        return this.$message.error("提交内容不可为空!");
      }
      let res = await addClient(rowData);
      if (res.data.status == 200) {
        //修改成功,修正页面数据且更新getClientOptions
        this.$store.dispatch("client/getClientOptions");
        this.$message.success(res.data.msg);
        rowData.isSaved = true;
        rowData.isEdit = false;
      }
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.warpper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .table-filter {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    padding: 15px;
  }
  .table {
    box-sizing: border-box;
    background-color: #fff;
    margin-top: 10px;
    border-radius: 10px;
    padding: 20px;
    overflow: hidden;
    flex: 1;
  }
  .control {
    box-sizing: border-box;
    display: flex;
    justify-content: right;
    background-color: #fff;
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
  }
  .pagenation {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    background-color: #fff;
    margin-top: 10px;
    border-radius: 10px;
    padding: 12px;
    overflow: hidden;
  }
}
</style>