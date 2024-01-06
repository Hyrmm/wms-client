<template>
  <div class="warpper">
    <div class="table-filter">
      <TableFilter
        size="mini"
        :dateFilter="true"
        :nameFilter="true"
        :typeFilter="true"
        :stockType="2"
        @search="search"
      />
    </div>
    <div class="table">
      <Table :data="tabaleData.data" v-loading="tableLoading" height="500" />
    </div>
    <div class="pagenation">
      <PagiNation
        :total="tabaleData.total"
        :page-size="20"
        :current-page="tabaleData.current_page"
        @current-change="currentPageChange"
      />
    </div>
  </div>
</template>

<script>
import Table from "./components/Table";
import TableFilter from "@/components/TableFilter";
import PagiNation from "@/components/PagiNation";
import { getProductStockRecording } from "@/api/store";
export default {
  name: "productRecordingStoreIn",
  components: { Table, TableFilter, PagiNation },
  data: function () {
    return {
      tabaleData: {},
      query: {
        type: "in_order",
        page: 1,
        order_by: "id",
        direction: "DESC",
        filter_name: "",
        filter_date_start: "",
        filter_date_end: "",
        filter_type: "",
      },
      tableLoading: false,
    };
  },
  methods: {
    search: async function (payload) {
      //每次搜索前,重置当前页数为1
      this.query.page = 1;
      this.query.filter_name = payload.name ? payload.name : "";
      this.query.filter_type = payload.type ? payload.type : "";
      this.query.filter_date_start = payload.filter_date_start
        ? payload.filter_date_start
        : "";
      this.query.filter_date_end = payload.filter_date_end
        ? payload.filter_date_end
        : "";
      this.getTableData(this.query);
    },
    getTableData: async function (query) {
      this.tableLoading = true;
      let res = await getProductStockRecording(query);
      if (res.data.status == 200) {
        this.tabaleData = res.data;
      }
      this.tableLoading = false;
    },
    currentPageChange: function (curPage) {
      this.query.page = curPage;
      this.getTableData(this.query);
    },
  },
  mounted() {
    this.getTableData(this.query);
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