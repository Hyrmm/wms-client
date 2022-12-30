<!--
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-12-11 16:35:59
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-30 14:57:07
 * @FilePath: \wms-client\src\view\index\Sales.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>盈利概述</span>
        <div class="clearfix">
          <el-radio-group
            value="query.value"
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
      <div class="display">
        <div
          v-loading="chartsLoading"
          class="charts"
          ref="sales"
          style="flex: 0 0 80%; height: 350px"
        ></div>
        <div class="saleRank" style="flex: 0 0 20%">
          <h4 style="margin-bottom: 0.5em">客户销售额排名</h4>
          <ul>
            <li v-for="(item, index) in salesInfo.clientRank" :key="index">
              <span class="index" :class="[index < 3 ? 'rank-top' : '']">{{
                index + 1
              }}</span>
              <span class="client">{{ item.name }}</span>
              <span class="profit">{{ formatAmount(item.value) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
    <div style="display: flex">
      <el-card
        class="box-card"
        style="flex: 1; margin: 10px 0; margin-right: 20px"
      >
        <div slot="header" class="clearfix">
          <span>销售明细</span>
          <el-dropdown
            size="mini"
            split-button
            type="primary"
            style="visibility: hidden"
          >
            <el-dropdown-menu slot="dropdown"> </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-table
          v-if="salesInfo.detail"
          :data="salesInfo.detail.data"
          stripe
          style="width: 100%; height: 300px"
          max-height="300"
        >
          <el-table-column type="index" label="#" width="40"> </el-table-column>
          <el-table-column prop="client" label="客户" width="70">
          </el-table-column>
          <el-table-column prop="name_type" label="名称"> </el-table-column>
          <el-table-column prop="amount" label="数量" width="60">
          </el-table-column>
          <el-table-column prop="sales" label="销售额" width="80">
          </el-table-column>
          <el-table-column prop="cost" label="成本" width="70">
          </el-table-column>
          <el-table-column prop="profit" label="利润" width="70">
          </el-table-column>
          <el-table-column label="日期">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{
                dataFormat(scope.row.finish_date)
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card class="box-card" style="flex: 1; margin: 10px 0">
        <div slot="header" class="clearfix">
          <span>销售类别占比</span>
          <el-radio-group
            v-model="salesPerType"
            size="mini"
            @input="salesPerTypeChange"
          >
            <el-radio-button label="sales">销售额</el-radio-button>
            <el-radio-button label="cost">成本</el-radio-button>
            <el-radio-button label="profit">利润</el-radio-button>
          </el-radio-group>
        </div>
        <div
          v-loading="chartsLoading"
          ref="salesPer"
          style="height: 300px; width: 100%"
        ></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatDate, formatAmount } from "@/utils";

export default {
  data() {
    return {
      chartsLoading: false,
      salesPerType: "sales",
      query: {
        year: `${new Date().getFullYear()}`,
        month: `${new Date().getFullYear()}-${new Date().getMonth() + 1}`,
        dateType: "year",
      },
    };
  },
  computed: {
    ...mapState("dataVisual", {
      salesInfo: (state) => state.salesInfo,
    }),
    clientRank() {},
  },
  methods: {
    renderSales() {
      let sales = this.$echarts.init(this.$refs["sales"]);
      let salesOptions = {
        legend: {
          data: ["销售额", "成本", "利润"],
        },
        tooltip: {
          trigger: "item",
        },
        xAxis: {
          data: this.salesInfo.chartsData.xData,
        },
        yAxis: {},
        series: [
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return formatAmount(params.value);
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
            name: "销售额",
            type: "bar",
            data: this.salesInfo.chartsData.salesData,
          },
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return formatAmount(params.value);
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
            name: "成本",
            type: "bar",
            data: this.salesInfo.chartsData.costData,
          },
          {
            itemStyle: {
              normal: {
                label: {
                  formatter: function (params) {
                    if (params.value) return formatAmount(params.value);
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
            name: "利润",
            type: "bar",
            data: this.salesInfo.chartsData.profitData,
          },
        ],
      };
      sales.setOption(salesOptions);
    },
    renderSalesPer(text, data) {
      let salesPerOptions = {
        title: {
          text: text,
          left: "center",
          top: "center",
        },
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            data: data,
            radius: ["40%", "70%"],
          },
        ],
      };
      this.$echarts.init(this.$refs["salesPer"]).setOption(salesPerOptions);
    },
    salesPerTypeChange(newVal) {
      switch (newVal) {
        case "sales":
          this.renderSalesPer(
            `销售额\n${this.salesInfo.categoriesPer.totalSales}`,
            this.salesInfo.categoriesPer.sales
          );
          break;
        case "cost":
          this.renderSalesPer(
            `成本\n${this.salesInfo.categoriesPer.totalCost}`,
            this.salesInfo.categoriesPer.cost
          );
          break;
        case "profit":
          this.renderSalesPer(
            `利润\n${this.salesInfo.categoriesPer.totalProfit}`,
            this.salesInfo.categoriesPer.profit
          );
          break;
      }
    },
    dateTypeChange(newVal) {
      this.updata();
    },
    yearChange() {
      this.updata();
    },
    monthChange() {
      this.updata();
    },
    //更新数据
    async updata() {
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

      this.chartsLoading = true;
      let res = await this.$store
        .dispatch("dataVisual/getSalesInfo", query)
        .catch(() => {
          this.chartsLoading = false;
        });
      this.chartsLoading = false;
    },

    dataFormat: function (date) {
      if (!date) return "xxxx-xx-xx xx:xx:xx";
      return formatDate(new Date(date));
    },
    formatAmount(amount) {
      return formatAmount(amount);
    },
  },
  mounted() {
    if (this.salesInfo.chartsData) {
      this.renderSales();
      this.renderSalesPer(
        `销售额\n${formatAmount(this.salesInfo.categoriesPer.totalSales)}`,
        this.salesInfo.categoriesPer.sales
      );
    }
  },
  watch: {
    salesInfo: {
      handler(newVal) {
        this.renderSales();
        this.renderSalesPer(
          `销售额\n${formatAmount(this.salesInfo.categoriesPer.totalSales)}`,
          this.salesInfo.categoriesPer.sales
        );
        this.$nextTick(() => {});
      },
    },
  },
};
</script>

<style lang="less" scoped>
.clearfix {
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
}
.display {
  display: flex;
  .saleRank {
    li {
      display: flex;
      list-style: none;
      margin-top: 16px;
      align-items: center;
    }
    .index {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-top: 1.5px;
      margin-right: 16px;
      font-weight: 600;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      background-color: #fafafa;
      border-radius: 20px;
    }
    .client {
      flex: 1 1;
    }
    .profit {
    }
  }
}
.rank-top {
  color: #fff;
  background-color: #314659 !important;
}
</style>