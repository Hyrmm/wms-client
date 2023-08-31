<template>
  <div class="warpper">
    <div class="table-filter">
      <TableFilter
        size="mini"
        @search="search"
        :nameFilter="true"
        :stockType="2"
      />
    </div>
    <div class="table">
      <Table
        :data="stock"
        v-loading="tableLoading"
        height="500"
        @editRow="editRow"
        @saveRow="saveRow"
        @cancleRow="cancleRow"
        @delRow="delRow"
      />
    </div>
    <div class="control">
      <el-button type="primary" class="button" @click="addFormDailogOpen"
        ><i class="el-icon-plus" style="font-size: 16px"></i>新增库存</el-button
      >
    </div>
    <div class="pagenation">
      <PagiNation
        :total="total"
        :page-size="20"
        :current-page="current_page"
        @current-change="currentPageChange"
      />
    </div>
    <AddDialogForm
      :addData="addData"
      :visible="addFormDailogVisible"
      @close="addFormDailogClose"
      @addStore="addStore"
    />
  </div>
</template>

<script>
import PagiNation from "@/components/PagiNation";
import TableFilter from "@/components/TableFilter";
import AddDialogForm from "./AddDialogForm";
import Table from "./components/Table";
import { mapState } from "vuex";
import { storeAddIndex } from "@/mixin";
import {
  addProductStore,
  editProductStore,
  delProductStore,
} from "@/api/store";
export default {
  name: "store",
  components: { AddDialogForm, Table, TableFilter, PagiNation },
  data() {
    return {
      addData: {
        stock: 0,
        materialRecipe: [
          { id: 0, materialNameType: [], amount: 0, stockId: 0 },
        ],
      },
      query: { name: "" },
      tableLoading: false,
    };
  },
  mixins: [storeAddIndex],
  computed: {
    ...mapState("store", {
      stock: (state) => state.productStock.data,
      current_page: (state) => state.productStock.current_page,
      total: (state) => state.productStock.total,
    }),
  },
  methods: {
    search: function (payload) {
      this.tableLoading = true;
      this.query.name = payload.name ? payload.name : "";
      this.$store
        .dispatch("store/getProductStock", {
          page: 1,
          name: this.query.name,
          type: 2,
        })
        .then(
          (data) => {
            this.tableLoading = false;
          },
          (error) => {
            this.tableLoading = false;
          }
        );
    },
    currentPageChange: function (curPage) {
      this.tableLoading = true;
      this.$store
        .dispatch("store/getProductStock", {
          page: curPage,
          name: this.query.name,
          type: 2,
        })
        .then(
          (data) => {
            this.tableLoading = false;
          },
          (error) => {
            this.tableLoading = false;
          }
        );
    },
    reflash: function () {
      this.tableLoading = true;
      this.$store
        .dispatch("store/getProductStock", {
          page: this.current_page,
          name: this.query.name,
          type: 2,
        })
        .then(
          (data) => {
            this.tableLoading = false;
          },
          (error) => {
            this.tableLoading = false;
          }
        );
    },
    async addStore() {
      let res = await addProductStore(this.addData);
      if (res.data.status == 200) {
        this.$message.success(res.data.msg);
        this.addFormDailogVisible = false;
        //刷新库存
        this.reflash();
        //跟新库存可选项
        this.$store.dispatch("store/getStoreOptions", { types: ["2"] });
      }
    },
    editRow(rowData) {
      if (rowData.isEdit == undefined) {
        this.$set(rowData, "isEdit", true);
        this.$set(rowData, "tempName", rowData.name);
        this.$set(rowData, "tempType", rowData.type);
        this.$set(rowData, "tempStock", rowData.stock);
      } else {
        rowData.isEdit = true;
        rowData.tempName = rowData.name;
        rowData.tempType = rowData.type;
        rowData.tempStock = rowData.stock;
      }
    },
    cancleRow(rowData) {
      rowData.isEdit = false;
    },
    async saveRow(rowData) {
      //提交更改到服务器,拦截是否有信息被改变 节流
      if (
        rowData.name != rowData.tempName ||
        rowData.type != rowData.tempType ||
        rowData.stock != rowData.tempStock
      ) {
        let res = await editProductStore({
          stockId: rowData.id,
          name: rowData.tempName,
          type: rowData.tempType,
          stock: rowData.tempStock,
        });
        if (res.data.status == 200) {
          //更新数据
          rowData.name = rowData.tempName;
          rowData.type = rowData.tempType;
          rowData.stock = rowData.tempStock;
          this.$message.success("修改成功");
          //跟新库存可选项
          this.$store.dispatch("store/getStoreOptions", { types: ["1"] });
          rowData.isEdit = false;
        }
      } else {
        rowData.isEdit = false;
      }
    },
    async delRow(rowData) {
      this.$confirm("是否确认执行删除操作?", "提示", {
        type: "warning",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      }).then(async () => {
        let res = await delProductStore({ stockId: rowData.id });
        if (res.data.status == 200) {
          //刷新
          this.reflash();
          this.$message.success("删除成功");
        }
      });
    },

    addFormDailogOpen() {
      this.addData.materialRecipe = [
        { id: 0, materialNameType: [], amount: 0, stockId: 0 },
      ];
      this.addFormDailogVisible = true;
    },
  },
  mounted() {
    this.tableLoading = true;
    this.$store.dispatch("store/getProductStock", { page: 1, type: 2 }).then(
      (data) => {
        this.tableLoading = false;
      },
      (error) => {
        this.tableLoading = false;
      }
    );
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
