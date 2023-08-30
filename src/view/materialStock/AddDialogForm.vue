<template>
  <el-dialog title="新增库存" :visible="visible" @close="close">
    <div class="container">
      <el-form
        :model="addData"
        label-position="left"
        label-width="100px"
        ref="addForm"
        :rules="rules"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="type">
          <el-input v-model="addData.type"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input
            class="el-input form-item"
            v-model.number="addData.price"
            placeholder="单价"
          ></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="stock">
          <el-input-number
            v-model="addData.stock"
            controls-position="right"
            :min="0"
          ></el-input-number>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="complete" type="primary">立即添加</el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["visible", "addData"],
  data: function () {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "请输入要添加库存的商品名称",
            trigger: "blur",
          },
        ],
        type: [
          {
            required: true,
            message: "请输入要添加库存的商品类型",
            trigger: "blur",
          },
        ],
        stock: [
          {
            required: true,
            message: "请输要入库的数量(数字)",
            trigger: "blur",
          },
        ],
        price: [
          {
            required: true,
            message: "请输要单价(数字)",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    close: function () {
      // 清空历史表单、重置校验
      this.addData.name = "";
      this.addData.stock = 0;
      this.addData.type = "";
      this.addData.price = 0;
      this.$refs["addForm"].resetFields();
      this.$emit("close");
    },
    complete: function () {
      // 表单校验
      this.$refs["addForm"].validate((valid) => {
        if (valid) {
          // 通过
          this.$emit("addStore");
        } else {
          // this.$message.warning(valid);
          this.$message.warning("请正确填写表单!");
        }
      });
    },
  },
  computed: {
    inner_visible: function () {
      return this.visible;
    },
  },
};
</script>

<style  scoped>
.container {
  padding: 10px 10px;
  width: 50%;
}
</style>