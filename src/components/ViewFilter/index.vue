<template>
  <el-checkbox-group v-model="checkedData" v-on="$listeners">
    <el-checkbox
      v-for="item in checkOptions"
      :label="item.label"
      :key="item.id"
      >{{ item.title }}</el-checkbox
    >
  </el-checkbox-group>
</template>

<script>
export default {
  props: [
    "name",
    "type",
    "amount",
    "price",
    "another_fee",
    "profit",
    "client",
    "client_tel",
    "client_address",
    "status",
    "transport_order",
    "updata_date",
    "finish_date",
    "nick",
    "defaultChecked",
  ],
  data: function () {
    return {
      defaultOptions: [
        {
          id: 1,
          label: "name",
          title: "名称",
          isDisplay: this.name,
        },
        {
          id: 2,
          label: "type",
          title: "类型",
          isDisplay: this.type,
        },
        {
          id: 3,
          label: "amount",
          title: "数量",
          isDisplay: this.amount,
        },
        {
          id: 4,
          label: "price",
          title: "单价",
          isDisplay: this.price,
        },
        {
          id: 5,
          label: "another_fee",
          title: "总成本",
          isDisplay: this.another_fee,
        },
        {
          id: 6,
          label: "profit",
          title: "预期利润",
          isDisplay: this.profit,
        },
        {
          id: 7,
          label: "client",
          title: "客户",
          isDisplay: this.client,
        },
        {
          id: 8,
          label: "client_tel",
          title: "客户联系方式",
          isDisplay: this.client_tel,
        },
        {
          id: 9,
          label: "client_address",
          title: "客户地址",
          isDisplay: this.client_address,
        },
        {
          id: 10,
          label: "status",
          title: "订单状态",
          isDisplay: this.status,
        },
        {
          id: 11,
          label: "transport_order",
          title: "物流单号",
          isDisplay: this.transport_order,
        },
        {
          id: 12,
          label: "updata_date",
          title: "出库日期",
          isDisplay: this.updata_date,
        },
        {
          id: 13,
          label: "finish_date",
          title: "完成日期",
          isDisplay: this.finish_date,
        },
        {
          id: 14,
          label: "nick",
          title: "操作用户",
          isDisplay: this.nick,
        },
      ],
      checkedData: [...this.defaultChecked],
    };
  },
  computed: {
    checkOptions() {
      return this.defaultOptions.filter((item) => item.isDisplay);
    },
  },
};
</script>

<style>
</style>