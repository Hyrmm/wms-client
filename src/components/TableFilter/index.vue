<template>
  <el-form :inline="true" :model="form" v-bind="$attrs">
    <el-form-item v-if="nameFilter" label="名称">
      <el-select
        v-model="form.name"
        placeholder="名称不限"
        clearable
        @change="nameOptionsChange"
      >
        <el-option
          v-for="item in storeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="typeFilter" label="类型">
      <el-select
        v-model="form.typeIndex"
        placeholder="类型不限"
        clearable
        :disabled="disabled"
      >
        <el-option
          v-for="(item, index) in typeOptions"
          :key="item.stock_id"
          :label="item.label"
          :value="index"
        >
        </el-option> </el-select
    ></el-form-item>
    <el-form-item v-if="clientNameFilter" label="客户">
      <el-autocomplete
        class="inline-input"
        v-model="form.client_name"
        :fetch-suggestions="querySearch"
        placeholder="客户姓名"
        :trigger-on-focus="false"
        @select="handleSelect"
        size="mini"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item v-if="dateFilter" label="日期">
      <el-date-picker
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        v-model="form.date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item v-if="transportStatusFilter" label="订单状态">
      <el-select v-model="form.transport_status" placeholder="请选择">
        <el-option
          v-for="item in $store.state.store.transportStatusOptions"
          :key="item.id"
          :label="item.status_name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      ><el-button
        type="primary"
        icon="el-icon-search"
        @click="searchClick"
        size="mini"
        >查询</el-button
      ></el-form-item
    >
  </el-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: [
    "dateFilter",
    "nameFilter",
    "typeFilter",
    "transportStatusFilter",
    "clientNameFilter",
  ],
  data: function () {
    return {
      disabled: true,
      form: {
        date: [],
        name: "",
        nameIndex: "",
        type: "",
        typeIndex: "",
        transport_status: "",
        client_name: "",
        client_id: "",
      },
    };
  },
  computed: {
    typeOptions() {
      if (this.storeOptions[this.form.nameIndex]) {
        return this.storeOptions[this.form.nameIndex].children;
      } else {
        return [];
      }
    },
    type() {
      if (this.typeOptions[this.form.typeIndex]) {
        return this.typeOptions[this.form.typeIndex].label;
      }
      return "";
    },
    ...mapState("store", ["storeOptions"]),
    ...mapState("client", ["clientOptions"]),
  },
  methods: {
    nameOptionsChange(selectName) {
      this.form.typeIndex = "";
      // 清空触发type禁用
      if (!selectName) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
      this.storeOptions.forEach((element, index) => {
        if (element.value == selectName) {
          this.form.nameIndex = index;
        }
      });
    },
    searchClick() {
      this.$emit("search", {
        filter_date_start: this.form.date[0],
        filter_date_end: this.form.date[1],
        name: this.form.name,
        type: this.type,
        transport_status: this.form.transport_status,
        client_name: this.form.client_name,
        client_id: this.form.client_id,
      });
    },
    querySearch(queryString, cb) {
      let filterResult = this.$store.state.client.clientOptions.filter(
        (item) => item.value.indexOf(queryString) != -1
      );
      cb(filterResult);
    },
    handleSelect(selectData) {
      this.form.client_id = selectData.id;
    },
  },
  mounted() {},
};
</script>

<style>
</style>