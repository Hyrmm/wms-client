<template>
  <el-dialog title="添加库存" :visible="visible" @close="close">
    <el-form :model="form" label-position="top" ref="addForm" :rules="rules">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="type">
        <el-input v-model="form.type" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="库存数量">
        <el-input-number
          v-model="form.amount"
          controls-position="right"
          :min="1"
          :max="9999999"
        ></el-input-number>
      </el-form-item>
    </el-form>

    <div slot="footer">
      <el-button @click="complete('addForm')" type="primary"
        >立即添加</el-button
      >
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ["visible"],
  data: function () {
    return {
      form: {
        name: "",
        type: "",
        amount: 0,
      },
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
      },
    };
  },
  methods: {
    close: function () {
      // 清空历史表单、重置校验
      this.form = {
        name: "",
        type: "",
        amount: 0,
      };
      this.$refs["addForm"].resetFields();
      this.$emit("close");
    },
    complete: function (formName) {
      // 表单校验
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 通过
          this.$emit("close");
        } else {
          this.$message.warning("请正确填写表单!");
          return false;
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

<style>
</style>