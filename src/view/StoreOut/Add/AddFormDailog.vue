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
          :options="storeOptions"
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
      <el-form-item label="费用" prop="anotherFee">
        <el-input
          class="el-input form-item"
          v-model.number="addForm.anotherFee"
          placeholder="单价"
        ></el-input>
      </el-form-item>
      <el-form-item label="客户" prop="clientName">
        <el-input
          class="el-input form-item"
          v-model="addForm.clientName"
          placeholder="客户"
        ></el-input>
      </el-form-item>
      <el-form-item label="订单状态" prop="transportStatusLabel">
        <el-select
          v-model="addForm.transportStatusLabel"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in transportStatusOptions"
            :key="item.id"
            :label="item.status_name"
            :value="item.status_name"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="物流单号" prop="transportOrder">
        <el-input
          class="el-input form-item"
          v-model="addForm.transportOrder"
          placeholder="物流单号"
        ></el-input>
      </el-form-item>
      <el-form-item label="日期" prop="updataDate">
        <el-date-picker
          v-model="addForm.updataDate"
          type="date"
          placeholder="不填默认当前时间"
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
import { storeAddDailog } from "@/mixin";
import { formatDate } from "@/utils";
export default {
  data: function () {
    return {
      rules: {
        name_type: [
          {
            type: "array",
            required: true,
            message: "请输入要入库的名称及类型",
            trigger: "blur",
          },
        ],
        price: [
          {
            min: 0,
            type: "number",
            required: true,
            message: "请输要入库的单价(数字)",
            trigger: "blur",
          },
        ],
        amount: [
          {
            min: 1,
            type: "number",
            required: true,
            message: "请输要入库的数量(数字)",
            trigger: "blur",
          },
        ],
        anotherFee: [
          {
            min: 0,
            type: "number",
            required: true,
            message: "请输入要入库的其他费用",
            trigger: "blur",
          },
        ],
        clientName: [
          {
            required: true,
            message: "请输入要入库的客户",
            trigger: "blur",
          },
        ],
        transportStatusLabel: [
          {
            required: true,
            message: "请输入要入库的订单状态",
            trigger: "blur",
          },
        ],
        transportOrder: [
          {
            required: true,
            message: "请输入要入库的物流单号",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mixins: [storeAddDailog],
  computed: {
    transportStatus() {
      for (let item of this.transportStatusOptions) {
        if (item.status_name == this.addForm.transportStatusLabel) {
          return item.id;
        }
      }
    },
  },
  methods: {
    complete() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$message.success("添加成功");
          this.$emit("addRow", {
            checked: true,
            stock_id: this.stockId,
            postStatus: "",
            name: this.addForm.name_type[0],
            type: this.addForm.name_type[1],
            price: this.addForm.price,
            amount: this.addForm.amount,
            another_fee: this.addForm.anotherFee,
            client_name: this.addForm.clientName,
            transport_status_label: this.addForm.transportStatusLabel,
            transport_status: this.transportStatus,
            transport_order: this.addForm.transportOrder,
            updata_date: this.addForm.updataDate
              ? this.addForm.updataDate
              : formatDate(new Date()),
          });
          this.$emit("close");
        } else {
          this.$message.error("添加失败,请检查格式!");
        }
      });
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