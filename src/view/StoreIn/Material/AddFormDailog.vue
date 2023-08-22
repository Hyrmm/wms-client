<template>
  <el-dialog
    v-bind="$attrs"
    v-on="$listeners"
    @closed="closed"
    title="添加入库"
  >
    <div class="container">
      <el-form
        :model="addForm"
        label-position="left"
        label-width="100px"
        :rules="rulesIn"
        ref="form"
      >
        <el-form-item label="名称/类型" prop="name_type">
          <el-cascader
            class="form-item"
            :options="materialStoreOptions"
            :props="{ expandTrigger: 'hover' }"
            v-model="addForm.name_type"
            :children="addForm.type"
          >
          </el-cascader>
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
        <el-form-item label="客户" prop="clientName">
          <el-autocomplete
            class="inline-input"
            v-model="addForm.client_name"
            :fetch-suggestions="querySearch"
            placeholder="客户姓名"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="addForm.updata_date"
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
      addForm: {},
      rulesIn: {
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
      },
    };
  },
  methods: {
    complete() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$emit("addRow", {
            checked: true,
            postStatus: "",
            stock_id: this.stockId,
            name: this.addForm.name_type[0],
            type: this.addForm.name_type[1],
            price: this.addForm.price,
            amount: this.addForm.amount,
            updata_date: this.addForm.updata_date
              ? this.addForm.updata_date
              : formatDate(new Date()),
            totalCost: this.addForm.amount * this.addForm.price,
            client_id:this.addForm.client_id,
            client_name:this.addForm.client_name
          });
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
    handleSelect(selectData) {
      this.addForm.client_id = selectData.id;
    },
    querySearch(queryString, cb) {
      let filterResult = this.$store.state.client.clientOptions.filter(
        (item) => item.value.indexOf(queryString) != -1 && item.type == 1
      );
      cb(filterResult);
    },
  },
  computed: {
    ...mapState("store", ["materialStoreOptions", "transportStatusOptions"]),
    stockId: function () {
      for (let option of this.materialStoreOptions) {
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