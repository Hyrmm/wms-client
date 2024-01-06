<template>
  <div class="warpper">
    <div class="table">
      <Table
        :data="productInStoreCache"
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
import { inStoreProduct } from "@/api/store";
export default {
  name: "addStore",
  components: { Table, AddFormDailog },
  data: function () {
    return {};
  },
  computed: {
    ...mapState("cache", ["productInStoreCache"]),
  },
  mixins: [storeAddIndex],
  methods: {
    removeRow(rowIndex) {
      this.$confirm("是否确认执行删除操作?", "提示", {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(() => {
        this.del_inStoreCache({ index: rowIndex, stockType: 2 });
        this.$message.success("删除成功");
      });
    },
    addRow(rowData) {
      rowData.stockType = 2;
      this.updata_inStoreCache(rowData);
    },
    postRecording() {
      this.post();
    },
    async post() {
      let finishCache = [];
      for await (let [index, row] of this.productInStoreCache.entries()) {
        if (row.checked && row.postStatus!="success") {
          try {
            let res = await inStoreProduct({
              stock_id: row.stock_id,
              amount: row.amount,
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
        this.del_inStoreCache({ index: this.productInStoreCache.indexOf(item),stockType:2 });
      }
    },
    editRow(rowData) {
      if (rowData.isEdit == undefined) {
        this.$set(rowData, "isEdit", true);
        this.$set(rowData, "tempName", rowData.name);
        this.$set(rowData, "tempType", rowData.type);
        this.$set(rowData, "tempAmount", rowData.amount);
        this.$set(rowData, "tempStockId", rowData.stock_id);
        this.$set(rowData, "tempUpdataDate", rowData.updata_date);
        //分割
        this.$set(rowData, "disabled", false);
        this.$set(rowData, "nameIndex", "");
      } else {
        rowData.isEdit = true;
        rowData.tempName = rowData.name;
        rowData.tempType = rowData.type;
        rowData.tempAmount = rowData.amount;
        rowData.tempStockId = rowData.stock_id;
        rowData.tempUpdataDate = rowData.updata_date;
      }
    },
    saveRow(rowData) {
      if (
        rowData.price != rowData.tempPrice ||
        rowData.updata_date != rowData.tempUpdataDate ||
        rowData.stock_id != rowData.tempStockId ||
        rowData.name != rowData.tempName ||
        rowData.type != rowData.tempType ||
        rowData.amount != rowData.tempAmount
      ) {
        //有变动
        rowData.name = rowData.tempName;
        rowData.type = rowData.tempType;
        rowData.amount = rowData.tempAmount;
        rowData.stock_id = rowData.tempStockId;
        rowData.updata_date = rowData.tempUpdataDate;
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