<template>
  <el-form :inline="true" :model="form" v-bind="$attrs">
    <el-form-item label="名称">
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
    <el-form-item label="类型">
      <el-select
        v-model="form.type"
        placeholder="类型不限"
        clearable
        :disabled="disabled"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option> </el-select
    ></el-form-item>
    <el-form-item v-if="date_filter" label="日期">
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

    <el-form-item
      ><el-button
        type="primary"
        icon="el-icon-search"
        @click="$emit('search', form)"
        >查询</el-button
      ></el-form-item
    >
  </el-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["date_filter"],
  data: function () {
    return {
      disabled: true,
      form: { date: "", name: "", nameIndex: "", type: "" },
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
    ...mapState("store", ["storeOptions"]),
  },
  methods: {
    nameOptionsChange(selectName) {
      this.form.type = "";
      // 清空出发type禁用
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
  },
  mounted() {},
};
</script>

<style>
</style>