<template>
  <div class="warpper">
    <div class="table">
      <Table
        :data="productOutStoreCache"
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
      <el-button type="success" icon="el-icon-check" @click="postRecording"
        >提交选中</el-button
      >
    </div>
  </div>
</template>

<script>
import Table from "./Table";
import AddFormDailog from "./AddFormDailog";
import { mapMutations, mapState } from "vuex";
import { storeAddIndex } from "@/mixin";
import { outStoreProduct } from "@/api/store";
export default {
  name: "addStoreOut",
  components: { Table, AddFormDailog },
  data: function () {
    return {};
  },
  mixins: [storeAddIndex],
  computed: { ...mapState("cache", ["productOutStoreCache"]) },
  methods: {
    postRecording() {
      this.post("outStore", [
        "stock_id",
        "price",
        "amount",
        "client_id",
        "updata_date",
      ]);
    },
    addRow(rowData) {
      rowData.stockType = 2;
      this.updata_outStoreCache(rowData);
    },
    editRow(rowData) {
      if (rowData.isEdit == undefined) {
        this.$set(rowData, "isEdit", true);
        this.$set(rowData, "tempAmount", rowData.amount);
        this.$set(rowData, "tempClientId", rowData.client_id);
        this.$set(rowData, "tempClientName", rowData.client_name);
        this.$set(rowData, "tempName", rowData.name);
        this.$set(rowData, "tempType", rowData.type);
        this.$set(rowData, "tempPrice", rowData.price);
        this.$set(rowData, "tempStockId", rowData.stock_id);
        this.$set(rowData, "tempUpdataDate", rowData.updata_date);
        //分割
        this.$set(rowData, "disabled", false);
        this.$set(rowData, "nameIndex", "");
      } else {
        rowData.isEdit = true;
        rowData.tempAmount = rowData.amount;
        rowData.tempClientId = rowData.client_id;
        rowData.tempClientName = rowData.client_name;
        rowData.tempName = rowData.name;
        rowData.tempType = rowData.type;
        rowData.tempPrice = rowData.price;
        rowData.tempStockId = rowData.stock_id;
      }
    },
    saveRow(rowData) {
      rowData.amount = rowData.tempAmount;
      rowData.client_id = rowData.tempClientId;
      rowData.client_name = rowData.tempClientName;
      rowData.name = rowData.tempName;
      rowData.type = rowData.tempType;
      rowData.price = rowData.tempPrice;
      rowData.stock_id = rowData.tempStockId;
      rowData.isEdit = false;
      this.$message.success(JSON.stringify(rowData));
    },
    cancleRow(rowData) {
      rowData.isEdit = false;
    },
    async post() {
      let finishCache = [];
      for await (let row of this.productOutStoreCache) {
        if (row.checked) {
          try {
            let res = await outStoreProduct({
              stock_id: row.stock_id,
              price: row.price * row.amount,
              amount: row.amount,
              client_id: row.client_id,
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
        this.del_outStoreCache({
          index: this.productOutStoreCache.indexOf(item),
          stockType: 2,
        });
      }
    },
    ...mapMutations("cache", ["updata_outStoreCache", "del_outStoreCache"]),
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