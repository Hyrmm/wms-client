<template>
  <div  class="warpper">
    <div class="table"><Table :data="addData" @removeRow="removeRow" /></div>
    <AddFormDailog
      :visible="addFormDailogVisible"
      @close="addFormDailogClose"
      @addRow="addRow"
    />
    <div class="control">
      <el-button
        icon="el-icon-plus"
        round
        type="primary"
        @click="addFormDailogOpen"
        >新增一条</el-button
      >
      <el-button
        @click="postRecording"
        type="success"
        icon="el-icon-check"
        round
        >提交选中</el-button
      >
    </div>
  </div>
</template>

<script>
import Table from "./Table";
import AddFormDailog from "./AddFormDailog";
import { storeAddIndex } from "@/mixin";
export default {
  components: { Table, AddFormDailog },
  data: function () {
    return {};
  },
  computed: {},
  mixins: [storeAddIndex],
  methods: {
    postRecording() {
      this.post("inStore", ["stock_id", "price", "amount", "updata_date"]);
    },
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