<template>
  <div class="warpper">
    <div class="table">
      <Table
        :data="inStoreCache"
        @delRow="removeRow"
        @editRow="editRow"
        @cancleRow="cancleRow"
        @saveRow="saveRow"
      />
    </div>
    <AddFormDailog
      :visible="addFormDailogVisible"
      @close="addFormDailogClose"
      @addRow="addRow"
    />
    <div class="control">
      <el-button icon="el-icon-plus" type="primary" @click="addFormDailogOpen"
        >新增一条</el-button
      >
      <el-button @click="postRecording" type="success" icon="el-icon-check"
        >提交选中</el-button
      >
    </div>
  </div>
</template>

<script>
import Table from "./Table";
import AddFormDailog from "./AddFormDailog";
import { storeAddIndex } from "@/mixin";
import { mapMutations, mapState } from "vuex";
import { inStoreMaterial } from "@/api/store";
export default {
  name: "addStore",
  components: { Table, AddFormDailog },
  data: function () {
    return {};
  },
  computed: {
    ...mapState("cache", ["inStoreCache"]),
  },
  mixins: [storeAddIndex],
  methods: {
    removeRow(rowIndex) {
      this.$confirm("是否确认执行删除操作?", "提示", {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        this.del_inStoreCache({ index: rowIndex });
        this.$message.success("删除成功");
      });
    },
    addRow(rwoData) {
      this.updata_inStoreCache(rwoData);
    },
    postRecording() {
      this.post();
    },
    async post() {
      let finishCache = [];
      for await (let [index, row] of this.inStoreCache.entries()) {
        if (row.checked) {
          try {
            let res = await inStoreMaterial({
              stock_id: row.stock_id,
              price: row.price,
              amount: row.amount,
              client_id: row.client_id,
              client_name: row.client_name,
              updata_date: row.updata_date,
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
        this.del_inStoreCache({ index: this.inStoreCache.indexOf(item) });
      }
    },
    editRow(rowData) {
      if (rowData.isEdit == undefined) {
        this.$set(rowData, "isEdit", true);
        this.$set(rowData, "tempName", rowData.name);
        this.$set(rowData, "tempType", rowData.type);
        this.$set(rowData, "tempAmount", rowData.amount);
        this.$set(rowData, "tempPrice", rowData.price);
        this.$set(rowData, "tempStockId", rowData.stock_id);
        this.$set(rowData, "tempUpdataDate", rowData.updata_date);
        this.$set(rowData, "tempClientId", rowData.client_id);
        this.$set(rowData, "tempClientName", rowData.client_name);
        //分割
        this.$set(rowData, "disabled", false);
        this.$set(rowData, "nameIndex", "");
      } else {
        rowData.isEdit = true;
        rowData.tempName = rowData.name;
        rowData.tempType = rowData.type;
        rowData.tempAmount = rowData.amount;
        rowData.tempPrice = rowData.price;
        rowData.tempStockId = rowData.stock_id;
        rowData.tempUpdataDate = rowData.updata_date;
        rowData.tempClientId = rowData.client_id;
        rowData.tempClientName = rowData.client_name;
      }
    },
    saveRow(rowData) {
      if (
        rowData.amount != rowData.tempAmount ||
        rowData.price != rowData.tempPrice ||
        rowData.updata_date != rowData.tempUpdataDate ||
        rowData.stock_id != rowData.tempStockId ||
        rowData.name != rowData.tempName ||
        rowData.type != rowData.tempType ||
        rowData.client_id != rowData.tempClientId ||
        rowData.client_name != rowData.tempClientName
      ) {
        //有变动
        rowData.price = rowData.tempPrice;
        rowData.name = rowData.tempName;
        rowData.type = rowData.tempType;
        rowData.amount = rowData.tempAmount;
        rowData.stock_id = rowData.tempStockId;
        rowData.updata_date = rowData.tempUpdataDate;
        rowData.totalCost = rowData.tempAmount * rowData.tempPrice;
        rowData.client_id = rowData.tempClientId;
        rowData.client_name = rowData.tempClientName;
        rowData.isEdit = false;
      } else {
        //无修改变动啥的不干
        rowData.isEdit = false;
      }
    },
    cancleRow(rowData) {
      rowData.isEdit = false;
    },
    ...mapMutations("cache", ["updata_inStoreCache", "del_inStoreCache"]),
  },
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