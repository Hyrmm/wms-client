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
      <el-button type="primary" class="button" @click="addFormDailogOpen"
        ><i class="el-icon-plus" style="font-size: 16px"></i>新增库存</el-button
      >
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
import { addStore } from "@/api/store";
export default {
  components: { AddDialogForm, Table, TableFilter, PagiNation },
  data() {
    return {
      addData: {},
      query: { name: "" },
      tableLoading: false,
    };
  },
  mixins: [storeAddIndex],
  computed: {
    ...mapState("store", {
      stock: (state) => state.stock.data,
      current_page: (state) => state.stock.current_page,
      total: (state) => state.stock.total,
    }),
  },
  methods: {
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
    reflash: function () {
      this.tableLoading = true;
      this.$store
        .dispatch("store/getStock", { page: 1, name: this.query.name })
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
      let res = await addStore(this.addData);
      if (res.data.status == 200) {
        this.$message.success(res.data.msg);
        this.addFormDailogVisible = false;
        this.reflash();
      }
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
