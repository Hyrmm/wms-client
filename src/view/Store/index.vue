<template>
  <div>
    <el-table :data="tableData" :stripe="true" style="width: 100%" height="600">
      <el-table-column prop="id" label="序号" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="type" label="类型"> </el-table-column>
      <el-table-column prop="stock" label="库存"> </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div class="control">
      <el-button type="primary" class="button" @click="showDialogFrom"
        ><i class="el-icon-plus" style="font-size: 16px"></i
      ></el-button>
    </div>
    <DialogFrom :visible.sync="visible" />
  </div>
</template>

<script>
import DialogFrom from "@/components/DialogForm";
export default {
  components: { DialogFrom },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
        {
          id: 1,
          name: "可乐",
          type: "220ml",
          stock: 5000,
        },
        {
          id: 2,
          name: "可乐",
          type: "550ml",
          stock: 2000,
        },
      ],
      visible: false,
    };
  },
  methods: {
    showDialogFrom: function () {
      this.visible = true;
    },
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
