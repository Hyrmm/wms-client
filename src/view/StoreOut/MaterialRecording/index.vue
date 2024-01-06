<template>
  <div class="warpper">
    <div class="table-filter">
      <TableFilter
        size="mini"
        :dateFilter="true"
        :nameFilter="true"
        :typeFilter="true"
        :out_type="true"
        :clientNameFilter="true"
        :stockType="1"
        :client_type="1"
        @search="search"
      />
    </div>
    <div class="view-filter">
      <ViewFilter
        :name="true"
        :type="true"
        :amount="true"
        :updata_date="true"
        :nick="true"
        :client="true"
        :price="true"
        :client_tel="true"
        :client_address="true"
        :out_type="true"
        :defaultChecked="defaultChecked"
        @change="checkedChange"
      />
    </div>
    <div class="table">
      <Table
        :data="tableData.data"
        v-loading="tableLoading"
        height="500"
        :displayField="displayField"
        :stripe="true"
        :highlight-current-row="true"
        ref="table"
      />
    </div>
    <div class="pagenation">
      <PagiNation
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
import PagiNation from "@/components/PagiNation";
import ViewFilter from "@/components/ViewFilter";
import { getMaterialStockRecording } from "@/api/store";
export default {
  name: "materialRecordingStoreOut",
  components: { Table, TableFilter, ViewFilter, PagiNation },
  data: function () {
    return {
      displayField: {
        name: true,
        type: true,
        amount: true,
        updata_date: true,
        nick: true,
        out_type: true,
        client: true,
        price: true,
        client_tel: false,
        client_address: false,
      },
      defaultChecked: [
        "name",
        "type",
        "amount",
        "price",
        "updata_date",
        "nick",
        "client",
      ],
      tableData: {},
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
        filter_clientId: "",
        filter_clientName: "",
        out_type: "",
      },
    };
  },
  methods: {
    getTableData: async function (query) {
      this.tableLoading = true;
      let res = await getMaterialStockRecording(query).catch(
        (err) => (this.tableLoading = false)
      );
      if (res.data.status == 200) {
        this.tableData = res.data;
      }
      this.tableLoading = false;
    },
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
      this.query.filter_clientName = payload.client_name;
      this.query.out_type = payload.out_type ? payload.out_type : "";
      this.getTableData(this.query);
    },
    currentPageChange: function (curPage) {
      this.query.page = curPage;
      this.getTableData(this.query);
    },
    checkedChange: function (checkedArr) {
      for (let key in this.displayField) {
        if (checkedArr.includes(key)) {
          this.displayField[key] = true;
        } else {
          this.displayField[key] = false;
        }
        this.$nextTick(() => {
          this.$refs["table"].$refs["table"].doLayout();
        });
      }
    },
  },
  mounted() {
    console.log(this.defaultChecked)
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
  .view-filter {
    margin-top: 10px;
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