<template>
  <div>
    <Table :data="addData" @removeRow="removeRow" />
    <AddFormDailog
      :visible="addFormDailogVisible"
      @close="addFormDailogClose"
      @addRow="addRow"
    />
    <div class="control-warpper">
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
.control-warpper {
  margin-top: 50px;
  display: flex;
  justify-content: right;
}
</style>