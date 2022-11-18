<template>
  <el-form
    :inline="true"
    :model="form"
    v-bind="$attrs"
  >
    <el-form-item label="名称类型">
      <el-cascader
        v-model="form.name_tpye"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
      ></el-cascader>
    </el-form-item>
    <el-form-item label="日期">
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
      ><el-button type="primary" icon="el-icon-search"
        >查询</el-button
      ></el-form-item
    >
  </el-form>
</template>

<script>
export default {
  data: function () {
    return {
      form: { name_tpye: "", date: "" },
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
    };
  },
};
</script>

<style>
</style>