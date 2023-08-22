<template>
  <el-dialog title="新增库存" :visible="visible" @close="close">
    <div class="container">
      <el-form
        :model="addData"
        label-position="top"
        label-width="100px"
        ref="addForm"
        :rules="rules"
      >
      <el-form-item label="成品名称" prop="name">
          <el-input v-model="addData.name"></el-input>
        </el-form-item>
        <el-form-item label="成品类型" prop="type">
          <el-input v-model="addData.type"></el-input>
        </el-form-item>
        <el-form-item label="消耗原料组合" prop="materialRecipe">
          <el-row
            v-for="(item, index) in addData.materialRecipe"
            style="margin-bottom: 10px"
            type="flex"
            justify="space-between"
            :key="index"
          >
            <el-col :span="12">
              <el-cascader
                :options="materialStoreOptions"
                v-model="item.materialNameType"
                clearable
              ></el-cascader>
            </el-col>
            <el-col :span="8">
              <el-input v-model="item.amount"></el-input
            ></el-col>
            <el-col :span="2">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="delRecipe(index)"
              ></el-button
            ></el-col>
          </el-row>
          <el-button style="width: 100%" @click="addRecipe" type="primary"
            >添加一条组合方式
          </el-button>
        </el-form-item>
        <el-form-item label="当前库存数量" prop="stock">
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
import { mapState } from "vuex";
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
        materialRecipe: [{ validator: this.validatePass }],
        stock: [
          {
            required: true,
            message: "请输要入库的数量(数字)",
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
      this.$refs["addForm"].resetFields();
      this.$emit("close");
    },
    complete: function () {
      // 补充配方原料id
      for (const item of this.addData.materialRecipe) {
        item.stockId = this.getMaterialStockId(
          item.materialNameType[0],
          item.materialNameType[1]
        );
      }

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

    getMaterialStockId: function (name, type) {
      for (let option of this.materialStoreOptions) {
        if (option.label == name) {
          for (let childerOption of option.children) {
            if (childerOption.label == type) {
              return childerOption.stock_id;
            }
          }
        }
      }
      return 0;
    },
    addRecipe() {
      this.addData.materialRecipe.push({
        id: this.addData.materialRecipe.length,
        materialNameType: [],
        amount: 0,
        stockId: 0,
      });
    },
    delRecipe(rowIndex) {
      this.addData.materialRecipe.splice(rowIndex, 1);
    },
    validatePass(rule, value, callback) {
      for (const item of value) {
        if (item.materialNameType.length == 0) {
          callback(new Error("请完整填写材料配方"));
          return;
        }
      }
      callback();
    },
  },
  computed: {
    ...mapState("store", ["materialStoreOptions", "transportStatusOptions"]),
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