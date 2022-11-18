<template>
  <el-dialog
    title="添加库存"
    v-bind="$attrs"
    v-on="$listeners"
    @closed="closed"
  >
    <el-form
      :model="addForm"
      label-position="left"
      label-width="100px"
      :rules="rules"
      ref="form"
    >
      <el-form-item label="名称/类型" prop="name_type">
        <el-cascader
          class="form-item"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          v-model="addForm.name_type"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="数量" prop="amount">
        <el-input
          class="form-item"
          v-model.number="addForm.amount"
          placeholder="数量"
        ></el-input>
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input
          class="el-input form-item"
          v-model.number="addForm.price"
          placeholder="单价"
        ></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="addForm.date"
          type="date"
          placeholder="选择日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          class="form-item"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="complete" type="primary">立即添加</el-button>
      <el-button @click="$emit('close')">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data: function () {
    return {
      addForm: {},
      options: [
        {
          value: "可乐",
          label: "可乐",
          children: [
            { value: "1", label: "330ml" },
            { value: "2", label: "550ml" },
          ],
        },
        {
          value: "雪碧",
          label: "雪碧",
          children: [{ value: "1", label: "330ml" }],
        },
      ],
      rules: {
        name_type: [
          {
            type: "array",
            required: true,
            message: "请输入要入库的名称及类型",
            trigger: "blur",
          },
        ],
        amount: [
          {
            type: "number",
            min: 1,
            required: true,
            message: "请输要入库的数量(数字)",
            trigger: "blur",
          },
        ],
        price: [
          {
            min: 0,
            type: "number",
            required: true,
            message: "请输入要入库的单价(数字)",
            trigger: "blur",
          },
        ],
        date: [
          {
            required: true,
            message: "请输入要入库的日期",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    complete() {
      console.log(this.addForm);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$message.success("添加成功");
          console.log(this.addForm.name_type);
          this.$emit(
            "addRow",
            Object.assign(
              {
                name: this.addForm.name_type[0],
                type: this.addForm.name_type[1],
                totalCost: this.addForm.amount * this.addForm.price,
              },
              this.addForm
            )
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
</style>