<template>
  <div>
    <TableFilter size="mini" @search="search" />
    <Table :data="stock" />
    <el-divider></el-divider>
    <div class="control">
      <el-button type="primary" class="button" @click="showDialogFrom"
        ><i class="el-icon-plus" style="font-size: 16px"></i>添加库存</el-button
      >
    </div>
    <AddDialogForm :visible="dialogFromVisible" @close="closeDialogFrom" />
  </div>
</template>

<script>
import TableFilter from "@/components/TableFilter";
import AddDialogForm from "./AddDialogForm";
import Table from "./components/Table";
import { mapState } from "vuex";
export default {
  components: { AddDialogForm, Table, TableFilter },
  data() {
    return {
      dialogFromVisible: false,
    };
  },
  computed: {
    ...mapState("store", ["stock"]),
  },
  methods: {
    showDialogFrom: function () {
      this.dialogFromVisible = true;
    },
    closeDialogFrom: function () {
      this.dialogFromVisible = false;
    },
    search: function (payload) {
      console.log(payload);
    },
  },
  mounted() {
    this.$store.dispatch("store/getStock");
    console.log(this);
  },
};
</script>


<style lang="less" scoped>
.control {
  margin-top: 20px;
  .button {
    float: right;
  }
}
</style>
