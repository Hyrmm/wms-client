<!--
 * @Author: Hyrm 1358188945@qq.com
 * @Date: 2022-12-08 23:18:47
 * @LastEditors: Hyrm 1358188945@qq.com
 * @LastEditTime: 2022-12-23 19:33:28
 * @FilePath: \wms-client\src\view\index\Store.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>库存概述</span>
    </div>
    <div class="chart-warpper">
      <!-- <div style="height: 300px; width: 70%" ref=""></div> -->
      <div style="height: 500px; width: 100%" ref="stockDistribution"></div>
    </div>
  </el-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("dataVisual", {
      storeInfo: (state) => state.storeInfo,
    }),
  },
  methods: {
    renderOrderStatus() {
      let orderStatusOptions = {
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "treemap",
            levels: [
              {
                itemStyle: {
                  borderColor: "#777",
                  borderWidth: 0,
                  gapWidth: 1,
                },
                upperLabel: {
                  show: false,
                },
              },
              {
                itemStyle: {
                  borderColor: "#555",
                  borderWidth: 5,
                  gapWidth: 1,
                },
                emphasis: {
                  itemStyle: {
                    borderColor: "#ddd",
                  },
                },
              },
              {
                colorSaturation: [0.35, 0.5],
                itemStyle: {
                  borderWidth: 5,
                  gapWidth: 1,
                  borderColorSaturation: 0.6,
                },
              },
            ],

            visibleMin: 300,
            upperLabel: {
              show: true,
              height: 30,
            },
            itemStyle: {
              borderColor: "#fff",
            },
            data: this.storeInfo,
          },
        ],
      };
      this.$echarts
        .init(this.$refs["stockDistribution"])
        .setOption(orderStatusOptions);
    },
  },

  watch: {
    "$store.state.dataVisual.storeInfo": {
      handler(value) {
        //订单状态图
        this.renderOrderStatus();
      },
    },
  },
  mounted() {
    if (this.storeInfo) {
      this.renderOrderStatus();
    }
  },
};
</script>

<style scoped lang='less'>
.chart-warpper {
  display: flex;
}
</style>