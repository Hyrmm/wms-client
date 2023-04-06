<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    @closed="closed"
    title="添加客户"
  >
    <div class="container">
      <el-form
        :model="addForm"
        label-position="left"
        label-width="100px"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            class="form-item"
            v-model="addForm.name"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input
            class="el-input form-item"
            v-model.number="addForm.phone"
            placeholder="联系方式"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input
            class="el-input form-item"
            v-model="addForm.address"
            placeholder="地址"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="complete" type="primary">立即添加</el-button>
        <el-button @click="$emit('close')">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      addForm: {},
      rules: {
        name: [
          {
            required: true,
            message: "请输入客户姓名",
          },
        ],
        phone: [
          {
            required: true,
            message: "请输入客户联系方式",
          },
        ],
        address: [
          {
            required: true,
            message: "请输入客户联系地址",
          },
        ],
      },
    };
  },
  methods: {
    complete() {
      this.$refs["form"].validate((validate) => {
        if (validate) {
          this.$emit(
            "addRow",
            Object.assign({ postStatus: "", checked: true }, this.addForm)
          );
          this.$emit("close");
        } else {
          this.$message.error("添加失败,请检查格式!");
        }
      });
    },
    closed() {
      this.addForm = {};
      this.$refs["form"].resetFields();
    },
  },
};
</script>
<style scoped>
.el-input {
  width: 30%;
}
.form-item {
  margin-right: 25px;
}
.container {
  padding: 10px 10px;
}
</style>