<template>
  <el-dialog
    title="添加出库"
    v-bind="$attrs"
    v-on="$listeners"
    @closed="closed"
  >
    <div class="container">
      <el-form
        :model="addForm"
        label-position="left"
        label-width="150px"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="名称/类型" prop="name_type">
          <el-cascader
            class="form-item"
            :options="productStoreOptions"
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
        <el-form-item label="出库单价" prop="price">
          <el-input
            class="el-input form-item"
            v-model.number="addForm.price"
            placeholder="单价"
          ></el-input>
        </el-form-item>
        <el-form-item label="客户" prop="clientName">
          <el-autocomplete
            class="inline-input"
            v-model="addForm.clientName"
            :fetch-suggestions="querySearch"
            placeholder="客户姓名"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="出库日期" prop="updataDate">
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
    </div>
  </el-dialog>
</template>

<script>
import { storeAddDailog } from "@/mixin";
import { formatDate } from "@/utils";
import { mapState } from "vuex";
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
    ...mapState("client", ["clientOptions"]),
    ...mapState("store", ["productStoreOptions"]),
  },
  methods: {
    complete() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          //验证客户名和ID合法
          if (
            this.addForm.clientId &&
            this.clientOptions.filter(
              (item) =>
                item.id == this.addForm.clientId &&
                item.value == this.addForm.clientName
            ).length
          ) {
            this.$message.success("添加成功");
            this.$emit("addRow", {
              checked: true,
              stock_id: this.stockId(),
              postStatus: "",
              name: this.addForm.name_type[0],
              type: this.addForm.name_type[1],
              price: this.addForm.price,
              amount: this.addForm.amount,
              client_name: this.addForm.clientName,
              client_id: this.addForm.clientId,
              updata_date: this.addForm.updataDate? this.addForm.updataDate: formatDate(new Date()),
            });
            this.$emit("close");
          } else {
            this.$message.error("客户不存在!");
          }
        } else {
          this.$message.error("添加失败,请检查格式!");
        }
      });
    },
    querySearch(queryString, cb) {
      let filterResult = this.$store.state.client.clientOptions.filter(
        (item) => item.value.indexOf(queryString) != -1
      );
      cb(filterResult);
    },
    handleSelect(selectData) {
      this.addForm.clientId = selectData.id;
    },
    stockId() {
      for (let option of this.productStoreOptions) {
        if (option.label == this.addForm.name_type[0]) {
          for (let childerOption of option.children) {
            if (childerOption.label == this.addForm.name_type[1]) {
              return childerOption.stock_id;
            }
          }
        }
      }
      return "";
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