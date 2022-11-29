<template>
  <div class="container">
    <!-- <div class="warpper-right"></div> -->
    <div class="warpper-left">
      <div class="info-row">
        <div class="grid-content">
          <div class="left">
            <i class="el-icon-goods"></i>
          </div>
          <div class="right">
            <div class="amount">
              <span>12,559</span>
            </div>
            <div class="title">总库存</div>
          </div>
        </div>
        <div class="grid-content">
          <div class="left" style="background-color: #64d572">
            <i class="el-icon-sold-out"></i>
          </div>
          <div class="right">
            <div class="amount" style="color: #64d572">
              <span>203,369</span>
            </div>
            <div class="title">出库记录</div>
          </div>
        </div>
        <div class="grid-content">
          <div class="left" style="background-color: #f25e43">
            <i class="el-icon-sold-out"></i>
          </div>
          <div class="right">
            <div class="amount" style="color: #f25e43">
              <span>5,959</span>
            </div>
            <div class="title">出库记录</div>
          </div>
        </div>
      </div>
      <div class="wp">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>待办事项</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>待订单统计</span>
          </div>
          <div v-for="o in 4" :key="o" class="text item">
            {{ "列表内容 " + o }}
          </div>
        </el-card>
      </div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>图表</span>
        </div>
        <div style="height: 300px; width: 100%" ref="echarts"></div>
        <div style="height: 300px; width: 100%" ref="zx"></div>
        <div style="height: 300px; width: 100%" ref="bt"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    var myZx = this.$echarts.init(this.$refs["zx"]);
    var myChart = this.$echarts.init(this.$refs["echarts"]);
    var myBt = this.$echarts.init(this.$refs["bt"]);
    let option = {
      title: {
        text: "树状图",
      },
      xAxis: {
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {},
      series: [
        {
          type: "bar",
          data: [23, 24, 18, 25, 27, 28, 25],
        },
      ],
    };
    let zx = {
      title: {
        text: "折线图",
      },
      xAxis: {
        type: "category",
        data: ["A", "B", "C"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150],
          type: "line",
        },
      ],
    };
    var bt = {
      title: {
        text: "饼图",
      },
      series: [
        {
          type: "pie",
          data: [
            {
              value: 335,
              name: "直接访问",
            },
            {
              value: 234,
              name: "联盟广告",
            },
            {
              value: 1548,
              name: "搜索引擎",
            },
          ],
        },
      ],
    };
    myChart.setOption(option);
    myZx.setOption(zx);
    myBt.setOption(bt);
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  .warpper-right {
    width: 30%;
  }
  .warpper-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .grid-content {
        width: 20%;
        display: flex;
        border-radius: 4px;
        border: 1px solid #e4e7ed;
        background-color: #ffffff;
        overflow: hidden;
        color: #303133;
        .left {
          width: 45%;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #2d8cf0;
          font-size: 24px;
          color: white;
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
          padding: 16px;
          box-sizing: border-box;
          font-size: 14px;
          .amount {
            color: #2d8cf0;
            font-size: 24px;
            margin-bottom: 10px;
          }
        }
      }
    }

    .box-card {
      margin-bottom: 10px;
    }

    .wp {
      display: flex;
      justify-content: space-between;
      .box-card {
        width: 49%;
      }
    }
  }
}
</style>