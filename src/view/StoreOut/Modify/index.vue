<template>
  <div class="warpper">
    <div class="table-filter">
      <TableFilter
        :nameFilter="true"
        :typeFilter="true"
        :transportStatusFilter="true"
        @search="search"
        size="mini"
      />
    </div>
    <div class="table">
      <Table
        :data="tableData.data"
        v-loading="tableLoading"
        @editRow="editRow"
        @saveRow="saveRow"
        @cancleRow="cancleRow"
        :row-class-name="tableRowClassName"
        height="500"
      />
    </div>
    <div class="pagenation">
      <PageNation
        :total="tableData.total"
        :page-size="20"
        :current-page="tableData.current_page"
        @current-change="currentPageChange"
      />
    </div>
  </div>
</template>

<script>
import Table from "./Table";
import TableFilter from "@/components/TableFilter";
import PageNation from "@/components/PagiNation";
import { getStockRecording, modifyOutStoreStatus } from "@/api/store";
export default {
  name: "modifyStoreOut",
  components: { Table, TableFilter, PageNation },
  data: function () {
    return {
      tableLoading: false,
      query: {
        type: "out_order",
        page: 1,
        order_by: "id",
        direction: "DESC",
        filter_name: "",
        filter_type: "",
        filter_date_start: "",
        filter_date_end: "",
        filter_transportStatus: "",
      },
      tableData: {},
    };
  },
  methods: {
    getTableData: async function (query) {
      this.tableLoading = true;
      let res = await getStockRecording(query).catch(
        (err) => (this.tableLoading = false)
      );
      if (res.data.status == 200) {
        //初始化必要数据
        res.data.data.forEach((item) => {
          item.isEdit = false;
          item.tempStatus = item.status;
          item.isHighlight = false;
        });
        this.tableData = res.data;
      }
      this.tableLoading = false;
    },
    search: function (payload) {
      //每次搜索前,重置当前页数为1
      this.query.page = 1;
      this.query.filter_name = payload.name;
      this.query.filter_type = payload.type;
      this.query.filter_transportStatus = payload.transport_status;
      this.getTableData(this.query);
    },
    editRow(rowData) {
      rowData.isEdit = true;
      rowData.tempStatus = rowData.status;
    },
    async saveRow(rowData) {
      //提交更改到服务器,拦截状态是否有所变动 节流
      if (rowData.status != rowData.tempStatus) {
        let result = await modifyOutStoreStatus({
          order_id: rowData.id,
          modify_status: this.getStatusId(rowData.tempStatus),
        });
        if (result.data.status == 200) {
          this.$message.success(result.data.msg);
          rowData.status = rowData.tempStatus;
          rowData.isHighlight = true;
          rowData.isEdit = false;
        }
      } else {
        rowData.isEdit = false;
      }
    },
    cancleRow(rowData) {
      rowData.isEdit = false;
    },
    currentPageChange(curPage) {
      this.query.page = curPage;
      this.getTableData(this.query);
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.isHighlight) {
        return "success-row";
      }
      return "";
    },
    getStatusId(status_name) {
      for (let item of this.$store.state.store.transportStatusOptions) {
        if (item.status_name == status_name) return item.id;
      }
      return "";
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