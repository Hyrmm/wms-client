<template>
  <div class="warpper">
    <!-- 树状 -->
    <el-card
      class="box-card"
      style="flex: 3; margin: 10px 0; margin-right: 20px"
    >
      <div slot="header" class="clearfix">
        <span>完成订单统计</span>
        <div class="clearfix">
          <el-radio-group
            v-model="query.dateType"
            size="mini"
            style="margin-right: 10px"
            @input="dateTypeChange"
          >
            <el-radio-button label="year">年统计</el-radio-button>
            <el-radio-button label="month">月统计</el-radio-button>
          </el-radio-group>
          <el-date-picker
            v-show="query.dateType == 'year'"
            v-model="query.year"
            type="year"
            placeholder="选择年"
            size="mini"
            value-format="yyyy"
            @change="yearChange"
          >
          </el-date-picker>
          <el-date-picker
            v-show="query.dateType == 'month'"
            v-model="query.month"
            type="month"
            placeholder="选择月"
            size="mini"
            value-format="yyyy-M"
            @change="monthChange"
          >
          </el-date-picker>
        </div>
      </div>
      <div
        v-loading="yearFinishOrderLoading"
        ref="orderAmount"
        style="height: 300px"
      ></div>
    </el-card>
    <!-- 饼状 -->
    <el-card class="box-card" style="flex: 1; margin: 10px 0">
      <div slot="header" class="clearfix">
        <span>出库状态占比</span>
      </div>
      <div style="height: 300px; width: 100%" ref="orderStatus"></div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      yearFinishOrderLoading: false,
      query: {
        dateType: "year",
        year: `${new Date().getFullYear()}`,
        month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
      },
    };
  },
  computed: {
    ...mapState("dataVisual", {
      order_unSend: (state) => state.commonInfo.order_unSend,
      order_sended: (state) => state.commonInfo.order_sended,
      order_received: (state) => state.commonInfo.order_received,
      order_backOri: (state) => state.commonInfo.order_backOri,
      order_backStore: (state) => state.commonInfo.order_backStore,
      yearFinishOrder_received: (state) => state.yearFinishOrder.received,
      yearFinishOrder_bakcOri: (state) => state.yearFinishOrder.bakcOri,
      yearFinishOrder_backStore: (state) => state.yearFinishOrder.backStore,
      xData: (state) => state.yearFinishOrder.xData,
    }),
  },
  methods: {
    //订单状态饼图渲染
    renderOrderStatus() {
      let orderStatusOptions = {
        title: {
          text: "订单状态分布",
          left: "center",
          top: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            color: ["#409EFF", "#409EFF", "#67C23A", "#E6A23C", "#F56C6C"],
            data: [
              {
                value: this.order_backOri,
                name: "退回原厂",
              },
              {
                value: this.order_backStore,
                name: "退回仓库",
              },
              {
                value: this.order_received,
                name: "已收货",
              },
              {
                value: this.order_sended,
                name: "已发货",
              },
              {
                value: this.order_unSend,
                name: "未发货",
              },
            ],
            radius: ["40%", "70%"],
          },
        ],
      };
      this.$echarts
        .init(this.$refs["orderStatus"])
        .setOption(orderStatusOptions);
    },
    //年出库订单树状图渲染
    renderYearFinishOrder() {
      let orderAmount = this.$echarts.init(this.$refs["orderAmount"]);
      let orderAmountOptions = {
        legend: {
          data: ["已收货", "退回仓库", "退回原厂"],
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          data: this.xData,
        },
        yAxis: {},
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return params.value;
                    return "";
                  },
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
            name: "已收货",
            type: "bar",
            data: this.yearFinishOrder_received,
          },
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return params.value;
                    return "";
                  },
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
            name: "退回仓库",
            type: "bar",
            data: this.yearFinishOrder_backStore,
          },
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return params.value;
                    return "";
                  },
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "black",
                    fontSize: 16,
                  },
                },
              },
            },
            name: "退回原厂",
            type: "bar",
            data: this.yearFinishOrder_backOri,
          },
        ],
      };
      orderAmount.setOption(orderAmountOptions);
    },
    dateTypeChange() {
      this.updataYearFinishOrder();
    },
    yearChange(newVal) {
      //重置月选择
      this.updataYearFinishOrder();
    },
    monthChange(newVal) {
      this.updataYearFinishOrder();
    },
    async updataYearFinishOrder() {
      let query = {};
      switch (this.query.dateType) {
        case "year":
          query.year = this.query.year;
          break;
        case "month":
          query.year = this.query.month.split("-")[0];
          query.month = this.query.month.split("-")[1];
          break;
      }

      this.yearFinishOrderLoading = true;
      let res = await this.$store
        .dispatch("dataVisual/getYearFinishOrder", query)
        .catch(() => {
          this.yearFinishOrderLoading = false;
        });
      this.yearFinishOrderLoading = false;
    },
  },
  watch: {
    "$store.state.dataVisual.commonInfo": {
      handler(value) {
        //订单状态图
        this.renderOrderStatus();
      },
    },
    "$store.state.dataVisual.yearFinishOrder": {
      handler(value) {
        //订单状态图
        this.renderYearFinishOrder();
      },
    },
  },

  mounted() {
    if (
      this.order_unSend ||
      this.order_sended ||
      this.order_received ||
      this.order_backOri ||
      this.order_backStore
    ) {
      this.renderOrderStatus();
    }
    if (
      this.yearFinishOrder_received ||
      this.yearFinishOrder_bakcOri ||
      this.yearFinishOrder_backStore
    ) {
      this.renderYearFinishOrder();
    }
  },
};
</script>

<style scoped lang='less'>
.clearfix {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}
.warpper {
  display: flex;
}
</style>