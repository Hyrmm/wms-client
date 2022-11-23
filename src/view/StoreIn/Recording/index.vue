<template>
  <div>
    <TableFilter
      size="mini"
      :dateFilter="true"
      :nameFilter="true"
      :typeFilter="true"
      @search="search"
    />
    <Table :data="tabaleData.data" />
    <PagiNation
      :total="tabaleData.total"
      :page-size="20"
      :current-page="tabaleData.current_page"
      @current-change="currentPageChange"
    />
  </div>
</template>

<script>
import Table from "./components/Table";
import TableFilter from "@/components/TableFilter";
import PagiNation from "@/components/PagiNation";
import { getStockRecording } from "@/api/store";
export default {
  components: { Table, TableFilter, PagiNation },
  data: function () {
    return {
      tabaleData: {},
      query: {
        type: "in_order",
        page: 1,
        order_by: "id",
        direction: "ASC",
        filter_name: "",
        filter_date_start: "",
        filter_date_end: "",
        filter_type: "",
      },
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
      this.query.filter_date_start = payload.filter_date_end
        ? payload.filter_date_end
        : "";
      this.getTableData(this.query);
    },
    getTableData: async function (query) {
      let res = await getStockRecording(query);
      if (res.data.status == 200) {
        this.tabaleData = res.data;
      }
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

<style>
</style>