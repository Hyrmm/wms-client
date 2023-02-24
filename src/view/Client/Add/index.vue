<template>
  <div class="warpper">
    <div class="table">
      <Table
        :data="addClientCache"
        @cancleRow="cancleRow"
        @editRow="editRow"
        @saveRow="saveRow"
        @delRow="delRow"
      />
    </div>
    <div class="control">
      <el-button icon="el-icon-plus" type="primary" @click="addFormDailogOpen"
        >新增一条</el-button
      >
      <el-button @click="postRecording" type="success" icon="el-icon-check"
        >提交选中</el-button
      >
    </div>
    <AddFormDailog
      :visible="addFormDailogVisible"
      @close="addFormDailogClose"
      @addRow="addRow"
    />
  </div>
</template>

<script>
import Table from "./Table";
import AddFormDailog from "./AddFormDailog";
import { addClient } from "@/api/client";
import { mapState, mapMutations } from "vuex";
export default {
  name: "addClient",
  data: function () {
    return {
      tableData: [],
      addFormDailogVisible: false,
    };
  },
  components: { Table, AddFormDailog },
  computed: {
    ...mapState("cache", ["addClientCache"]),
  },
  methods: {
    addFormDailogOpen() {
      this.addFormDailogVisible = true;
    },
    addFormDailogClose() {
      this.addFormDailogVisible = false;
    },
    addRow(rowData) {
      this.updata_addClientCache(rowData);
    },
    editRow(rowData) {
      if (rowData.isEdit == undefined) {
        this.$set(rowData, "isEdit", true);
        this.$set(rowData, "tempName", rowData.name);
        this.$set(rowData, "tempPhone", rowData.phone);
        this.$set(rowData, "tempAddress", rowData.address);
      } else {
        rowData.isEdit = true;
        rowData.tempName = rowData.name;
        rowData.tempPhone = rowData.phone;
        rowData.tempAddress = rowData.address;
      }
    },
    cancleRow(rwoData) {
      rwoData.isEdit = false;
    },
    delRow(rowIndex) {
      this.$confirm("是否确认执行删除操作?", "提示", {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        this.del_addClientCache({ index: rowIndex });
        this.$message.success("删除成功");
      });
    },
    saveRow(rowData) {
      rowData.name = rowData.tempName;
      rowData.phone = rowData.tempPhone;
      rowData.address = rowData.tempAddress;
      rowData.isEdit = false;
    },
    postRecording() {
      this.post();
    },
    async post() {
      let finishCache = [];
      for await (let row of this.addClientCache) {
        if (row.checked) {
          try {
            let res = await addClient({
              name: row.name,
              tel: row.phone,
              address: row.address,
            });
            if (res.data.status == 200) {
              finishCache.push(row);
              row.postStatus = "success";
            } else {
              row.postStatus = "fail";
            }
          } catch {
            row.postStatus = "fail";
          }
        }
      }
      //移除已完成的缓存的记录
      for (let item of finishCache) {
        this.del_addClientCache({ index: this.addClientCache.indexOf(item) });
      }
    },
    ...mapMutations("cache", ["updata_addClientCache", "del_addClientCache"]),
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