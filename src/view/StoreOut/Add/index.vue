<template>
  <div class="warpper">
    <div class="table">
      <Table
        :data="outStoreCache"
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
import { outStore } from "@/api/store";
export default {
  name: "addStoreOut",
  components: { Table, AddFormDailog },
  data: function () {
    return {};
  },
  mixins: [storeAddIndex],
  computed: { ...mapState("cache", ["outStoreCache"]) },
  methods: {
    postRecording() {
      this.post("outStore", [
        "stock_id",
        "price",
        "amount",
        "another_fee",
        "client_id",
        "transport_status",
        "transport_order",
        "updata_date",
      ]);
    },
    addRow(rwoData) {
      this.updata_outStoreCache(rwoData);
    },
    editRow(rowData) {
      if (rowData.isEdit == undefined) {
        this.$set(rowData, "isEdit", true);
        this.$set(rowData, "tempAmount", rowData.amount);
        this.$set(rowData, "tempAnotherFee", rowData.another_fee);
        this.$set(rowData, "tempClientId", rowData.client_id);
        this.$set(rowData, "tempClientName", rowData.client_name);
        this.$set(rowData, "tempName", rowData.name);
        this.$set(rowData, "tempType", rowData.type);
        this.$set(rowData, "tempPrice", rowData.price);
        this.$set(rowData, "tempStockId", rowData.stock_id);
        this.$set(rowData, "tempTransportOrder", rowData.transport_order);
        this.$set(rowData, "tempTransportStatus", rowData.transport_status);
        this.$set(rowData, "tempUpdataDate", rowData.updata_date);
        this.$set(
          rowData,
          "tempTransportStatusLabel",
          rowData.transport_status_label
        );
        //分割
        this.$set(rowData, "disabled", false);
        this.$set(rowData, "nameIndex", "");
      } else {
        rowData.isEdit = true;
        rowData.tempAmount = rowData.amount;
        rowData.tempAnother_fee = rowData.another_fee;
        rowData.tempClientId = rowData.client_id;
        rowData.tempClientName = rowData.client_name;
        rowData.tempName = rowData.name;
        rowData.tempType = rowData.type;
        rowData.tempPrice = rowData.price;
        rowData.tempStockId = rowData.stock_id;
        rowData.tempTransportOrder = rowData.transport_order;
        rowData.tempTransportStatus = rowData.transport_status;
        rowData.tempTransportStatusLabel = rowData.transport_status_label;
      }
    },
    saveRow(rowData) {
      rowData.amount = rowData.tempAmount;
      rowData.another_fee = rowData.tempAnotherFee;
      rowData.client_id = rowData.tempClientId;
      rowData.client_name = rowData.tempClientName;
      rowData.name = rowData.tempName;
      rowData.type = rowData.tempType;
      rowData.price = rowData.tempPrice;
      rowData.stock_id = rowData.tempStockId;
      rowData.transport_order = rowData.tempTransportOrder;
      rowData.transport_status = rowData.tempTransportStatus;
      rowData.transport_status_label = rowData.tempTransportStatusLabel;
      rowData.isEdit = false;
      this.$message.success(JSON.stringify(rowData));
    },
    cancleRow(rowData) {
      rowData.isEdit = false;
    },
    async post() {
      let finishCache = [];
      for await (let row of this.outStoreCache) {
        if (row.checked) {
          try {
            let res = await outStore({
              stock_id: row.stock_id,
              price: row.price,
              amount: row.amount,
              another_fee: row.another_fee,
              client_id: row.client_id,
              transport_status: row.transport_status,
              transport_order: row.transport_order,
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
        this.del_outStoreCache({ index: this.outStoreCache.indexOf(item) });
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