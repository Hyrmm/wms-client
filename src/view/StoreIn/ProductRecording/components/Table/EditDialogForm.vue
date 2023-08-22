<template>
  <div>
    <el-dialog title="编辑库存" :visible="visible" @close="close">
      <el-form :model="form" label-position="top" ref="addForm" :rules="rules">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品类型" prop="type">
          <el-input v-model="form.type" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input-number
            v-model="form.stock"
            controls-position="right"
            :min="1"
            :max="9999999"
          ></el-input-number>
        </el-form-item>
      </el-form>

      <div slot="footer">
        <el-button @click="complete('addForm')" type="primary"
          >保存修改</el-button
        >
        <el-button @click="close">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["visible", "editData"],
  data: function () {
    return {
      form: {},
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
      //清空历史表单、重置校验
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
  computed: {},
  watch: {
    editData: {
      handler(newVal) {
        this.form = newVal;
      },
    },
  },
};
</script>

<style>
</style>