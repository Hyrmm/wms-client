<template>
  <div>
    <TableFilter size="mini" @search="search" :nameFilter="true" />
    <Table :data="stock" />
    <el-divider></el-divider>
    <div class="control">
      <PagiNation />
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
      this.$store.dispatch("store/getStock", { page: 1, name: payload.name });
    },
  },
  mounted() {
    this.$store.dispatch("store/getStock", { page: 1 });
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
