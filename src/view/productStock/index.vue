<template>
  <div class="warpper">
    <div class="table-filter">
      <TableFilter size="mini" @search="search" :nameFilter="true" :stockType="2" :nullStock="true"
        @nullStockChange="nullStockChange" />
    </div>
    <div class="table">
      <Table :data="stock" v-loading="tableLoading" height="500" @editRow="editRow" @saveRow="saveRow"
        @cancleRow="cancleRow" @delRow="delRow" />
    </div>
    <div class="control">
      <el-button type="primary" class="button" @click="addFormDailogOpen"><i class="el-icon-plus"
          style="font-size: 16px"></i>新增库存</el-button>
      <el-button type="primary" class="button" @click="exportExcel"><i class="el-icon-plus"
          style="font-size: 16px"></i>导出库存（Excel）</el-button>
    </div>
    <div class="pagenation">
      <PagiNation :total="total" :page-size="20" :current-page="current_page" @current-change="currentPageChange" />
    </div>
    <AddDialogForm :addData="addData" :visible="addFormDailogVisible" @close="addFormDailogClose" @addStore="addStore" />
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
import { writeFileXLSX, utils } from 'xlsx';
export default {
  name: "productStock",
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
      allProductStock: (state) => state.allProductStock
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
          nullStock: this.query.nullStock,
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
          nullStock: this.query.nullStock,
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
          nullStock: this.query.nullStock,
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
        this.$set(rowData, "tempDes", rowData.des);
      } else {
        rowData.isEdit = true;
        rowData.tempName = rowData.name;
        rowData.tempType = rowData.type;
        rowData.tempStock = rowData.stock;
        rowData.tempDes = rowData.des;
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
        rowData.stock != rowData.tempStock ||
        rowData.des != rowData.tempDes
      ) {
        let res = await editProductStore({
          stockId: rowData.id,
          name: rowData.tempName,
          type: rowData.tempType,
          stock: rowData.tempStock,
          des: rowData.tempDes,
        });
        if (res.data.status == 200) {
          //更新数据
          rowData.name = rowData.tempName;
          rowData.type = rowData.tempType;
          rowData.stock = rowData.tempStock;
          rowData.des = rowData.tempDes;
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

    nullStockChange(checked) {
      this.query.nullStock = checked
    },

    exportExcel() {
      const dataForm = [["成品名称", "成品类型", "成品库存", "成品单个原料配方", "成品单成本", "成品总成本"]]

      for (const productStock of this.allProductStock.data) {
        const materialRecipe = JSON.parse(productStock.materialRecipe)

        let recipes = ''
        for (const recipe of materialRecipe) {
          if (recipes) {
            recipes += `、[${recipe.materialNameType[0]}/${recipe.materialNameType[1]}X${recipe.amount}]`
          } else {
            recipes += `[${recipe.materialNameType[0]}/${recipe.materialNameType[1]}X${recipe.amount}]`
          }

        }

        dataForm.push([productStock.name, productStock.type, productStock.stock, recipes, productStock.price, (productStock.stock * productStock.price).toFixed(2)])
      }

      const ws = utils.json_to_sheet(dataForm, { skipHeader: true });
      const wb = utils.book_new()
      utils.book_append_sheet(wb, ws, `成品总库存明细`)
      const dateNow = new Date()
      const exportData = `${dateNow.getFullYear()}.${dateNow.getMonth() + 1}.${dateNow.getDate()}(${dateNow.getHours()}时${dateNow.getMinutes()}分)`
      writeFileXLSX(wb, `成品总库存明细${exportData}.xlsx`)
    }
  },
  mounted() {
    this.tableLoading = true;
    this.$store.dispatch("store/getProductStock", { page: 1, type: 2, nullStock: this.query.nullStock }).then(
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
