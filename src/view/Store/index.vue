<template>
  <div>
    <TableFilter size="mini" @search="search" :nameFilter="true" />
    <Table :data="stock" v-loading="tableLoading" />
    <el-divider></el-divider>
    <div class="control">
      <PagiNation
        :total="total"
        :page-size="20"
        :current-page="current_page"
        @current-change="currentPageChange"
      />
      <el-button type="primary" class="button" @click="showDialogFrom"
        ><i class="el-icon-plus" style="font-size: 16px"></i>添加库存</el-button
      >
    </div>
    <AddDialogForm :visible="dialogFromVisible" @close="closeDialogFrom" />
  </div>
</template>

<script>
import PagiNation from "@/components/PagiNation";
import TableFilter from "@/components/TableFilter";
import AddDialogForm from "./AddDialogForm";
import Table from "./components/Table";
import { mapState } from "vuex";
export default {
  components: { AddDialogForm, Table, TableFilter, PagiNation },
  data() {
    return {
      dialogFromVisible: false,
      query: { name: "" },
      tableLoading: false,
    };
  },
  computed: {
    ...mapState("store", {
      stock: (state) => state.stock.data,
      current_page: (state) => state.stock.current_page,
      total: (state) => state.stock.total,
    }),
  },
  methods: {
    showDialogFrom: function () {
      this.dialogFromVisible = true;
    },
    closeDialogFrom: function () {
      this.dialogFromVisible = false;
    },
    search: function (payload) {
      this.tableLoading = true;
      this.query.name = payload.name ? payload.name : "";
      this.$store
        .dispatch("store/getStock", {
          page: 1,
          name: this.query.name,
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
        .dispatch("store/getStock", {
          page: curPage,
          name: this.query.name,
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
  },
  mounted() {
    this.tableLoading = true;
    this.$store.dispatch("store/getStock", { page: 1 }).then(
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
.control {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .button {
    float: right;
  }
}
</style>
