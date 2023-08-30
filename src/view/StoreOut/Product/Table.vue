<template>
  <el-table v-bind="$attrs" :stripe="true" style="width: 100%">
    <el-table-column prop="id" label="#" width="40">
      <template slot-scope="scope">
        <el-checkbox
          v-model="scope.row.checked"
          :disabled="scope.row.postStatus == 'success'"
        ></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名称">
      <template slot-scope="scope">
        <div v-if="scope.row.isEdit">
          <el-select
            v-model="scope.row.tempName"
            placeholder="选择名称"
            clearable
            @change="nameOptionsChange(scope)"
          >
            <el-option
              v-for="item in productStoreOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div v-else>{{ scope.row.name }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="类型">
      <template slot-scope="scope">
        <el-select
          v-if="scope.row.isEdit"
          v-model="scope.row.tempType"
          placeholder="选择类型"
          :disabled="scope.row.disabled"
          clearable
          @change="typeOptionsChange(scope)"
        >
          <el-option
            v-for="item in typeOptions(scope)"
            :key="item.stock_id"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <div v-else>{{ scope.row.type }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="amount" label="数量" width="160">
      <template slot-scope="scope">
        <el-input
          v-if="scope.row.isEdit"
          v-model="scope.row.tempAmount"
        ></el-input>
        <div v-else>{{ scope.row.amount }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="price" label="出库价格(总)" width="160">
      <template slot-scope="scope">
        <el-input
          v-if="scope.row.isEdit"
          v-model="scope.row.tempPrice"
        ></el-input>
        <div v-else>{{ scope.row.price }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="client_name" label="客户" width="160">
      <template slot-scope="scope">
        <el-autocomplete
          v-if="scope.row.isEdit"
          class="inline-input"
          v-model="scope.row.tempClientName"
          :fetch-suggestions="querySearch"
          placeholder="客户姓名"
          :trigger-on-focus="false"
          @select="
            (val) => {
              handleSelect(val, scope);
            }
          "
        ></el-autocomplete>
        <div v-else>{{ scope.row.client_name }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="updata_date" label="日期" width="260">
      <template slot-scope="scope">
        <el-date-picker
          v-if="scope.row.isEdit"
          v-model="scope.row.tempUpdataDate"
          type="date"
          placeholder="不填默认当前时间"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          class="form-item"
        >
        </el-date-picker>
        <div v-else>
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updata_date }}</span>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="postStatus" label="状态" width="100">
      <template slot-scope="scope">
        <span v-if="scope.row.postStatus == 'success'" style="color: #67c23a"
          >出库成功</span
        >
        <span v-else-if="scope.row.postStatus == 'fail'" style="color: #f56c6c"
          >出库失败</span
        >
        <span v-else style="color: #e6a23c">待提交</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button
          v-if="!scope.row.isEdit"
          type="primary"
          class="edit-btn"
          icon="el-icon-edit"
          @click="$emit('editRow', scope.row)"
          >编辑</el-button
        >
        <el-button
          v-if="!scope.row.isEdit"
          type="danger"
          class="edit-btn"
          icon="el-icon-delete"
          @click="$emit('delRow', scope.$index)"
          >删除</el-button
        >
        <el-button
          v-if="scope.row.isEdit"
          type="success"
          class="edit-btn"
          icon="el-icon-circle-check"
          @click="$emit('saveRow', scope.row)"
          >保存</el-button
        >
        <el-button
          v-if="scope.row.isEdit"
          type="danger"
          class="edit-btn"
          icon="el-icon-delete"
          @click="$emit('cancleRow', scope.row)"
          >取消</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
import AddFormDailog from "./AddFormDailog";
export default {
  components: { AddFormDailog },
  data: function () {
    return {};
  },
  methods: {
    removeRow(rowIndex, rowData) {
      this.$emit("removeRow", rowIndex, rowData);
    },
    nameOptionsChange(scope) {
      var selectName = scope.row.tempName;
      scope.row.tempType = "";
      scope.row.tempStockId = "";
      // 清空触发type禁用
      if (!selectName) {
        scope.row.disabled = true;
      } else {
        scope.row.disabled = false;
      }
      this.productStoreOptions.forEach((element, index) => {
        if (element.value == selectName) {
          scope.row.nameIndex = index;
        }
      });
    },
    typeOptionsChange(scope) {
      //存在nameIndex 直接锁定
      for (let child of this.productStoreOptions[scope.row.nameIndex].children) {
        if (child.label == scope.row.tempType) {
          scope.row.tempStockId = child.stock_id;
        }
      }
    },
    querySearch(queryString, cb) {
      let filterResult = this.$store.state.client.clientOptions.filter(
        (item) => item.value.indexOf(queryString) != -1 && item.type == 2
      );
      cb(filterResult);
    },
    handleSelect(val, scope) {
      scope.row.tempClientId = val.id;
    },
  },
  computed: {
    ...mapState("client", ["clientOptions"]),
    ...mapState("store", ["productStoreOptions"]),
    typeOptions: {
      get() {
        return (scope) => {
          if (this.productStoreOptions[scope.row.nameIndex]) {
            return this.productStoreOptions[scope.row.nameIndex].children;
          } else {
            return [];
          }
        };
      },
    },
  },
};
</script>

<style lang="less" scoped>
.edit-btn {
  padding: 4px 8px;
}
</style>