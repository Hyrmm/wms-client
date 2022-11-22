<template>
  <div>
    <TableFilter size="mini" :date_filter="true" />
    <Table :data="tabaleData" />
  </div>
</template>

<script>
import Table from "./components/Table";
import TableFilter from "@/components/TableFilter";
export default {
  components: { Table, TableFilter },
  data: function () {
    return {
      tabaleData: [
        {
          id: 1,
          name: "可乐",
          type: "330ml",
          price: 3.5,
          amount: 100,
          totalCost: 350,
          date: "2022-11-13 22:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
        {
          id: 2,
          name: "雪碧",
          type: "550ml",
          price: 5,
          amount: 50,
          totalCost: 250,
          date: "2022-11-13 23:37",
        },
      ],
    };
  },
};
</script>

<style>
</style>