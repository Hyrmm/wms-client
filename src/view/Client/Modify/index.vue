<template>
  <div class="warpper">
    <div class="table-filter">
      <TableFilter
        :clientNameFilter="true"
        :client_type="true"
        @search="search"
      />
    </div>
    <div class="table">
      <Table
        :data="tableData.data"
        height="500"
        @editRow="editRow"
        @saveRow="saveRow"
        @cancleRow="cancleRow"
        @delRow="delRow"
        v-loading="tableLoading"
      />
    </div>
    <div class="control"></div>
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
import { getClient, modifyClient, delClient } from "@/api/client";
export default {
  name: "modifyClient",
  data: function () {
    return {
      tableLoading: false,
      tableData: {},
      query: {
        page: 1,
        filter_name: "",
        client_type: "",
      },
    };
  },
  components: { Table, TableFilter, PageNation },
  methods: {
    search(payload) {
      //重置当前页数为1
      this.query.page = 1;
      this.query.filter_name = payload.client_name;
      this.query.client_type = payload.client_type;
      this.getTableData();
    },
    async getTableData() {
      this.tableLoading = true;
      let res = await getClient(this.query).catch(
        (err) => (this.tableLoading = false)
      );
      if (res.data.status == 200) {
        res.data.data.forEach((rowData) => {
          rowData.isEdit = false;
          rowData.tempName = rowData.name;
          rowData.tempTel = rowData.tel;
          rowData.tempAddress = rowData.address;
        });
        this.tableData = res.data;
      }
      this.tableLoading = false;
    },
    currentPageChange(curPage) {
      this.query.page = curPage;
      this.getTableData();
    },
    //编辑表格方法
    editRow(rowData) {
      rowData.isEdit = true;
      rowData.tempName = rowData.name;
      rowData.tempTel = rowData.tel;
      rowData.tempAddress = rowData.address;
    },
    cancleRow(rowData) {
      rowData.isEdit = false;
    },
    async delRow(rowData) {
      this.$confirm("此操作将永久删除该客户信息, 是否继续?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async (resolve) => {
          //确认操作
          let res = await delClient({ client_id: rowData.id });
          if (res.data.status == 200) {
            //刷新当前页
            this.$message.success(res.data.msg);
            this.getTableData(this.query);
          }
        })
        .catch((reject) => {
          //取消操作
        });
    },
    async saveRow(rowData) {
      //提交更改到服务器,拦截是否有信息被改变 节流
      if (
        rowData.name != rowData.tempName ||
        rowData.tel != rowData.tempTel ||
        rowData.address != rowData.tempAddress
      ) {
        let result = await modifyClient({
          client_id: rowData.id,
          modify_name: rowData.tempName,
          modify_tel: rowData.tempTel,
          modify_address: rowData.tempAddress,
        });
        if (result.data.status == 200) {
          //修改成功,修正页面数据且更新getClientOptions
          this.$store.dispatch("client/getClientOptions");
          this.$message.success(result.data.msg);
          rowData.name = rowData.tempName;
          rowData.tel = rowData.tempTel;
          rowData.address = rowData.tempAddress;
          rowData.isEdit = false;
        }
      } else {
        rowData.isEdit = false;
      }
    },
  },
  mounted() {
    this.getTableData();
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